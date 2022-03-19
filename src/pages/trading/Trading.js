import React, { useEffect } from "react";
import { NavLink } from "react-router-dom";
import { Card, CardBody, CardTitle, Table } from "reactstrap";
import { useRecoilState } from "recoil";
import { markets } from "../../store";
import useExplore from "../../hooks/useExplore";

const Trading = () => {
  const [marketData] = useRecoilState(markets);
  const useExploreAction = useExplore();
  useEffect(() => {
    useExploreAction.getMarkets();
  }, []);
  return (
    <Card>
      <CardBody>
        <CardTitle tag="h5">Markets</CardTitle>
        {marketData && marketData.markets ? (
          <Table>
            <tbody>
              {marketData.markets.map((market) => {
                return (
                  <tr key={market.id}>
                    <td>
                      <NavLink to={`/tx/markets/${market.id}`}>
                        {market.name}
                      </NavLink>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </Table>
        ) : (
          "Loading..."
        )}
      </CardBody>
    </Card>
  );
};

export default Trading;
