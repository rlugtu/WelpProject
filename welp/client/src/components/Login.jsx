import React from "react";
import LoginForm from "./LoginForm";
import { Link } from "react-router-dom";
const Login = (props) => {
  return (
    <div className="homeContainer">
      <div className="homeLogo">
        <Link to="/">
          <img
            src={"https://i.imgur.com/AyuQkTz.png"}
            alt={"company logo"}
            height="200px"
          />
        </Link>

        <LoginForm
          username={props.username}
          password={props.password}
          setUsername={props.setUsername}
          setPassword={props.setPassword}
          handleLoginSubmit={props.handleLoginSubmit}
        />
      </div>
    </div>
  );
};

export default Login;
