import React from "react";
import { NavLink } from "react-router-dom";

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
  return <>{block && <NavLink to={`/tx/blocks/${block}`}>{block}</NavLink>}</>;
};

export default BlockLink;
