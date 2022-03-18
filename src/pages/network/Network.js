import React, { useEffect } from "react";
import { Card, CardBody, CardTitle } from "reactstrap";
import { useRecoilState } from "recoil";
import Validator from "../../components/Transaction/Validator";
import { Validators } from "../../store";
import useExplore from "../../hooks/useExplore";

const Network = () => {
  const [validators, setValidators] = useRecoilState(Validators);
  const useExploreAction = useExplore();

  useEffect(() => {
    useExploreAction.getValidators();
  }, []);

  return (
    <Card>
      <CardBody>
        <CardTitle tag="h5">Network</CardTitle>
        {validators && validators.peers && 
          Object.keys(validators.peers).map((validatorAddress, i) => <Validator validator={validators.peers[validatorAddress]} />)}
      </CardBody>
    </Card>
  );
};

export default Network;
