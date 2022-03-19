import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { useRecoilState } from "recoil";
import { markets } from "../../store";
const MarketLink = ({ id }) => {
  const [marketData,] = useRecoilState(markets);

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
        <NavLink to={`/tx/markets/${id}`}>{market.name}</NavLink>
      )}
    </>
  );
};

export default MarketLink;
