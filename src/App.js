// -- React and related libs
import React from "react";
import { Switch, Route, Redirect } from "react-router";
import { BrowserRouter } from "react-router-dom";
import { RecoilRoot } from "recoil";

// -- Custom Components
import LayoutComponent from "./components/Layout/Layout";

// -- Third Party Libs
import { ToastContainer } from "react-toastify";

// -- Component Styles
import "./styles/app.scss";

const App = (props) => {
  return (
    <RecoilRoot>
      <ToastContainer />
      <BrowserRouter>
        <Switch>
          <Route path="/" exact render={() => <Redirect to="/tx/blocks" />} />
          <Route
            path="/tx"
            component={LayoutComponent}
          />
          <Route
            path="*"
            exact={true}
            render={() => <Redirect to="/error" />}
          />
        </Switch>
      </BrowserRouter>
    </RecoilRoot>
  );
};

export default App
