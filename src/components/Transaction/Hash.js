import React from "react";
import { NavLink } from "react-router-dom";

const Hash = ({ text, href = false }) => {
  return (
    <>
      {text && (
        <div class="hash-wrapper">
          {text.length > 20 ? (
            href ? (
              <NavLink to={href}>
                <span class="firstPart">{text}</span>
                <span class="lastPart">{text.substr(-5)}</span>
              </NavLink>
            ) : (
              <>
                <span class="firstPart">{text}</span>
                <span class="lastPart">{text.substr(-5)}</span>
              </>
            )
          ) : (
            text
          )}
        </div>
      )}
    </>
  );
};

export default Hash;
