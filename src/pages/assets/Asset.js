import React, { useEffect } from "react";
import { useParams } from "react-router-dom"
import { Card, CardBody, Table, CardTitle } from "reactstrap";
import { useRecoilState } from "recoil";
import { Asset } from "../../store";
import useExplore from "../../hooks/useExplore";
const AssetDetail = () => {
  const { id } = useParams()
  const [asset] = useRecoilState(Asset);
  const useExploreAction = useExplore();
  useEffect(() => {
    if (id) {
      useExploreAction.getAsset(id);
    }
  }, [id]);
  return id ? (
    <Card>
      <CardBody>
        <CardTitle tag="h5">Asset Details</CardTitle>
        <Table>
          <tbody>
            <tr>
              <td>Asset ID:</td>
              <td>{id}</td>
            </tr>
            <tr>
              <td></td>
              <td>
                <pre>{JSON.stringify(asset, null, 2)}</pre>
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

export default AssetDetail;
