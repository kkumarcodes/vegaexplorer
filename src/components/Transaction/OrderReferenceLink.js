import React, { useEffect, useState } from "react";

const OrderReferenceLink = ({ reference }) => {
  return (
    <>
      <a href="/tx/trading/orders/byReference/{reference}">{reference}</a>
    </>
  );
};

export default OrderReferenceLink;
