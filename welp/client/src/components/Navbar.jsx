import React, { useState } from "react";
import { Redirect, Link } from "react-router-dom";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Searchbar from "./Searchbar";
import { makeStyles } from "@material-ui/styles";
import Button from "@material-ui/core/Button";
import Auth from "../modules/Auth";

const useStyles = makeStyles((theme) => ({
  toolbarMargin: {
    ...theme.mixins.toolbar,
  },
  input: {
    "&:-webkit-autofill": {
      WebkitBoxShadow: "0 0 0 1000px white inset",
    },
  },
}));

const Navbar = (props) => {
  const [redirect, setRedirect] = useState(false);

  const classes = useStyles();
  return (
    <React.Fragment>
      <AppBar position="static">
        <Toolbar className="navBar" color="secondary">
          <img
            src={"https://i.imgur.com/AyuQkTz.png"}
            alt="company logo"
            height="75px"
            className="navLogo"
            onClick={() => setRedirect(true)}
          />
          <Searchbar
            setResults={props.setResults}
            setTerm={props.setTerm}
            setLocation={props.setLocation}
            term={props.term}
            location={props.location}
          />
          {Auth.getToken() ? (
            <div className="navLogButtons">
              <Button
                variant="contained"
                color="primary"
                className="loginButtons"
              >
                <Link to="/user">Profile</Link>
              </Button>
              <Button
                variant="contained"
                color="primary"
                className="loginButtons"
                onClick={() => props.logoutUser()}
              >
                <Link to="/">Logout</Link>
              </Button>
            </div>
          ) : (
            <div className="navLogButtons">
              {" "}
              <Button
                type="submit"
                variant="contained"
                color="primary"
                className="loginButtons"
              >
                <Link to="/login">Login</Link>
              </Button>
              <Button
                type="submit"
                variant="contained"
                color="primary"
                className="loginButtons"
              >
                <Link to="/register">Register</Link>
              </Button>
            </div>
          )}
        </Toolbar>
        <div></div>
      </AppBar>
      <div className={classes.toolbarMargin} />
      {redirect && <Redirect to="/" />}
    </React.Fragment>
  );
};

export default Navbar;
