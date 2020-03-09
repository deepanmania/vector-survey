import React from "react";
import ReactDOM from "react-dom";
import { createBrowserHistory } from "history";
import { Router, Route, Switch, Redirect } from "react-router-dom";

// core components
import LoginRoute from "./views/Login";
import Dashboard from "views/Dashboard/Dashboard.js";
import FillForm from "views/FillForm";
import LineList from "views/LineList";
import WaterForm from "views/WaterForm";
import VectorAction from "views/VectorAction";
import "assets/css/material-dashboard-react.css?v=1.8.0";

const hist = createBrowserHistory();
global.apiUrl = "https://master-dev.uhcitp.in";
// global.apiBaseUrl = "http://localhost:9000";
global.apiBaseUrl = "https://vector-api-endpoint.herokuapp.com";
ReactDOM.render(
  <Router history={hist}>
    <Switch>
      {/* <Route path="/admin" component={Admin} />
      <Route path="/rtl" component={RTL} /> */}
      <Route path="/" component={LoginRoute} exact />
      <Route path="/dashboard" component={Dashboard} exact />
      <Route path="/fillform" component={FillForm} exact />
      <Route path="/vector-action" component={VectorAction} exact />
      <Route path="/linelist" component={LineList} exact />
      <Route path="/waterform" component={WaterForm} exact />
    </Switch>
  </Router>,
  document.getElementById("root")
);
