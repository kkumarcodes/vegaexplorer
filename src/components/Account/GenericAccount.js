import React from "react";
import TwoColumnData from "../Transaction/TwoColumnData";

const GenericAccount = ({ rows, type }) => {
  return (
    <>
      <h2>Generic Account ({type})</h2>
      <TwoColumnData rows={rows} />
    </>
  );
};

export default GenericAccount;
