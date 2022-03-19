import React from "react";
import { NavLink } from "react-router-dom";

const Hash = ({ text, href = false }) => {
  return (
    <>
      {text && (
        <div className="hash-wrapper">
          {text.length > 20 ? (
            href ? (
              <NavLink to={href}>
                <span className="firstPart">{text}</span>
                <span className="lastPart">{text.substr(-5)}</span>
              </NavLink>
            ) : (
              <>
                <span className="firstPart">{text}</span>
                <span className="lastPart">{text.substr(-5)}</span>
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
