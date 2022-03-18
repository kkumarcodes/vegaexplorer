import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
const TransactionType = ({ hash, type }) => {
  const [emoji, setEmoji] = useState();

  useEffect(() => {
    if (type) {
      if (type === "OrderSubmission") {
        setEmoji("🛒");
      }
    }
  }, [type]);

  return (
    <span>
      {emoji && <strong>{emoji}</strong>}
      <NavLink to={`/tx/transaction/${hash}`}>{type}</NavLink>
    </span>
  );
};

export default TransactionType;
