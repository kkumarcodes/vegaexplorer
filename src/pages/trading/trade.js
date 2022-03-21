import React, { useEffect } from "react";
import { useParams } from "react-router-dom"
import { Card, CardBody, Table, CardTitle } from "reactstrap";
import { useRecoilState } from "recoil";
import { Trade } from "../../store";
import useExplore from "../../hooks/useExplore";
const TradePage = () => {
  const { id } = useParams()
  const [trade] = useRecoilState(Trade);
  const useExploreAction = useExplore();
  useEffect(() => {
    if (id) {
      useExploreAction.getTrade(id);
    }
  }, [id]);
  return id ? (
    <Card>
      <CardBody>
        <CardTitle tag="h5">Trade Details</CardTitle>
        <Table>
          <tbody>
            <tr>
              <td>Trade ID:</td>
              <td>{id}</td>
            </tr>
            <tr>
              <td></td>
              <td>
                <pre>{JSON.stringify(trade, null, 2)}</pre>
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

export default TradePage;
