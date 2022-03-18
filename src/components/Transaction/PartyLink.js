import React, { useEffect, useState } from "react";
import Hash from "./Hash";
const PartyLink = ({ id }) => {

  let icon = "";
  if (id === "network") {
    icon = "🔴";
  }
  return (
    <>
      {id.length > 15 ? (
        <Hash text={id} href={`/party/${id}`} />
      ) : (
        <a href={`/tx/party/${id}`}>
          {icon}
          {id}
        </a>
      )}
    </>
  );
};

export default PartyLink;
