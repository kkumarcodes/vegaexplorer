import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { Card, CardBody, CardTitle } from "reactstrap";
import { useRecoilState } from "recoil";
import { Blocks, Block } from "../../store";
import Transaction from '../../components/Transaction';

const Dashboard = () => {
  const { id } = useParams();
  const [data, setData] = useRecoilState(Block);
  const [currentId, setCurrentId] = useRecoilState(Block);

  useEffect(() => {
    setCurrentId(id);
  }, [id, setCurrentId]);

  return (
    <Card>
      <CardBody>
        <CardTitle tag="h5">VEGA BLOCK EXPLORER</CardTitle>
        {data &&
          data.map(({ Type, PubKey, Command, TxHash }, i) => (
            <Transaction
              hash={TxHash}
              tx={Command}
              pubKey={PubKey}
              type={Type}
            />
          ))}
      </CardBody>
    </Card>
  );
};

export default Dashboard;
