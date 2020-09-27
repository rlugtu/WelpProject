import React, { useState } from "react";
import { Link } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import { Rating } from "@material-ui/lab";
import HighlightOffIcon from "@material-ui/icons/HighlightOff";
import EditIcon from "@material-ui/icons/Edit";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import Auth from "../modules/Auth";

const style = makeStyles({
  serviceButton: {
    margin: 5,
  },
  editButton: {
    marginTop: 10,
  },
});
const UserReview = (props) => {
  const [openTextBox, setOpenTextBox] = useState(false);
  const [reviewRating, setReviewRating] = useState(null);
  const [reviewDescription, setReviewDescription] = useState("");
  const classes = style();

  const createTextBox = () => {
    setOpenTextBox(!openTextBox);
  };

  const updateReview = (e) => {
    e.preventDefault();
    fetch(`/reviews/${props.id}`, {
      method: "PUT",
      credentials: "include",
      body: JSON.stringify({
        review: {
          rating: reviewRating,
          description: reviewDescription,
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
        createTextBox();
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const deleteReview = (id) => {
    fetch(`/reviews/${id}`, {
      method: "DELETE",
      credentials: "include",
    })
      .then((res) => res.json())
      .then((res) => {
        console.log(res);
        console.log("hi");
      })
      .catch((err) => console.log(err));
    props.getUserInfo();
  };
  return (
    <div>
      <h3>{props.name}</h3>
      <Rating name="reviewRating" value={props.rating} readOnly />
      <p>{props.description}</p>
      <p>{props.created_at}</p>
      {openTextBox && (
        <form onSubmit={updateReview} className="reviewForm">
          <h2 className="reviewHeader">What do you think?</h2>
          <h4>Rating</h4>
          <Rating
            name="reviewRating"
            value={reviewRating}
            precision={0.5}
            onChange={(e) => setReviewRating(e.target.value)}
            required
          />
          <h4>Description</h4>
          <TextField
            //   id="standard-multiline-flexible"
            multiline
            rows="4"
            variant="outlined"
            className="reviewTextBox"
            value={reviewDescription}
            required
            onChange={(e) => setReviewDescription(e.target.value)}
            //   margin="normal"
          />

          <Button
            type="submit"
            className={classes.editButton}
            variant="contained"
            color="primary"
          >
            Submit
          </Button>
          <Button
            type="submit"
            variant="contained"
            color="primary"
            className={classes.editButton}
            onClick={() => createTextBox()}
          >
            Cancel
          </Button>
        </form>
      )}
      <Button
        variant="contained"
        color="primary"
        className={classes.serviceButton}
        onClick={() => createTextBox()}
      >
        <EditIcon />
      </Button>
      <Button
        variant="contained"
        color="primary"
        className={classes.serviceButton}
        onClick={() => {
          deleteReview(props.id);
          props.getUserInfo();
        }}
      >
        <HighlightOffIcon />
      </Button>
      <Link
        to={`/services/${props.name}`}
        onClick={() => {
          props.setServiceResult(props.yelp_id);
        }}
      >
        <Button
          variant="contained"
          color="primary"
          className={classes.serviceButton}
          onClick={() => createTextBox()}
        >
          Visit
        </Button>
      </Link>
    </div>
  );
};

export default UserReview;
