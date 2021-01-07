import React, { Component, Fragment } from "react";
import MuiThemeProvider from "material-ui/styles/MuiThemeProvider";
import AppBar from "material-ui/AppBar";
import RaisedButton from "material-ui/RaisedButton";
import AddAlert from "@material-ui/icons/AddAlert";
import TextField from "material-ui/TextField";
import SnackbarContent from "components/Snackbar/SnackbarContent.js";
import Snackbar from "components/Snackbar/Snackbar.js";
import { Redirect, NavLink, useHistory } from "react-router-dom";
import Header from "./Header";
import { Http } from "lib";

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      password: "",
      tl: false,
      error: ""
    };
  }

  handleKeyPress(target) {
    if (target.charCode == 13) {
      document.getElementById("submit").click();
    }
  }

  handleClick(event) {
    const payload = {
      userName: this.state.username,
      password: this.state.password
    };
    let pathname = "";
    Http.submitLogin(payload).then(res => {
      console.log(res);
      if (!res.ok) {
        if (res.errorMsg) {
          this.setState({
            error: res.errorMsg,
            tl: true
          });
          setTimeout(() => {
            this.setState({ tl: false });
          }, 2000);
        }
      } else {
        localStorage.setItem("userId", res.id);
        localStorage.setItem("userName", res.username);
        localStorage.setItem("role", res.role);
        switch (res.role) {
          case "water-field-entry":
            localStorage.setItem("appName", "water-entry");
            pathname = "/dashboard";
            break;
          case "vector-field-entry":
            localStorage.setItem("appName", "vector");
            pathname = "/dashboard";
            break;
          case "water-lab":
            localStorage.setItem("appName", "water-lab");
            pathname = "/linelist";
            break;
        }
        const state = Object.assign(payload, { role: res.role });
        console.log(pathname, state, localStorage.getItem("appName"));
        this.props.history.push({
          pathname,
          state
        });
      }
    });
  }

  render() {
    const role = localStorage.getItem("role");
    if (role) {
      let pathname;
      switch (role) {
        case "water-field-entry":
          localStorage.setItem("appName", "water-entry");
          pathname = "/dashboard";
          break;
        case "vector-field-entry":
          localStorage.setItem("appName", "vector");
          pathname = "/dashboard";
          break;
        case "water-lab":
          localStorage.setItem("appName", "water-lab");
          pathname = "/linelist";
          break;
      }
      const state = { role };
      return <Redirect to={pathname}></Redirect>;
    } else {
      return (
        <div
          style={{
            "text-align": "center"
          }}
        >
          <MuiThemeProvider>
            <div>
              {/* <Header title="Login" /> */}
              <AppBar title="Login" />
              <TextField
                hintText="Enter your Username"
                floatingLabelText="Username"
                onKeyPress={this.handleKeyPress}
                onChange={(event, newValue) =>
                  this.setState({ username: newValue })
                }
              />
              <br />
              <TextField
                type="password"
                id="password"
                hintText="Enter your Password"
                floatingLabelText="Password"
                onKeyPress={this.handleKeyPress}
                onChange={(event, newValue) =>
                  this.setState({ password: newValue })
                }
              />
              <br />
              <RaisedButton
                id="submit"
                label="Submit"
                primary={true}
                style={style}
                onClick={event => this.handleClick(event)}
              />
            </div>
          </MuiThemeProvider>
          <Snackbar
            place="tr"
            color="danger"
            icon={AddAlert}
            message={this.state.error}
            open={this.state.tl}
            closeNotification={() => this.setState({ tl: false })}
            close
          />
        </div>
      );
    }
  }
}
const style = {
  margin: 15
};
export default Login;
