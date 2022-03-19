import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useRecoilState } from "recoil";
import { Party } from "../../store";
import Hash from "../../components/Transaction/Hash";
import OrderLink from "../../components/Transaction/OrderLink";
import MarketLink from "../../components/Transaction/MarketLink";
import PriceByMarket from "../../components/Transaction/PriceByMarket";
import BlockLink from "../../components/Transaction/BlockLink";
import Account from "../../components/Account";
import useExplore from "../../hooks/useExplore";

const PartyPage = () => {
  const { slug } = useParams();
  const [party] = useRecoilState(Party);
  const useExploreAction = useExplore();
  useEffect(() => {
    if (slug) {
      useExploreAction.getParty(slug);
    }
  }, [slug]);

  return slug ? (
    <div>
      {party ? (
        <>
          <h2>{party.id.length > 15 ? <Hash text={party.id} /> : party.id}</h2>

          <h2>Accounts</h2>
          <ul>
            {party.accounts.map((a) => {
              return <Account account={a} positions={party.positions} />;
            })}
          </ul>
          <h2>Recent orders</h2>
          <ul>
            {party.orders.map((or) => {
              return (
                <li>
                  <OrderLink id={or.id} short={true} />:
                  {or.remaining === 0 ? (
                    <>
                      <s>
                        {or.side} in <MarketLink id={or.market.id} />
                      </s>
                      : {or.size} @{" "}
                      <PriceByMarket marketId={or.market.id} price={or.price} />
                    </>
                  ) : or.remaining === or.size ? (
                    <>
                      <b>
                        {or.side} in <MarketLink id={or.market.id} />
                      </b>
                      : {or.size} @{" "}
                      <PriceByMarket marketId={or.market.id} price={or.price} />
                    </>
                  ) : or.remaining !== "0" ? (
                    <>
                      <b>
                        {or.side} in <MarketLink id={or.market.id} />
                      </b>
                      : {or.size} @{" "}
                      <PriceByMarket marketId={or.market.id} price={or.price} />
                      <i>(remaining: {or.remaining})</i>
                    </>
                  ) : (
                    <>
                      <s>
                        {or.side} in <MarketLink id={or.market.id} />
                      </s>
                      : {or.size} @{" "}
                      <PriceByMarket marketId={or.market.id} price={or.price} />{" "}
                      (filled)
                    </>
                  )}
                  in <BlockLink id={or.id} />
                </li>
              );
            })}
          </ul>
        </>
      ) : (
        <h2>Loading...</h2>
      )}
    </div>
  ) : (
    <div>
      <p>Select a party from a block or trading view to see their details</p>
    </div>
  );
};

export default PartyPage;
