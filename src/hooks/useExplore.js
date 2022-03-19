import { useSetRecoilState } from "recoil";

import useFetchWrapper from "./useFetchWrapper";
import { Blocks, Block, markets, Txs, Validators, Party } from "../store";
import { blockUrl, apiUrl, tendermintUrl } from "../config";
export default function useExplore() {
  // TODO:
  // change the url to env file
  const fetchWrapper = useFetchWrapper();
  const setBlocks = useSetRecoilState(Blocks);
  const setBlock = useSetRecoilState(Block);
  const setParty = useSetRecoilState(Party);
  const setMarkets = useSetRecoilState(markets);
  const setTxs = useSetRecoilState(Txs);
  const setValidators = useSetRecoilState(Validators);

  return {
    getBlockByHeight,
    getMarkets,
    getTransaction,
    getValidators,
    getBlockData,
    getParty,
  };
  function getBlockByHeight(body) {
    return fetchWrapper.post(blockUrl(), body).then((response) => {
      let data = response || [];
      if (data && data.length > 0) {
        data = data.map((d) => {
          d.Command = JSON.parse(d.Command);
          return d;
        });
      } else {
        data = [];
      }
      setBlock(data);
    });
  }

  function getBlockData() {
    return fetchWrapper.get(tendermintUrl("blockchain")).then((res) => {
      let data = {
        blocks: {},
      };
      data.height = res.result.last_height;
      res.result.block_metas.forEach((block) => {
        if (block.header.height) {
          data.blocks[block.header.height] = block;
        }
      });
      setBlocks(data);
    });
  }

  function getMarkets(id) {
    return fetchWrapper
      .post(
        apiUrl("query"),
        {
          operationName: null,
          variables: {},
          query:
            "{\n  markets {\n    id\n    name \n tradableInstrument {\n      instrument {\n        id\n        code\n        name\n           metadata {\n          tags\n        }\n        }\n      marginCalculator {\n        scalingFactors {\n          searchLevel\n          initialMargin\n          collateralRelease\n        }\n      }\n    }\n    tradingMode       data {\n      markPrice\n      bestBidPrice, bestOfferPrice, midPrice, openInterest    }\n    decimalPlaces\n    accounts {\n      type\n      balance\n      asset { id symbol }\n    }\n    orders(last: 20) {\n      id\n    }\n  }\n}\n",
        },
        {
          mode: "cors",
        }
      )
      .then((data) => {
        setMarkets(data.data);
      });
  }

  function getTransaction(hash) {
    return fetchWrapper.get(tendermintUrl(`tx?hash=${hash}`)).then(setTxs);
  }

  function getValidators() {
    return fetchWrapper.get(tendermintUrl("validators")).then(async (res) => {
      let data = {
        peers: {},
      };
      data.peerCount = res.result.total;

      res.result.validators.forEach((validator) => {
        data.peers[validator.address] = validator;
      });

      const vegaResponse = await fetchWrapper.post(
        apiUrl("query"),
        {
          operationName: null,
          variables: {},
          query:
            "{\n  nodes {\n    id\n    pubkey\n    tmPubkey\n    ethereumAdddress\n    infoUrl\n    location\n    stakedByOperator\n    stakedByDelegates\n    stakedTotal\n    pendingStake\n    status\n         name\n    avatarUrl\n  }\n}\n",
        },
        {
          mode: "cors",
        }
      );

      if (vegaResponse) {
        Object.keys(data.peers).forEach((validatorAddress) => {
          const r = vegaResponse.data.nodes.find(
            (n) => n.tmPubkey === data.peers[validatorAddress].pub_key.value
          );

          const aug = Object.assign({}, data.peers[validatorAddress], r);
          data.peers[validatorAddress] = aug;
        });
      }
      setValidators(data);
    });
  }
  function getParty(id) {
    return fetchWrapper
      .post(
        apiUrl("query"),
        {
          query:
            "query ($id: ID!) {\n  party(id: $id) {\n    id\n    proposals {      id      reference      state      datetime    }\n    positions {      market {        id      }      openVolume      realisedPNL      unrealisedPNL      averageEntryPrice      margins {        maintenanceLevel        searchLevel        initialLevel        collateralReleaseLevel      }}\n    accounts {      type      asset { id symbol }\n      market {        id        decimalPlaces      }      balance    }\n    orders(last: 30) {      id      size      price      side      remaining      market{id}\n      trades {        id        size        aggressor        size        seller {          id        }\n        buyer {          id        }      }    }  }\n}\n\n  ",
          variables: {
            id,
          },
        },
        {
          mode: "cors",
          credentials: "omit",
        }
      )
      .then((data) => {
        setParty(data.data);
      });
  }
}
