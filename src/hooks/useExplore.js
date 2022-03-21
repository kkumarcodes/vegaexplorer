import { useSetRecoilState } from "recoil";

import useFetchWrapper from "./useFetchWrapper";
import {
  Blocks,
  Block,
  markets,
  Txs,
  Validators,
  Party,
  Order,
  Trade,
  Assets,
  Asset,
  Statistics,
} from "../store";
import { blockUrl, apiUrl, tendermintUrl } from "../config";
export default function useExplore() {
  // TODO:
  // change the url to env file
  const fetchWrapper = useFetchWrapper();
  const setBlocks = useSetRecoilState(Blocks);
  const setBlock = useSetRecoilState(Block);
  const setParty = useSetRecoilState(Party);
  const setOrder = useSetRecoilState(Order);
  const setTrade = useSetRecoilState(Trade);
  const setAssets = useSetRecoilState(Assets);
  const setAsset = useSetRecoilState(Asset);
  const setMarkets = useSetRecoilState(markets);
  const setTxs = useSetRecoilState(Txs);
  const setValidators = useSetRecoilState(Validators);
  const setStatistics = useSetRecoilState(Statistics);

  return {
    getBlockByHeight,
    getMarkets,
    getTransaction,
    getValidators,
    getBlockData,
    getParty,
    getOrder,
    getTrade,
    getAsset,
    getAssets,
    getStatistics,
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
          query: `
            query ($id: ID) {
              markets(id: $id) {
                id
                 name
                fees {
                  factors {
                    makerFee
                    infrastructureFee
                    liquidityFee
                  }
                }
                tradableInstrument {
                  instrument {
                    id
                    code
                    name
                    metadata {
                      tags
                    }
                  }
                  marginCalculator {
                    scalingFactors {
                      searchLevel
                      initialMargin
                      collateralRelease
                    }
                  }
                  
                }
                tradingMode 
                data {
                  markPrice
                  bestBidPrice
                  midPrice
                  openInterest
                  
                }
                decimalPlaces
                accounts {
                  type
                  balance
                  asset {
                    id
                    symbol
                  }
                  
                }
                orders(last: 20) {
                  id
                }
                trades(last: 20) {
                  id
                }
              }
            }
            
              
            `,
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

  function getOrder(id) {
    return fetchWrapper
      .post(
        apiUrl("query"),
        {
          query: `query ($orderId: ID!) {
              orderByID(orderId: $orderId) {
                id
                price
                timeInForce 
                side
                market {
                  id
                }
                size
                remaining
                party {
                  id
                }
                createdAt
                expiresAt
                status
                reference
                trades {
                  id
                }
                type
                rejectionReason
                version
                updatedAt
                peggedOrder {
                  offset
                  reference
                }
                liquidityProvision {
                  id
                }
              }
            }`,
          variables: {
            orderId: id,
          },
        },
        {
          mode: "cors",
          credentials: "omit",
        }
      )
      .then((data) => {
        setOrder(data.data);
      });
  }

  function getTrade(id) {
    return fetchWrapper
      .post(
        apiUrl("query"),
        {
          query: `query ($orderId: ID!) {
              orderByID(orderId: $orderId) {
                id
                price
                timeInForce 
                side
                market {
                  id
                }
                size
                remaining
                party {
                  id
                }
                createdAt
                expiresAt
                status
                reference
                trades {
                  id
                }
                type
                rejectionReason
                version
                updatedAt
                peggedOrder {
                  offset
                  reference
                }
                liquidityProvision {
                  id
                }
              }
            }`,
          variables: {
            orderId: id,
          },
        },
        {
          mode: "cors",
          credentials: "omit",
        }
      )
      .then((data) => {
        setTrade(data.data);
      });
  }

  function getAssets(id) {
    return fetchWrapper
      .post(
        apiUrl("query"),
        {
          query: `query () {
            assets() {
              id
              name
              symbol
              totalSupply
              decimals
              quantum
              infrastructureFeeAccount {
                balance
                asset {
                  id
                }
                type
                market {
                  id
                }
              }
              globalRewardPoolAccount {
                balance
                asset {
                  id
                }
                type
                market {
                  id
                }
              }
            }
          }`,
          variables: {
            orderId: id,
          },
        },
        {
          mode: "cors",
          credentials: "omit",
        }
      )
      .then((data) => {
        setAssets(data.data.assets);
      });
  }

  function getAsset(id) {
    return fetchWrapper
      .post(
        apiUrl("query"),
        {
          query: `query ($assetId: ID!) {
            asset(assetId: $assetId) {
              id
              name
              symbol
              totalSupply
              decimals
              quantum
              infrastructureFeeAccount {
                balance
                asset {
                  id
                }
                type
                market {
                  id
                }
              }
              globalRewardPoolAccount {
                balance
                asset {
                  id
                }
                type
                market {
                  id
                }
              }
            }
          }`,
          variables: {
            assetId: id,
          },
        },
        {
          mode: "cors",
          credentials: "omit",
        }
      )
      .then((data) => {
        setAsset(data.data);
      });
  }

  function getStatistics() {
    return fetchWrapper
      .post(
        apiUrl("query"),
        {
          query: `query () {
            statistics() {
              blockHeight
              backlogLength
              totalPeers
              genesisTime
              currentTime
              upTime
              vegaTime
              status
              txPerBlock
              averageTxBytes
              averageOrdersPerBlock
              tradesPerSecond
              ordersPerSecond
              totalMarkets
              totalAmendOrder
              totalCancelOrder
              totalCancelOrder
              totalOrders
              totalTrades
              appVersionHash
              appVersion
              chainVersion
              blockDuration
              chainId
            }
          }`,
          variables: {
          },
        },
        {
          mode: "cors",
          credentials: "omit",
        }
      )
      .then((data) => {
        setStatistics(data.data.statistics);
      });
  }
}
