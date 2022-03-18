import React, { useEffect } from "react";
import { useParams, useHistory } from "react-router-dom";
import { ButtonGroup, Button } from "reactstrap";
import { useRecoilState } from "recoil";
import { Blocks, Block } from "../../store";
import useExplore from "../../hooks/useExplore";
import Hash from "../../components/Transaction/Hash";
import BlockHeader from "../../components/BlockHeader";
import Transaction from "../../components/Transaction";
import { tendermintUrl } from "../../config";
const BlockDetail = () => {
  const { slug } = useParams();
  const [blocks, setBlocks] = useRecoilState(Blocks);
  const [block, setBlock] = useRecoilState(Block);
  const useExploreAction = useExplore();
  let history = useHistory();

  useEffect(() => {
    useExploreAction.getBlockData();
  }, []);

  useEffect(() => {
    if (blocks && slug) {
      useExploreAction.getBlockByHeight({
        node_url: tendermintUrl(),
        block_height: parseInt(slug),
      });
    }
  }, [blocks, slug]);

  console.log(blocks, "===blocks===");
  console.log(block, "===block===");
  return (
    <>
    <ButtonGroup>
  <Button
  onClick={() => history.push(`/tx/blocks/${Number(slug) - 1}`)}>
  Previous block
  </Button>
  <Button
  onClick={() => history.push(`/tx/blocks/${Number(slug) - 1}`)}>
  Next block
  </Button>
</ButtonGroup>
      <h1>
        <Hash text={`Block height ${slug}`} />
      </h1>

      <ul class="content">
        {blocks && blocks.blocks && (
          <>
            <BlockHeader block={blocks.blocks[slug]} />
            <hr />
          </>
        )}
        {block &&
          block.map(({ Type, PubKey, Command, TxHash }, i) => (
            <Transaction
              hash={TxHash}
              tx={Command}
              pubKey={PubKey}
              type={Type}
            />
          ))}
      </ul>
    </>
  );
};

export default BlockDetail;
