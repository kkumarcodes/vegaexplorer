import React, { useEffect, useState } from "react";
import GeneralAccount from "./GeneralAccount";
import GenericAccount from "./GenericAccount";
import MarginAccount from "./MarginAccount";
import InsuranceAccount from "./InsuranceAccount";
import FeeAccount from "./FeeAccount";

const Account = ({ account, marketId = false, positions = false }) => {
  const [rows, setRows] = useState();
  const [position, setPosition] = useState();
  if (!marketId && account.market) {
    marketId = account.market.id;
  }

  useEffect(() => {
    let _rows = [];
    let _position;
    // This checks if there is a position for this market
    if (positions) {
      _position = positions.find((p) => p.market.id === marketId);
    }
    if (account.market) {
      _rows = [
        ..._rows,
        { title: "Market position", value: marketId, type: "market" },
      ];
      if (_position) {
        _rows = [
          ..._rows,
          { title: "Open Volume", value: _position.openVolume },
          {
            title: "Realised PNL",
            value: _position.realisedPNL,
            type: "price",
            marketId: marketId,
          },
          {
            title: "Unrealised PNL",
            value: _position.unrealisedPNL,
            type: "price",
            marketId: marketId,
          },
        ];
      }
      _rows.push({
        title: "Held margin balance",
        value: account.balance,
        type: "price",
        marketId: marketId,
      });
    } else {
      _rows = [
        ..._rows,
        {
          title: account.asset.symbol,
          value: account.balance,
          type: "price",
          marketId: marketId,
        },
      ];
    }
    setPosition(_position)
    setRows(_rows);
  }, [marketId, positions, account]);
  return position ? (
    <MarginAccount rows={rows} />
  ) : account.type === "General" ? (
    <GeneralAccount rows={rows} />
  ) : account.type === "FeeLiquidity" ? (
    <FeeAccount rows={rows} type={account.type} />
  ) : account.type === "FeeInfrastructure" ? (
    <FeeAccount rows={rows} type={account.type} />
  ) : account.type === "Settlement" ? (
    <GenericAccount rows={rows} type={account.type} />
  ) : account.type === "Insurance" ? (
    <InsuranceAccount rows={rows} />
  ) : (
    <GenericAccount rows={rows} type={account.type} />
  );
};

export default Account;
