import React, { useEffect, useState } from "react";

const ValidatorLink = ({ id }) => {
  return (
    <>
      <a href="/tx/network/">{id}</a>
    </>
  );
};

export default ValidatorLink;
