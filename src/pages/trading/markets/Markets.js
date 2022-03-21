import React, { useEffect, useState } from "react";
import { Row, Col } from "reactstrap";
import { useParams } from "react-router-dom";
import { useRecoilState } from "recoil";
import { markets } from "../../../store";
import Market from "../../../components/Market";
import Account from "../../../components/Account";
import Order from "../../../components/Order";
import Trade from "../../../components/Trade";

const Markets = () => {
  const { id } = useParams();
  const [marketData] = useRecoilState(markets);
  const [market, setMarket] = useState();

  useEffect(() => {
    if (id && marketData && marketData.markets) {
      const _market = marketData.markets.filter((el) => el.id === id);
      if (_market.length > 0) {
        setMarket(_market[0]);
      }
    }
  }, [id, marketData]);

  return (
    <div>
      {market ? (
        <div key={market.id}>
          <Market id={market.id} />
          {market.accounts &&
            market.accounts.length > 0 &&
            market.accounts.map((a) => (
              <Account account={a} marketId={market.id} />
            ))}
          <Row>
            <Col>{market.orders && <Order orders={market.orders} />}</Col>
            <Col>{market.trades && <Trade trades={market.trades} />}</Col>
          </Row>
        </div>
      ) : (
        <h2>Loading...</h2>
      )}
    </div>
  );
};

export default Markets;
