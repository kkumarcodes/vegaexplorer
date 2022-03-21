import React from "react";
import { Table } from "reactstrap";
import { NavLink } from "react-router-dom";

const Order = ({orders}) => {
  console.log(orders, '===')
  return (
    <>
    <h2>Orders</h2>
    <Table>
      <tbody>
        {orders &&
          orders.map((order) => {
            return (
              <tr key={order.id}>
                <td>
                  <NavLink to={`/tx/order/${order.id}`}>{order.id}</NavLink>
                </td>
              </tr>
            );
          })}
      </tbody>
    </Table>
    </>
  );
};

export default Order;
