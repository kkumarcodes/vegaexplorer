import React from "react";
import { Table } from "reactstrap";
import PartyLink from "./PartyLink";
import ValidatorLink from "./ValidatorLink";
import BlockLink from "./BlockLink";
import Hash from "./Hash";
import OrderLink from "./OrderLink";
import OrderReferenceLink from "./OrderReferenceLink";
import MarketLink from "./MarketLink";
import PriceByMarket from "./PriceByMarket";

const TwoColumnData = ({ rows }) => {
  return (
    <>
      {rows && (
        <Table>
          <tbody>
            {rows.map((row) => (
              <tr key={row.value}>
                <td>{row.title.trim()}</td>
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
        </Table>
      )}
    </>
  );
};

export default TwoColumnData;
