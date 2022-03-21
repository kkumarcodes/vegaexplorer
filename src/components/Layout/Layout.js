// -- React and related libs
import React, { lazy, Suspense } from "react";
import { Switch, Route } from "react-router";

// -- Custom Components
import Header from "../Header/Header";
import Footer from "../Footer/Footer";
// -- Component Styles
import s from "./Layout.module.scss";

const Dashboard = lazy(() => import("../../pages/dashboard/Dashboard"));
const Blocks = lazy(() => import("../../pages/blocks/Blocks"));
const BlockDetail = lazy(() => import("../../pages/blocks/BlockDetail"));
const Transaction = lazy(() => import("../../pages/transaction/Transaction"));
const Network = lazy(() => import("../../pages/network/Network"));
const Trading = lazy(() => import("../../pages/trading/Trading"));
const Party = lazy(() => import("../../pages/party/Party"));
const Market = lazy(() => import("../../pages/trading/markets/Markets"));
const Order = lazy(() => import("../../pages/order/order"));
const Trade = lazy(() => import("../../pages/trading/trade"));


const renderLoader = () => <p>Loading</p>;

const Layout = (props) => {
  return (
    <Suspense fallback={renderLoader()}>
    <div className={s.root}>
      <div className={s.wrap}>
        <Header />
        <main className={s.content}>
            <Switch>
              <Route path="/tx" exact component={Dashboard} />
              <Route path="/tx/blocks" exact component={Blocks} />
              <Route path="/tx/blocks/:slug" component={BlockDetail} />
              <Route path="/tx/transaction" exact component={Transaction} />
              <Route path="/tx/transaction/:slug" component={Transaction} />
              <Route path="/tx/network/" exact component={Network} />
              <Route path="/tx/trading" exact component={Trading} />
              <Route path="/tx/trading/:hash" component={Trading} />
              <Route path="/tx/markets/:id" component={Market} />
              <Route path="/tx/order/:id" component={Order} />
              <Route path="/tx/trade/:id" component={Trade} />
              <Route path="/tx/party/:hash" component={Party} />
              <Route path="/tx/party" exact component={Party} />
            </Switch>
        </main>
        <Footer />
      </div>
    </div>
    </Suspense>
  );
};

export default Layout;
