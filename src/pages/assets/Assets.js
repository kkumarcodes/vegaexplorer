import React, { useEffect } from "react";
import { NavLink } from "react-router-dom";
import { Card, CardBody, Table, CardTitle } from "reactstrap";
import { useRecoilState } from "recoil";
import { Assets } from "../../store";
import useExplore from "../../hooks/useExplore";
const AssetsPage = () => {
  const [assets] = useRecoilState(Assets);
  const useExploreAction = useExplore();
  useEffect(() => {
    useExploreAction.getAssets();
  }, []);
  return assets ? (
    <Card>
      <CardBody>
        <CardTitle tag="h5">Assets Details</CardTitle>
        <Table>
          <tbody>
            <tr>
              <th>
                Asset ID
              </th>
              <th>
                Name
              </th>
              <th>
                Symbol
              </th>
            </tr>
            {assets.map((asset) => {
              return (
                <tr>
                  <td><NavLink to={`/tx/assets/${asset.id}`}>{asset.id}</NavLink></td>
                  <td>{asset.name}</td>
                  <td>{asset.symbol}</td>
                </tr>
              );
            })}
          </tbody>
        </Table>
      </CardBody>
    </Card>
  ) : (
    <div>
      <p>Select a transaction from a block to see their details</p>
    </div>
  );
};

export default AssetsPage;
