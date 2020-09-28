import React, { useState } from "react";
import { Redirect } from "react-router-dom";
import Input from "@material-ui/core/Input";
import Button from "@material-ui/core/Button";
import Auth from "../modules/Auth";
import TextField from "@material-ui/core/TextField";

const RegisterForm = (props) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [about, setAbout] = useState("");
  const [birthday, setBirthday] = useState("");
  const [state, setState] = useState("");
  const [city, setCity] = useState("");
  const [zip_code, setZipCode] = useState("");
  const [email, setEmail] = useState("");
  const [fireRedirect, setFireRedirect] = useState(false);

  const handleRegisterSubmit = (e) => {
    e.preventDefault();
    fetch("/users", {
      method: "POST",
      body: JSON.stringify({
        user: {
          username: username,
          password: password,
          email: email,
          name: name,
          about: about,
          birthday: birthday,
          state: state,
          city: city,
          zip_code: zip_code,
        },
      }),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((res) => {
        if (res.token) {
          Auth.authenticateToken(res.token);
          props.setAuth(Auth.isUserAuthenticated());
          setUsername("");
          setPassword("");
          setFireRedirect(true);
          props.isLoggedIn(true);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <div className="registerContainer">
      {fireRedirect && <Redirect to="/user" />}
      <form onSubmit={handleRegisterSubmit} className="registerForm">
        <h1>Register</h1>
        <Input
          name="name"
          color="primary"
          onInput={(e) => setName(e.target.value)}
          placeholder="Name"
          className="usernameInput"
          value={name}
        />
        <Input
          name="username"
          type="date"
          color="primary"
          onInput={(e) => setBirthday(e.target.value)}
          placeholder="Birthday"
          className="usernameInput"
          value={birthday}
        />
        <Input
          name="email"
          color="primary"
          onInput={(e) => setEmail(e.target.value)}
          placeholder="Email"
          className="usernameInput"
          value={email}
        />
        <Input
          name="state"
          color="primary"
          onInput={(e) => setState(e.target.value)}
          placeholder="State"
          className="usernameInput"
          value={state}
        />
        <Input
          name="city"
          color="primary"
          onInput={(e) => setCity(e.target.value)}
          placeholder="City"
          className="usernameInput"
          value={city}
        />
        <Input
          name="zip_code"
          color="primary"
          onInput={(e) => setZipCode(e.target.value)}
          placeholder="Zipcode"
          className="usernameInput"
          value={zip_code}
        />
        {/* <Input
          name="about"
          placeholder="About Me"
          className="usernameInput"
          onInput={(e) => setAbout(e.target.value)}
          value={about}
        /> */}

        <TextField
          name="about"
          placeholder="About Me"
          multiline
          rows="4"
          variant="outlined"
          className="reviewTextBox"
          required
          value={about}
          onChange={(e) => setAbout(e.target.value)}
        />

        <Input
          name="username"
          placeholder="Username"
          className="usernameInput"
          onInput={(e) => setUsername(e.target.value)}
          value={username}
        />
        <Input
          name="password"
          type="password"
          placeholder="Password"
          className="passwordInput"
          onInput={(e) => setPassword(e.target.value)}
          value={password}
        />
        <Button type="submit" variant="contained" color="primary">
          Sign Up
        </Button>
      </form>
    </div>
  );
};

export default RegisterForm;
