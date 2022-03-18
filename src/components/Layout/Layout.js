// -- React and related libs
import React from "react";
import { Switch, Route } from "react-router";

// -- Custom Components
import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import Dashboard from "../../pages/dashboard/Dashboard";
import Blocks from "../../pages/blocks/Blocks";
import BlockDetail from "../../pages/blocks/BlockDetail";
import Transaction from "../../pages/transaction/Transaction";
import Network from "../../pages/network/Network";
import Trading from "../../pages/trading/Trading";
import Party from "../../pages/party/Party";
import Market from "../../pages/trading/markets/Markets";
// -- Component Styles
import s from "./Layout.module.scss";

const Layout = (props) => {
  return (
    <div className={s.root}>
      <div className={s.wrap}>
        <Header />
        <main className={s.content}>
          <Switch>
            <Route path="/tx" exact component={Dashboard}/>
            <Route path="/tx/blocks" exact component={Blocks}/>
            <Route path="/tx/blocks/:slug" component={BlockDetail}/>
            <Route path="/tx/transaction" exact component={Transaction}/>
            <Route path="/tx/transaction/:slug" component={Transaction}/>
            <Route path="/tx/network/" exact component={Network}/>
            <Route path="/tx/trading" exact component={Trading}/>
            <Route path="/tx/trading/:hash" component={Trading}/>
            <Route path="/tx/markets/:id" component={Market}/>
            <Route path="/tx/party/:hash" component={Party}/>
            <Route path="/tx/party" exact component={Party}/>
          </Switch>
        </main>
        <Footer />
      </div>
    </div>
  );
}

export default Layout
