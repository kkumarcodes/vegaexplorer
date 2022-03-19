import React, { useEffect, useState } from "react";
import TransactionType from "./TransactionType";
import PriceByMarket from "./PriceByMarket";
import MarketLink from "./MarketLink";
import TwoColumnData from "../TwoColumnData";


const Transaction = ({ hash, tx, pubKey, type }) => {
  const [rows, setRows] = useState([]);

  useEffect(() => {
    if (tx) {
      let _rows = [];
      const keys = Object.keys(tx);
      keys.forEach((key) => {
        _rows.push({ title: key, value: tx[key] });
      });
      setRows(_rows);
    }
  }, [tx]);

  return (
    <details className={pubKey}>
      <summary>
        {type === "OrderSubmission" ? (
          <>
            &nbsp;&nbsp;
            <TransactionType type={type} hash={hash} />
            {tx.size} @{" "}
            <PriceByMarket price={tx.price} marketId={tx.marketId} /> in{" "}
            <MarketLink id={tx.marketId} />
            <br />
          </>
        ) : (
          <>
            &nbsp;&nbsp;
            <TransactionType type={type} hash={hash} />
            <br />
          </>
        )}
      </summary>
      <TwoColumnData rows={rows} />
    </details>
  );
};

export default Transaction;
