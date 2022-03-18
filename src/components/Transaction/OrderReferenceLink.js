import React from "react";
import { NavLink } from "react-router-dom";

const OrderReferenceLink = ({ reference }) => {
  return (
    <>
      <NavLink to={`/tx/trading/orders/byReference/${reference}`}>{reference}</NavLink>
    </>
  );
};

export default OrderReferenceLink;
