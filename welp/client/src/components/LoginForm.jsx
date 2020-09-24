import React from "react";
import Input from "@material-ui/core/Input";
import Button from "@material-ui/core/Button";
import AccountBoxIcon from "@material-ui/icons/AccountBox";

const LoginForm = (props) => {
  return (
    <div className="loginContainer">
      <form onSubmit={props.handleLoginSubmit} className="loginForm">
        <Input
          name="username"
          color="primary"
          onInput={(e) => props.setUsername(e.target.value)}
          placeholder="username"
          className="usernameInput"
          value={props.username}
        />
        <Input
          name="password"
          type="password"
          placeholder="password"
          className="passwordInput"
          onInput={(e) => props.setPassword(e.target.value)}
          value={props.password}
        />
        <Button type="submit" variant="contained" color="primary">
          <AccountBoxIcon className="loginButton" />
        </Button>
      </form>
    </div>
  );
};

export default LoginForm;
