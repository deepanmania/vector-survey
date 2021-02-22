import React from "react";
import ReactDOM, { render } from "react-dom";
import { createBrowserHistory } from "history";
import { Router, Route, Switch, Redirect } from "react-router-dom";
import "assets/css/material-dashboard-react.css?v=1.8.0";
import "bootstrap/dist/css/bootstrap.min.css";

// core components
import LoginRoute from "./views/Login";
import Dashboard from "views/Dashboard/Dashboard.js";
import FillForm from "views/FillForm";
import LineList from "views/LineList";
import WaterForm from "views/WaterForm";
import VectorAction from "views/VectorAction";

const hist = createBrowserHistory();
global.apiUrl = "https://master-dev.uhcitp.in";
// global.apiBaseUrl = "http://localhost:9000";
global.apiBaseUrl = "http://143.110.241.253:9000";

class Logout extends React.Component {
  render() {
    localStorage.clear();
    return <Redirect to="/"></Redirect>;
  }
}

ReactDOM.render(
  <Router history={hist}>
    <Switch>
      {/* <Route path="/admin" component={Admin} />
      <Route path="/rtl" component={RTL} /> */}
      <Route path="/" render={props => <LoginRoute {...props} />} exact />
      <Route
        path="/dashboard"
        render={props => <Dashboard {...props} />}
        exact
      />
      <Route path="/fillform" render={props => <FillForm {...props} />} exact />
      <Route
        path="/vector-action"
        render={props => <VectorAction {...props} />}
        exact
      />
      <Route path="/linelist" render={props => <LineList {...props} />} exact />
      <Route
        path="/waterform"
        render={props => <WaterForm {...props} />}
        exact
      />
      <Route path="/logout" render={props => <Logout {...props} />} exact />
    </Switch>
  </Router>,
  document.getElementById("root")
);
