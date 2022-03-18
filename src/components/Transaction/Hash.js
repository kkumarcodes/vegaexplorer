import React, { useEffect, useState } from "react";
import { useRecoilState } from "recoil";
import { markets } from "../../store";

const Hash = ({ text, href = false }) => {
  const [marketData, setMarketData] = useRecoilState(markets);

  // function copyReaction() {
  //   copyElement.innerHTML = "✅";
  //   setTimeout(() => {
  //     if (copyElement) {
  //       copyElement.innerHTML = "📋";
  //     }
  //   }, 3000);
  // }
  return (
    <>
      {text && (
        <div class="hash-wrapper">
          {text.length > 20 ? (
            href ? (
              <a href={href}>
                <span class="firstPart">{text}</span>
                <span class="lastPart">{text.substr(-5)}</span>
              </a>
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
