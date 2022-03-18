import React from "react";
import { NavLink } from "react-router-dom";

const ErrorPage = () => {
  return (
    <>
      <h2>Page does not exist</h2>
      <NavLink to={"/"}>Go to Home</NavLink>
    </>
  );
};

export default ErrorPage;
