import React, { useState } from "react";
import Input from "@material-ui/core/Input";
import Button from "@material-ui/core/Button";
import Auth from "../modules/Auth";
import { makeStyles } from "@material-ui/core/styles";

import TextField from "@material-ui/core/TextField";

const style = makeStyles({
  serviceButton: {
    marginTop: 20,
  },
  serviceButton2: {
    marginLeft: 20,
    marginTop: 20,
  },
});
const UserUpdateForm = (props) => {
  const classes = style();

  const [name, setName] = useState(props.userInfo.user.name);
  const [username, setUsername] = useState(props.userInfo.user.username);
  const [about, setAbout] = useState(props.userInfo.user.about);
  const [city, setCity] = useState(props.userInfo.user.city);
  const [state, setState] = useState(props.userInfo.user.state);
  const [email, setEmail] = useState(props.userInfo.user.email);
  const [zip_code, setZip_Code] = useState(props.userInfo.user.zip_code);

  const updateUserInfo = (e) => {
    e.preventDefault();
    fetch(`/users/${props.userInfo.user.user_id}`, {
      method: "PUT",
      credentials: "include",
      body: JSON.stringify({
        user: {
          name: name,
          username: username,
          about: about,
          city: city,
          state: state,
          email: email,
          zip_code: zip_code,
        },
      }),
      headers: {
        "Content-Type": "application/json",
        Authorization: `Token ${Auth.getToken()}`,
        token: Auth.getToken(),
      },
    })
      .then((res) => res.json())
      .then((res) => {
        props.getUserInfo();
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
    props.activateEditUser();
  };
  return (
    <div className="editUserInfoContainer">
      <h1 className="editHeader">Edit user info</h1>
      <form onSubmit={updateUserInfo} className="userUpdateForm">
        <h3>Name</h3>
        <Input
          name="name"
          color="primary"
          onInput={(e) => setName(e.target.value)}
          placeholder="username"
          className="usernameInput"
          value={name}
        />
        <h3>Username</h3>
        <Input
          name="username"
          color="primary"
          onInput={(e) => setUsername(e.target.value)}
          placeholder="username"
          className="usernameInput"
          value={username}
        />
        <h3>Email</h3>
        <Input
          name="email"
          color="primary"
          onInput={(e) => setEmail(e.target.value)}
          placeholder="username"
          className="usernameInput"
          value={email}
        />
        <h3>City</h3>
        <Input
          name="city"
          color="primary"
          onInput={(e) => setCity(e.target.value)}
          placeholder="username"
          className="usernameInput"
          value={city}
        />
        <h3>State</h3>
        <Input
          name="state"
          color="primary"
          onInput={(e) => setState(e.target.value)}
          placeholder="username"
          className="usernameInput"
          value={state}
        />
        <h3>ZipCode</h3>
        <Input
          name="zip_code"
          color="primary"
          onInput={(e) => setZip_Code(e.target.value)}
          placeholder="username"
          className="usernameInput"
          value={zip_code}
        />
        <h3>About</h3>
        <TextField
          name="about"
          multiline
          rows="4"
          variant="outlined"
          className="reviewTextBox"
          required
          value={about}
          onChange={(e) => setAbout(e.target.value)}
        />
        <Button
          type="submit"
          variant="contained"
          color="primary"
          className={classes.serviceButton}
        >
          Submit
        </Button>
        <Button
          type="submit"
          variant="contained"
          color="primary"
          className={classes.serviceButton2}
          onClick={() => props.activateEditUser()}
        >
          Cancel
        </Button>
      </form>
    </div>
  );
};

export default UserUpdateForm;
