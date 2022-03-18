import React, { useEffect } from "react";
import { useParams } from "react-router-dom"
import { Card, CardBody, Table, CardTitle } from "reactstrap";
import { useRecoilState } from "recoil";
import { searchedBlocks, searchBlockID } from "../../store";

const Blocks = () => {
  const { id } = useParams()
  const [data, setData] = useRecoilState(searchedBlocks)
  const [currentId, setCurrentId] = useRecoilState(searchBlockID)

  useEffect(() => {
    setCurrentId(id)
  }, [id, setCurrentId])

  const columns = React.useMemo(
    () => [
      {
        Header: "Name",
        accessor: "age",
      },
      {
        Header: "Info",
        accessor: "age",
      },
    ],
    []
  );
  return (
    <Card>
      <CardBody>
        <CardTitle tag="h5">VEGA BLOCK EXPLORER</CardTitle>
        <Table columns={columns} data={data} />
      </CardBody>
    </Card>
  );
};

export default Blocks;
