import React from "react";
import TwoColumnData from "../Transaction/TwoColumnData";

const InsuranceAccount = ({ rows, type }) => {
  return (
    <>
      <h2>Insurance Account ({type})</h2>
      <TwoColumnData rows={rows} />
    </>
  );
};

export default InsuranceAccount;
