import React, { useEffect } from "react";
import TwoColumnData from "../TwoColumnData";

const Validator = ({ validator }) => {
  const [rows, setRows] = React.useState([]);
  useEffect(() => {
    if (validator) {
      setRows([
        { title: "Name", value: validator.name },
        { title: "Avatar", value: validator.avatarUrl, type: "image" },
        { title: "Info", value: validator.infoUrl },
        { title: "Address", value: validator.address, type: "hash" },
        { title: "Voting Power", value: validator.voting_power },
        { title: "Priority", value: validator.proposer_priority },
        { title: "Tendermint Key", value: validator.pub_key?.value },
      ]);
    }
  }, [validator]);
  return <TwoColumnData rows={rows} />;
};

export default Validator;
