import React, { useEffect } from "react";
import { useParams } from "react-router-dom"
import { Card, CardBody, Table, CardTitle } from "reactstrap";
import { useRecoilState } from "recoil";
import { Order } from "../../store";
import useExplore from "../../hooks/useExplore";
const OrderPage = () => {
  const { id } = useParams()
  const [order] = useRecoilState(Order);
  const useExploreAction = useExplore();
  useEffect(() => {
    if (id) {
      useExploreAction.getOrder(id);
    }
  }, [id]);
  return id ? (
    <Card>
      <CardBody>
        <CardTitle tag="h5">Order Details</CardTitle>
        <Table>
          <tbody>
            <tr>
              <td>Order ID:</td>
              <td>{id}</td>
            </tr>
            <tr>
              <td></td>
              <td>
                <pre>{JSON.stringify(order, null, 2)}</pre>
              </td>
            </tr>
          </tbody>
        </Table>
      </CardBody>
    </Card>
  ) : (
    <div>
      <p>Select a transaction from a block to see their details</p>
    </div>
  );
};

export default OrderPage;
