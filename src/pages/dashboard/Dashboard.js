import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { Card, CardBody, CardTitle, Table } from "reactstrap";
import { useRecoilState } from "recoil";
import { Statistics } from "../../store";
import useExplore from "../../hooks/useExplore";

const Dashboard = () => {
  const { id } = useParams();
  const [statistics] = useRecoilState(Statistics);
  const useExploreAction = useExplore();
  useEffect(() => {
    useExploreAction.getStatistics();
  }, []);

  return (
    <Card>
      <CardBody>
        <CardTitle tag="h5">VEGA BLOCK EXPLORER</CardTitle>
        {statistics && (
          <Table>
            <tbody>
              <tr>
                <th>ChainId</th>
                <th>AppVersion</th>
                <th>Status</th>
              </tr>
              <tr>
                <td>{statistics.chainId}</td>
                <td>{statistics.appVersion}</td>
                <td>{statistics.status}</td>
              </tr>
              <tr><pre>{JSON.stringify(statistics, null, 2)}</pre></tr>
            </tbody>
          </Table>
        )}
      </CardBody>
    </Card>
  );
};

export default Dashboard;
