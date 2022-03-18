import React, { useEffect } from "react";
import { NavLink } from "react-router-dom";
import { Card, CardBody, CardTitle } from "reactstrap";
import { useRecoilState } from "recoil";
import { markets } from "../../store";
import useExplore from "../../hooks/useExplore";

const Trading = () => {
  const [marketData,] = useRecoilState(markets);
  const useExploreAction = useExplore();
  useEffect(() => {
    useExploreAction.getMarkets();
  }, []);
  return (
    <Card>
      <CardBody>
        <CardTitle tag="h5">Markets</CardTitle>
        {marketData && marketData.markets ? (
          <ul>
            {marketData.markets.map((market) => {
              return (
                <li key={market.id}>
                  <NavLink to={`/tx/markets/${market.id}`}>
                    {market.name}
                  </NavLink>
                </li>
              );
            })}
          </ul>
        ) : (
          "Loading..."
        )}
      </CardBody>
    </Card>
  );
};

export default Trading;
