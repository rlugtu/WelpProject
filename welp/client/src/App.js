import React, { useState } from "react";
import "./App.css";
import { Route, Redirect } from "react-router-dom";

import Home from "./components/Home";
import SearchController from "./components/SearchController";
import Login from "./components/Login";
import Register from "./components/Register";
import UserProfile from "./components/UserProfile";
import Auth from "./modules/Auth";
import { ThemeProvider } from "@material-ui/styles";
import theme from "./components/ui/Theme";

function App() {
  // total search results
  const [term, setTerm] = useState("");
  const [location, setLocation] = useState("");

  const [results, setResults] = useState(null);
  // Individual service results
  const [serviceResult, setServiceResult] = useState(null);

  // login check + user info
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userInfo, setUserInfo] = useState(null);
  const [auth, setAuth] = useState(Auth.isUserAuthenticated());
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleLoginSubmit = (e) => {
    e.preventDefault();
    fetch("/login", {
      method: "POST",
      body: JSON.stringify({
        username: username,
        password: password,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((res) => {
        console.log(res);
        if (res.token) {
          Auth.authenticateToken(res.token);
          setAuth(Auth.isUserAuthenticated());
          setUsername("");
          setPassword("");
          console.log("Auth", Auth);
          setIsLoggedIn(true);
          // console.log(Auth);
        } else {
          alert("invalid user");
        }
      })
      .then(() => {
        getUserInfo();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const getUserInfo = (e) => {
    console.log("hi");
    fetch("/profile", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Token ${Auth.getToken()}`,
        token: Auth.getToken(),
      },
    })
      .then((res) => res.json())
      .then((res) => {
        setUserInfo(res);
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const logoutUser = () => {
    fetch("/logout", {
      method: "DELETE",
      headers: {
        Authorization: `Token ${Auth.getToken()}`,
        token: Auth.getToken(),
      },
    }).then((res) => {
      Auth.deauthenticateUser();
      setAuth(Auth.isUserAuthenticated());
      setUsername("");
      setPassword("");
      setIsLoggedIn(false);
    });
  };

  return (
    <ThemeProvider theme={theme}>
      {isLoggedIn && <Redirect to="/user" />}
      <div className="App">
        <Route
          exact
          path="/"
          render={() => (
            <Home
              setResults={setResults}
              isLoggedIn={isLoggedIn}
              logoutUser={logoutUser}
              setTerm={setTerm}
              setLocation={setLocation}
              term={term}
              location={location}
              Auth={Auth}
            />
          )}
        />
        <Route
          exact
          path="/register"
          render={() => <Register setAuth={setAuth} isLoggedIn={isLoggedIn} />}
        />
        <Route
          exact
          path="/login"
          render={() => (
            <Login
              username={username}
              password={password}
              setUsername={setUsername}
              setPassword={setPassword}
              handleLoginSubmit={handleLoginSubmit}
            />
          )}
        />
        <Route
          exact
          path="/user"
          render={() => (
            <UserProfile
              getUserInfo={getUserInfo}
              userInfo={userInfo}
              setResults={setResults}
              isLoggedIn={isLoggedIn}
              logoutUser={logoutUser}
              setTerm={setTerm}
              setLocation={setLocation}
              term={term}
              location={location}
              setServiceResult={setServiceResult}
            />
          )}
        />

        <Route
          exact
          path="/search/:id"
          render={() => (
            <SearchController
              currentPage="search"
              setResults={setResults}
              setServiceResult={setServiceResult}
              results={results}
              isLoggedIn={isLoggedIn}
              logoutUser={logoutUser}
              setTerm={setTerm}
              setLocation={setLocation}
              term={term}
              location={location}
            />
          )}
        />
        <Route
          exact
          path="/services/:id"
          render={() => (
            <SearchController
              currentPage="service"
              serviceResult={serviceResult}
              setResults={setResults}
              isLoggedIn={isLoggedIn}
              logoutUser={logoutUser}
              setTerm={setTerm}
              setLocation={setLocation}
              term={term}
              location={location}
              userInfo={userInfo}
            />
          )}
        />

        {/* <Link to="/profile">Profile</Link> */}
      </div>
    </ThemeProvider>
  );
}

export default App;
