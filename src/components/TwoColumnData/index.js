import React from "react";
import { Table } from "reactstrap";
import PartyLink from "../Transaction/PartyLink";
import ValidatorLink from "../Transaction/ValidatorLink";
import BlockLink from "../Transaction/BlockLink";
import Hash from "../Transaction/Hash";
import OrderLink from "../Transaction/OrderLink";
import OrderReferenceLink from "../Transaction/OrderReferenceLink";
import MarketLink from "../Transaction/MarketLink";
import PriceByMarket from "../Transaction/PriceByMarket";
import s from "./index.module.scss";

const TwoColumnData = ({ rows }) => {
  return (
    <>
      {rows && (
        <Table className={s.root}>
          <tbody>
            {rows.map((row) => (
              <tr key={row.value}>
                <th>{row.title.trim()}</th>
                <td>
                  {row.value ? (
                    row.type === "party" ? (
                      <PartyLink id={row.value} />
                    ) : row.type === "validator" ? (
                      <ValidatorLink id={row.value} />
                    ) : row.type === "block" ? (
                      <BlockLink id={row.value} />
                    ) : row.type === "hash" ? (
                      <Hash text={row.value} />
                    ) : row.type === "order" ? (
                      <OrderLink id={row.value} />
                    ) : row.type === "order-reference" ? (
                      <OrderReferenceLink reference={row.value} />
                    ) : row.type === "market" ? (
                      <MarketLink id={row.value} />
                    ) : row.type === "raw" ? (
                      <pre>{JSON.stringify(row.value, null, 2)}</pre>
                    ) : row.type === "price" ? (
                      <PriceByMarket
                        price={row.value}
                        marketId={row.marketId}
                      />
                    ) : row.type === "image" ? (
                      <img src={row.value} width="60" height="60" alt=""/>
                    ) : typeof row.value === "number" ||
                      typeof row.value === "string" ? (
                      row.value
                    ) : (
                      "-"
                    )
                  ) : (
                    "-"
                  )}
                </td>
              </tr>
            ))}
          </tbody>
          <input type="hidden" value="ser_berm" />
        </Table>
      )}
    </>
  );
};

export default TwoColumnData;
