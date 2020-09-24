import React from "react";
import RegisterForm from "./RegisterForm";
import { Link } from "react-router-dom";
const Register = (props) => {
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

        <RegisterForm
          setAuth={props.setAuth}
          isLoggedIn={props.isLoggedIn}
          //   username={props.username}
          //   password={props.password}
          //   setUsername={props.setUsername}
          //   setPassword={props.setPassword}
          //   handleLoginSubmit={props.handleLoginSubmit}
        />
      </div>
    </div>
  );
};

export default Register;
