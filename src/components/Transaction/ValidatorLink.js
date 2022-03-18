import React from "react";
import { NavLink } from "react-router-dom";

const ValidatorLink = ({ id }) => {
  return (
    <>
      <NavLink to="/tx/network/">{id}</NavLink>
    </>
  );
};

export default ValidatorLink;
