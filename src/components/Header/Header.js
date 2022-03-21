import React, { useEffect } from "react";
import { useParams, useHistory } from "react-router-dom";
import {
  Navbar,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
  Collapse,
  Badge,
  InputGroup,
  Form,
  Input,
  Button,
} from "reactstrap";

import useExplore from "../../hooks/useExplore";
import s from "./Header.module.scss";
import SVG from "../SVG";

const Header = (props) => {
  const { id } = useParams();
  const [searchString, setSearchString] = React.useState(id);
  const useExploreAction = useExplore();
  let history = useHistory()

  const handleSubmit = async (e) => {
    e.preventDefault();
    history.push(`/tx/blocks/${searchString}`)
  };

  useEffect(() => {
    useExploreAction.getMarkets({});
  }, [])
  return (
    <Navbar
      color="light"
      expand="md"
      light
      className={`${s.root} d-print-none`}
    >
      <div className="w-lg-auto">
        <NavbarBrand to="/">Vega</NavbarBrand>
        <div id="ethPrice">
          <Badge
            color="secondary"
            className="d-none d-md-inline-block u-label u-label--price rounded mt-1 ml-n1 text-nowrap"
          >
            Fairground Network
          </Badge>
        </div>
      </div>
      <div>
        <Badge
          color="secondary"
          className="u-label u-label--price rounded-sm d-inline-block d-md-none d-sm-down-none mr-2"
        >
          Fairground Testnet
        </Badge>
        <Button
          color="secondary"
          className="d-inline-block d-md-none d-sm-down-none mr-2 p-1"
        >
          <SVG name="menu" width="38" height="38" fill="#f00" />
        </Button>
      </div>
      <div className="d-flex flex-column w-100">
        <div id="form1">
          <Form className="d-none d-sm-block" inline onSubmit={handleSubmit}>
            <InputGroup>
              <Input
                placeholder="Search by Address / Txn Hash / Block / Token / Ens"
                value={searchString}
                onChange={(e) => setSearchString(e.target.value)}
              />
              <Button color="secondary" className="p-1">
                <SVG name="search" width="24" height="24" fill="#f00" />
              </Button>
            </InputGroup>
          </Form>
        </div>
       
        <Collapse navbar>
        { ' -> '}
          <Nav className="me-auto" navbar>
            <NavItem>
              <NavLink href="/">Home</NavLink>
            </NavItem>
            <NavItem>
              <NavLink href="/tx/network">Network</NavLink>
            </NavItem>
            <NavItem>
              <NavLink href="/tx/trading">Trading</NavLink>
            </NavItem>
            <NavItem>
              <NavLink href="/tx/blocks">Blocks</NavLink>
            </NavItem>
            <NavItem>
              <NavLink href="/tx/party">Party</NavLink>
            </NavItem>
            <NavItem>
              <NavLink href="/tx/assets">Assets</NavLink>
            </NavItem>
          </Nav>
        </Collapse>
      </div>
    </Navbar>
  );
};

export default Header;
