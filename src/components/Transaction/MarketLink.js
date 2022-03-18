import React, { useEffect, useState } from "react";
import { useRecoilState } from "recoil";
import { markets } from "../../store";
const MarketLink = ({ id }) => {
  const [marketData, setMarketData] = useRecoilState(markets);

  const [market, setMarket] = useState();

  useEffect(() => {
    if (id && marketData && marketData.markets) {
      const _market = marketData.markets.filter((el) => el.id === id);
      if (_market.length > 0) {
        setMarket(_market[0]);
      }
    }
  }, [id, marketData]);

  return (
    <>
      {!market ? (
        "Loading..."
      ) : (
        <a href="/tx/trading/markets/{id}">{market.name}</a>
      )}
    </>
  );
};

export default MarketLink;
