import React, { Component, Fragment } from "react";
import MuiThemeProvider from "material-ui/styles/MuiThemeProvider";
import AppBar from "material-ui/AppBar";
import RaisedButton from "material-ui/RaisedButton";
import TextField from "material-ui/TextField";
import { Redirect, NavLink, useHistory } from "react-router-dom";
import Header from "./Header";

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      password: "",
      navigate: false
    };
  }

  handleClick(event) {
    var self = this;
    var payload = {
      email: this.state.username,
      password: this.state.password
    };
    this.props.history.push("/dashboard");
  }

  render() {
    return (
      <div
        style={{
          "text-align": "center"
        }}
      >
        <MuiThemeProvider>
          <div>
            <Header title="Login" />
            {/* <AppBar title="Login" /> */}
            <TextField
              hintText="Enter your Username"
              floatingLabelText="Username"
              onChange={(event, newValue) =>
                this.setState({ username: newValue })
              }
            />
            <br />
            <TextField
              type="password"
              hintText="Enter your Password"
              floatingLabelText="Password"
              onChange={(event, newValue) =>
                this.setState({ password: newValue })
              }
            />
            <br />
            <RaisedButton
              label="Submit"
              primary={true}
              style={style}
              onClick={event => this.handleClick(event)}
            />
          </div>
        </MuiThemeProvider>
      </div>
    );
  }
}
const style = {
  margin: 15
};
export default Login;
