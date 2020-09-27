import React from "react";
import Button from "@material-ui/core/Button";
import { Rating } from "@material-ui/lab";
import TextField from "@material-ui/core/TextField";

const ReviewForm = (props) => {
  return (
    <div className="reviewFormContainer">
      <form onSubmit={props.userReviewSubmit} className="reviewForm">
        <h2 className="reviewHeader">What do you think?</h2>
        <h4>Rating</h4>
        <Rating
          name="reviewRating"
          value={props.reviewRating}
          precision={0.5}
          onChange={(e) => props.setReviewRating(e.target.value)}
        />
        <h4>Description</h4>
        <TextField
          //   id="standard-multiline-flexible"
          multiline
          rows="4"
          variant="outlined"
          className="reviewTextBox"
          required
          value={props.reviewDescription}
          onChange={(e) => props.setReviewDescription(e.target.value)}
          //   margin="normal"
        />

        <Button type="submit" variant="contained" color="primary">
          Submit
        </Button>
      </form>
    </div>
  );
};

export default ReviewForm;
