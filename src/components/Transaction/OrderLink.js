import React from "react";
import { NavLink } from "react-router-dom";

const OrderLink = ({ id, short = false }) => {
  let display = id;
  if (short) {
    display = Number(id.split("-")[1]).toString();
  }

  return (
    <>
      <NavLink to={`/tx/trading/orders/${id}`}>{display}</NavLink>
    </>
  );
};

export default OrderLink;
