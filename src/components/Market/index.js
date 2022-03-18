import React, { useEffect, useState } from "react";
import { useRecoilState } from "recoil";
import { markets } from "../../store";
import TwoColumnData from "../Transaction/TwoColumnData"
const Market = ({ id }) => {
  const [marketData,] = useRecoilState(markets);
  const [market, setMarket] = useState();

  useEffect(() => {
    if (id) {
      const _market = marketData.markets.filter((el) => el.id === id);
      if (_market.length > 0) {
        setMarket(_market[0]);
      }
    }
  }, [id, marketData]);
  return (
    <div>
      {market ? (
        <div key={market.id}>
          <h1>{market.name}</h1>
          <TwoColumnData
            rows={[
              { title: "ID", value: market.id },
              { title: "Name", value: market.name },
              {
                title: "Best Bid Price",
                value: market.data.bestBidPrice,
                marketId: market.id,
                type: "price",
              },
              {
                title: "Best Offer Price",
                value: market.data.bestOfferPrice,
                marketId: market.id,
                type: "price",
              },
              {
                title: "Mark Price",
                value: market.data.markPrice,
                marketId: market.id,
                type: "price",
              },
              {
                title: "Mid Price",
                value: market.data.midPrice,
                marketId: market.id,
                type: "price",
              },
              { title: "Decimal places", value: market.decimalPlaces },
              {
                title: "Tradable instrument",
                value: market.tradableInstrument.instrument,
                type: "raw",
              },
              {
                title: "Instrument margin calculator",
                value: market.tradableInstrument.marginCalculator,
                type: "raw",
              },
            ]}
          />
        </div>
      ) : (
        <h1>Loading {id}...</h1>
      )}
    </div>
  );
};

export default Market;
