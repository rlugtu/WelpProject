import React, { useState, useEffect } from "react";
import Navbar from "./Navbar";
import Button from "@material-ui/core/Button";
import { makeStyles } from "@material-ui/core/styles";
import { Rating } from "@material-ui/lab";
import HighlightOffIcon from "@material-ui/icons/HighlightOff";
import EditIcon from "@material-ui/icons/Edit";
import TextField from "@material-ui/core/TextField";

import Auth from "../modules/Auth";

const style = makeStyles({
  serviceButton: {
    margin: 5,
  },
  editButton: {
    marginTop: 10,
  },
});
const UserProfile = (props) => {
  const classes = style();

  const [showBookmarks, setShowBookmarks] = useState(true);
  const [showReviews, setShowReviews] = useState(false);
  const [openTextBox, setOpenTextBox] = useState(false);
  const [reviewRating, setReviewRating] = useState(null);
  const [reviewDescription, setReviewDescription] = useState(null);

  const triggerShowBookmarks = () => {
    setShowBookmarks(true);
    setShowReviews(false);
  };
  const triggerShowReviews = () => {
    setShowReviews(true);
    setShowBookmarks(false);
  };
  // update user info every mount
  useEffect(() => {
    props.getUserInfo();
  }, []);

  // DELETE BOOKMARK FUNCTION
  const deleteBookmark = (id) => {
    fetch(`/bookmarks/${id}`, {
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

  // UPDATE REVIEW AND DELETE REVIEW FUNCTIONS
  const createTextBox = () => {
    setOpenTextBox(!openTextBox);
  };

  const updateReview = (id) => {
    fetch(`/reviews/${id}`, {
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
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const deleteReview = (id) => {
    props.getUserInfo();

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
      <Navbar
        setResults={props.setResults}
        isLoggedIn={props.isLoggedIn}
        logoutUser={props.logoutUser}
        setTerm={props.setTerm}
        setLocation={props.setLocation}
        term={props.term}
        location={props.location}
      />

      {props.userInfo && (
        <div className="userProfileContainer">
          <div className="userInfoContainer">
            <h1>{props.userInfo.user.name}</h1>
            <p>{props.userInfo.user.about}</p>
            <p>
              {props.userInfo.user.city}, {" " + props.userInfo.user.state}
              {/* {" " + props.userInfo.user.zip_code} */}
            </p>
          </div>

          <div className="bookmarksAndReviewsContainer">
            <div className="userProfileButtons">
              <Button
                variant="contained"
                className="loginButtons"
                color="primary"
                onClick={() => triggerShowBookmarks()}
                className={classes.serviceButton}
              >
                Bookmarks
              </Button>
              <Button
                variant="contained"
                className="loginButtons"
                color="primary"
                onClick={() => triggerShowReviews()}
                className={classes.serviceButton}
              >
                Reviews
              </Button>
            </div>
            {showBookmarks && (
              <div>
                <h1>My Bookmarks</h1>
                {props.userInfo.bookmarks &&
                  props.userInfo.bookmarks.map((bookmark, i) => (
                    <div className="individualBookmarkContainer" key={i}>
                      <p>{bookmark.name}</p>
                      <Button
                        variant="contained"
                        color="primary"
                        className={classes.serviceButton}
                        onClick={() => {
                          deleteBookmark(bookmark.id);
                          props.getUserInfo();
                        }}
                      >
                        <HighlightOffIcon />
                      </Button>
                    </div>
                  ))}
              </div>
            )}
            {showReviews && (
              <div className="reviewsContainer">
                <h1>My Reviews</h1>
                {props.userInfo.reviews &&
                  props.userInfo.reviews.map((review, i) => (
                    <div key={i} className="individualReviewContainer">
                      <h3>{review.name}</h3>
                      <Rating
                        name="reviewRating"
                        value={review.rating}
                        readOnly
                      />
                      <p>{review.description}</p>
                      <p>{review.created_at}</p>
                      {openTextBox && (
                        <form
                          onSubmit={() => updateReview(review.id)}
                          className="reviewForm"
                        >
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
                            onChange={(e) =>
                              setReviewDescription(e.target.value)
                            }
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
                          deleteReview(review.id);
                          props.getUserInfo();
                        }}
                      >
                        <HighlightOffIcon />
                      </Button>
                    </div>
                  ))}
              </div>
            )}
          </div>
        </div>
      )}
      <div className="testFooter"></div>
    </div>
  );
};

export default UserProfile;
