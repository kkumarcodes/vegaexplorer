import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { Card, CardBody, Table, CardTitle } from "reactstrap";
import { useRecoilState } from "recoil";
import { Txs } from "../../store";
import useExplore from "../../hooks/useExplore";

const Transaction = () => {
  const { slug } = useParams();
  const [tx,] = useRecoilState(Txs);
  const useExploreAction = useExplore();

  useEffect(() => {
    if (slug) {
      useExploreAction.getTransaction(slug);
    }
  }, [slug]);
  return slug ? (
    <Card>
      <CardBody>
        <CardTitle tag="h5">Transaction Details</CardTitle>
        <Table>
          <tbody>
            <tr>
              <td>Tx Hash:</td>
              <td>{slug}</td>
            </tr>
            <tr>
              <td>Network:</td>
              <td>{localStorage.getItem("network")}</td>
            </tr>
            <tr>
              <td></td>
              <td>
                <pre>{JSON.stringify(tx, null, 2)}</pre>
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

export default Transaction;
