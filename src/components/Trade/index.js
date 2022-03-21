import React from "react";
import { Table } from "reactstrap";
import { NavLink } from "react-router-dom";

const Trade = ({trades}) => {
  return (
    <>
    <h2>Trades</h2>
    <Table>
      <tbody>
        {trades &&
          trades.map((trade) => {
            return (
              <tr key={trade.id}>
                <td>
                  <NavLink to={`/tx/trade/${trade.id}`}>{trade.id}</NavLink>
                </td>
              </tr>
            );
          })}
      </tbody>
    </Table>
    </>
  );
};

export default Trade;
