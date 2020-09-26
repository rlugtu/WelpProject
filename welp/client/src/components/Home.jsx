import React from "react";
import { Link } from "react-router-dom";
import Searchbar from "./Searchbar";
import Button from "@material-ui/core/Button";
import Auth from "../modules/Auth";

const Home = (props) => {
  return (
    <div className="homeContainer">
      <div className="homeNav">
        {Auth.getToken() ? (
          <div className="navLogButtons">
            <Button
              variant="contained"
              className="loginButtons"
              color="primary"
            >
              <Link to="/user">Profile</Link>
            </Button>
            <Button
              className="loginButtons"
              variant="contained"
              color="primary"
              onClick={() => props.logoutUser()}
            >
              <Link to="/">Logout</Link>
            </Button>
          </div>
        ) : (
          <div className="navLogButtons">
            {" "}
            <Button
              className="loginButtons"
              type="submit"
              variant="contained"
              color="primary"
            >
              <Link to="/login">Login</Link>
            </Button>
            <Button
              className="loginButtons"
              type="submit"
              variant="contained"
              color="primary"
            >
              <Link to="/register">Register</Link>
            </Button>
          </div>
        )}
      </div>
      <div className="homeLogo">
        <Link to="/">
          <img
            src={"https://i.imgur.com/AyuQkTz.png"}
            alt={"company logo"}
            height="200px"
          />
        </Link>
      </div>
      <div className="searchBarHome">
        <Searchbar
          setResults={props.setResults}
          setTerm={props.setTerm}
          setLocation={props.setLocation}
          term={props.term}
          location={props.location}
        />
      </div>
    </div>
  );
};

export default Home;
