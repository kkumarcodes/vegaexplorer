import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { Card, CardBody, CardTitle, Table } from "reactstrap";
import { useRecoilState } from "recoil";
import { Blocks, searchBlockID } from "../../store";
import useExplore from "../../hooks/useExplore";
import Hash from "../../components/Transaction/Hash";

const BlocksPage = () => {
  const [blocks, setBlocks] = useRecoilState(Blocks);
  const useExploreAction = useExplore();

  useEffect(() => {
    useExploreAction.getBlockData();
  }, []);

  return (
    <Card>
      <CardBody>
        <CardTitle tag="h5">Recent blocks</CardTitle>
        <Table>
          {blocks && blocks.blocks && (
            <tbody>
              {Object.keys(blocks.blocks)
                .sort((a, b) => a - b)
                .map((blockKey) => {
                  return (
                    <tr key={blockKey}>
                      <td>
                        <a
                          href={`blocks/${blocks.blocks[blockKey].header.height}`}
                        >
                          {blocks.blocks[blockKey].header.height}
                        </a>
                      </td>
                      <td>
                        {blocks.blocks[blockKey].num_txs ? (
                          ` (txs: ${blocks.blocks[blockKey].num_txs}, size: ${blocks.blocks[blockKey].block_size} time: ${blocks.blocks[blockKey].header.time})`
                        ) : (
                          <>
                            (txs: {blocks.blocks[blockKey].header.num_txs},
                            hash:{" "}
                            <Hash
                              text={blocks.blocks[blockKey].block_id.hash}
                            />
                            )
                          </>
                        )}
                      </td>
                    </tr>
                  );
                })}
            </tbody>
          )}
        </Table>
      </CardBody>
    </Card>
  );
};

export default BlocksPage;
