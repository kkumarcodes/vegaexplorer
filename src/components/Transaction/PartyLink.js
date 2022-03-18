import React from "react";
import { NavLink } from "react-router-dom";
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
        <NavLink to={`/tx/party/${id}`}>
          {icon}
          {id}
        </NavLink>
      )}
    </>
  );
};

export default PartyLink;
