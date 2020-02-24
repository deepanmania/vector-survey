import React from "react";
import ReactDOM from "react-dom";
import { createBrowserHistory } from "history";
import { Router, Route, Switch, Redirect } from "react-router-dom";

// core components
import LoginRoute from "./views/Login";
import Dashboard from "views/Dashboard/Dashboard.js";
import FillForm from "views/FillForm";
import LineList from "views/LineList";

import "assets/css/material-dashboard-react.css?v=1.8.0";

const hist = createBrowserHistory();
global.apiUrl = "https://master-dev.uhcitp.in";
global.apiBaseUrl = "http://localhost:9000";
ReactDOM.render(
  <Router history={hist}>
    <Switch>
      {/* <Route path="/admin" component={Admin} />
      <Route path="/rtl" component={RTL} /> */}
      <Route path="/" component={LoginRoute} exact />
      <Route path="/dashboard" component={Dashboard} exact />
      <Route path="/fillform" component={FillForm} exact />
      <Route path="/linelist" component={LineList} exact />
    </Switch>
  </Router>,
  document.getElementById("root")
);
