import React, { useEffect } from "react";
import { Card, CardBody, CardTitle } from "reactstrap";
import { useRecoilState } from "recoil";
import { markets } from "../../store";
import useExplore from "../../hooks/useExplore";

const Trading = () => {
  const [marketData, setMarketData] = useRecoilState(markets);
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
                  <a href={`/tx/markets/${market.id}`}>
                    {market.name}
                  </a>
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
