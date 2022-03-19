import React, { useEffect } from "react";
import { Card, CardBody, CardTitle, Table } from "reactstrap";
import { useRecoilState } from "recoil";
import { NavLink } from "react-router-dom";
import { Blocks } from "../../store";
import useExplore from "../../hooks/useExplore";
import Hash from "../../components/Transaction/Hash";

const BlocksPage = () => {
  const [blocks] = useRecoilState(Blocks);
  const useExploreAction = useExplore();

  useEffect(() => {
    if (useExploreAction) useExploreAction.getBlockData();
  }, []);

  return (
    <Card>
      <CardBody>
        <CardTitle tag="h5">Recent blocks</CardTitle>
        <Table>
          {blocks && blocks.blocks ? (
            <tbody>
              {Object.keys(blocks.blocks)
                .sort((a, b) => b - a)
                .map((blockKey) => {
                  return (
                    <tr key={blockKey}>
                      <td>
                        <NavLink
                          to={`blocks/${blocks.blocks[blockKey].header.height}`}
                        >
                          {blocks.blocks[blockKey].header.height}
                        </NavLink>
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
          ) : (
            "Loading..."
          )}
        </Table>
      </CardBody>
    </Card>
  );
};

export default BlocksPage;
