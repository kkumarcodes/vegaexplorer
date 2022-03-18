import React, { useEffect, useState } from "react";
import { markets } from "../../store";
import { useRecoilState } from "recoil";

const PriceByMarket = ({ price, marketId }) => {
  const [market, setMarket] = useState();
  const [marketData,] = useRecoilState(markets);
  useEffect(() => {
    if (marketId && marketData) {
      const _market = marketData[marketId]
      setMarket(_market)
    }
  }, [marketId, marketData]);


  function formatNumber(price, decimalPlaces) {
    // Used to store a minus
    let prefix = "";
    // Preserve plus or minus prefix
    if (price.charAt(0) === "-") {
      prefix = price.substring(0, 1);
      price = price.substring(1);
    }
    if (decimalPlaces === 0) {
      return prefix + price;
    }
    // EG: str = '1', d = 3. Shouuld be '0.001'
    if (decimalPlaces >= price.length) {
      return prefix + "0." + price.padStart(decimalPlaces, "0");
    }
    // EG: str = '12345', d = 2. Should be '123.45
    const re = new RegExp(`([\\d]+)(\\d{${decimalPlaces}})$`);
    return prefix + price.replace(re, "$1.$2");
  }

  return (
    <>
      {isNaN(Number(price))
        ? "-"
        : market
        ? formatNumber(price, market.decimalPlaces)
        : formatNumber(price, 5)}
    </>
  );
};

export default PriceByMarket;
