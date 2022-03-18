import React, { useEffect, useState } from "react";

const OrderLink = ({ id, short = false }) => {
  let display = id;
  if (short) {
    display = Number(id.split("-")[1]).toString();
  }

  return (
    <>
      <a href="/tx/trading/orders/{id}">{display}</a>
    </>
  );
};

export default OrderLink;
