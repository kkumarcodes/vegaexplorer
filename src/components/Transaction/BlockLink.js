import React, { useEffect, useState } from "react";

const BlockLink = ({ id }) => {

  let block;
  function getBlockFromTradeId(id) {
    return Number(id.toUpperCase().split("-")[0].replace("V", 0)).toString();
  }
  if (id && id.indexOf("-") !== -1) {
    block = getBlockFromTradeId(id);
  } else {
    block = id;
  }
  return <>{block && <a href="/blocks/{block}">{block}</a>}</>;
};

export default BlockLink;
