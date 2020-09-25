import React, { useState, useEffect } from "react";
import Navbar from "./Navbar";
import Button from "@material-ui/core/Button";
import { makeStyles } from "@material-ui/core/styles";
import { Rating } from "@material-ui/lab";
import HighlightOffIcon from "@material-ui/icons/HighlightOff";
import EditIcon from "@material-ui/icons/Edit";
const style = makeStyles({
  serviceButton: {
    margin: 5,
  },
});
const UserProfile = (props) => {
  const classes = style();

  const [showBookmarks, setShowBookmarks] = useState(true);
  const [showReviews, setShowReviews] = useState(false);

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

  // DELETE Reviews && BOOKMARK FUNCTIONS
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
                        onClick={() => deleteBookmark(bookmark.id)}
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
                      <Rating
                        name="reviewRating"
                        value={review.rating}
                        readOnly
                      />
                      <p>{review.description}</p>
                      <p>{review.created_at}</p>
                      <Button
                        variant="contained"
                        color="primary"
                        className={classes.serviceButton}
                      >
                        <EditIcon />
                      </Button>
                      <Button
                        variant="contained"
                        color="primary"
                        className={classes.serviceButton}
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
