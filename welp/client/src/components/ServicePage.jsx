import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import ReviewForm from "./ReviewForm";
import { Rating } from "@material-ui/lab";
import "react-alice-carousel/lib/alice-carousel.css";
import Button from "@material-ui/core/Button";
import { makeStyles } from "@material-ui/core/styles";
import Auth from "../modules/Auth";
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import MonetizationOnIcon from "@material-ui/icons/MonetizationOn";
import Snackbar from "@material-ui/core/Snackbar";
import Alert from "@material-ui/lab/Alert";

import { Slide } from "react-slideshow-image";
import "react-slideshow-image/dist/styles.css";

const style = makeStyles({
  serviceButton: {
    margin: 5,
    contrastText: "#fff",
  },
  dialogue: {
    padding: 10,
  },
  alerts: {
    fontSize: 25,
  },
});
const ServicePage = (props) => {
  const classes = style();

  const [serviceInfo, setServiceInfo] = useState(null);
  const [hasError, setHasError] = useState(null);
  const [servicePhotos, setServicePhotos] = useState(null);
  const YELP_API_KEY = process.env.REACT_APP_YELP_KEY;

  // services states
  const [serviceName, setServiceName] = useState(null);
  const [serviceUrl, setServiceUrl] = useState(null);
  const [servicePrice, setServicePrice] = useState(null);
  const [serviceYelp_id, setServiceYelp_id] = useState(null);
  const [servicePicture, setServicePicture] = useState(null);
  const [serviceCity, setServiceCity] = useState(null);
  const [serviceCountry, setServiceCountry] = useState(null);
  const [serviceState, setServiceState] = useState(null);
  const [serviceZip_code, setServiceZip_code] = useState(null);
  const [serviceAddress, setServiceAddress] = useState(null);
  const [fetchDone, setFetchDone] = useState(false);
  // DB SERVICES && Reviews
  const [existingService, setExistingService] = useState(null);
  const [serviceReviews, setServiceReviews] = useState(null);

  // user review
  const [activateReview, setActivateReview] = useState(false);
  const [reviewRating, setReviewRating] = useState("");
  const [reviewDescription, setReviewDescription] = useState("");

  // db id
  const [serviceUniqueID, setServiceUniqueID] = useState(null);

  // BUTTON STATES
  const [open, setBookmarkOpen] = useState(false);
  const [reviewOpen, setReviewOpen] = useState(false);
  const handleClickOpen = () => {
    setBookmarkOpen(true);
  };

  const handleClose = () => {
    setBookmarkOpen(false);
  };

  const handleReviewClickOpen = () => {
    setReviewOpen(true);
  };

  const handleReviewClose = () => {
    setReviewOpen(false);
  };

  useEffect(() => {
    fetch(
      `https://cors-anywhere.herokuapp.com/api.yelp.com/v3/businesses/${props.serviceResult}`,
      {
        headers: {
          Authorization: `Bearer ${YELP_API_KEY}`,
          Origin: "localhost",
          withCredentials: true,
        },
      }
    )
      .then((res) => res.json())
      .then((res) => {
        console.log(res);
        setServiceInfo(res);
        setServicePhotos(res.photos);
        setServiceName(res.name);
        setServiceUrl(res.url);
        setServicePrice(res.price);
        setServiceYelp_id(res.id);
        setServicePicture(res.image_url);
        setServiceCity(res.location.city);
        setServiceCountry(res.location.country);
        setServiceState(res.location.state);
        setServiceZip_code(res.location.zip_code);
        setServiceAddress(res.location.address1);
      })
      .then(() => {
        setFetchDone(true);
        checkService();
      })
      .then(() => {
        matchService();
      })
      .catch((err) => {
        setHasError(err);
        console.log(hasError);
      });
  }, []);

  useEffect(() => {
    console.log("existing service updated", existingService);
    matchService();
  }, [existingService]);
  useEffect(() => {
    saveService();
  }, [fetchDone]);
  // check for reviews
  useEffect(() => {
    console.log(serviceUniqueID);
    getReviews();
  }, [serviceUniqueID]);
  // SAVES SERVICE TO DB
  const saveService = () => {
    fetch("/services", {
      method: "POST",
      body: JSON.stringify({
        service: {
          name: serviceName,
          url: serviceUrl,
          yelp_id: serviceYelp_id,
          price: servicePrice,
          picture: servicePicture,
          city: serviceCity,
          country: serviceCountry,
          state: serviceState,
          zip_code: serviceZip_code,
          address: serviceAddress,
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
        checkService();
        // console.log(res);
        // console.log("done");
        // if (res.service.id) {
        //   setServiceUniqueID(res.service.id);
        // } else {
        matchService();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  // CHECKS DATABASE FOR ALL SERVICES
  const checkService = () => {
    // console.log(existingService);
    fetch("/services", {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Token ${Auth.getToken()}`,
        token: Auth.getToken(),
      },
    })
      .then((res) => res.json())
      .then((res) => {
        console.log("checkService done");
        // console.log(res);
        setExistingService(res);
        // console.log(existingService);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const matchService = () => {
    if (existingService) {
      existingService.services.map((service, i) => {
        // console.log(service.yelp_id, serviceYelp_id);
        if (service.yelp_id === serviceYelp_id) {
          console.log("its a match");
          setServiceUniqueID(service.id);
          // console.log(serviceUniqueID);
        }
      });
    }
  };

  // BOOKMARKING && REVIEW FUNCTON
  const userBookmarkService = () => {
    saveService();
    fetch("/bookmarks", {
      method: "POST",
      body: JSON.stringify({
        bookmark: {
          service_id: serviceUniqueID,
          yelp_id: serviceYelp_id,
          name: serviceName,
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
        if (!Auth.getToken()) alert("Please Log In");
        // console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
    handleClick();
  };
  const reviewSubmit = (e) => {
    e.preventDefault();
    fetch("/reviews", {
      method: "POST",
      body: JSON.stringify({
        review: {
          name: serviceName,
          service_id: serviceUniqueID,
          rating: reviewRating,
          description: reviewDescription,
          yelp_id: serviceYelp_id,
          username: props.userInfo.user.name,
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
        // console.log(res);
        setReviewRating("");
        setReviewDescription("");
        getReviews();
        setActivateReview(!activateReview);
      })
      .catch((err) => {
        console.log(err);
      });
    handleReviewClickOpen();
  };

  const handleClick = () => {
    setBookmarkOpen(true);
  };

  const handleAlertClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setBookmarkOpen(false);
    setReviewOpen(false);
  };

  // GET REVIEWS FROM SERVICE
  const getReviews = () => {
    fetch(`/service/reviews/${serviceUniqueID}`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Token ${Auth.getToken()}`,
        token: Auth.getToken(),
      },
    })
      .then((res) => res.json())
      .then((res) => {
        console.log("reviews", res);
        setServiceReviews(res);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const activateReviewBox = () => {
    saveService();
    if (Auth.getToken()) {
      setActivateReview(!activateReview);
    } else {
      alert("Please Log In");
    }
  };
  const userReviewSubmit = (e) => {
    reviewSubmit(e);
  };
  //  FORMAT TIME FUNCTIONS
  const formatDayHour = (e) => {
    if (e === 0) return "Monday";
    else if (e === 1) return "Tuesday";
    else if (e === 2) return "Wednesday";
    else if (e === 3) return "Thursday";
    else if (e === 4) return "Friday";
    else if (e === 5) return "Saturday";
    else return "Sunday";
  };
  const formatHour = (e) => {
    let hour = e.slice(0, 2) % 12;
    if (hour === 0) hour = 12;
    return (
      (hour < 10 ? "0" : "") +
      hour +
      e.slice(2) +
      (e.slice(0, 2) < 12 ? "am" : "pm")
    );
  };
  // DELETE REVIEWS & DELETE BOOKMARKS FUNCTION

  return (
    <div className="serviceContainer">
      {serviceInfo && !serviceInfo.error ? (
        <div className="serviceContent">
          <div className="serviceLeftContainer">
            <h1 className="serviceName">{serviceInfo.name}</h1>
            <div className="serviceCategories">
              {serviceInfo.categories &&
                serviceInfo.categories.map((category, i) => (
                  <p key={i}>{category.title}</p>
                ))}
            </div>
            {serviceInfo.price && (
              <Rating
                name="reviewRating"
                value={serviceInfo.price.length}
                readOnly
                icon={<MonetizationOnIcon />}
              />
            )}
            <p>{serviceInfo.is_closed}</p>
            <p>{serviceInfo.display_phone}</p>
            <p>{serviceInfo.location.display_address[0]}</p>
            <p>{serviceInfo.location.display_address[1]}</p>
            <div className="serviceButtonContainer">
              {/* LOGGED IN BOOKMARK BUTTON */}
              {Auth.getToken() && (
                <div>
                  <Button
                    variant="contained"
                    color="primary"
                    className="servicePageButtons"
                    className={classes.serviceButton}
                    onClick={() => userBookmarkService()}
                  >
                    Bookmark
                  </Button>
                  <Snackbar
                    open={open}
                    autoHideDuration={6000}
                    onClose={handleAlertClose}
                  >
                    <Alert
                      onClose={handleAlertClose}
                      className={classes.alerts}
                      severity="success"
                    >
                      Bookmark Saved!
                    </Alert>
                  </Snackbar>
                </div>
              )}
              {/* IS NOT LOGGED IN  BOOKMARK BUTTON*/}
              {!Auth.getToken() && (
                <div>
                  <Button
                    variant="contained"
                    color="primary"
                    className="servicePageButtons"
                    className={classes.serviceButton}
                    onClick={handleClickOpen}
                  >
                    Bookmark
                  </Button>
                  <Dialog open={open} onClose={handleClose}>
                    <DialogTitle className={classes.dialogue}>
                      Please Login
                    </DialogTitle>
                    <Button
                      variant="contained"
                      color="primary"
                      className={classes.serviceButton}
                    >
                      <Link to="/login"> Login Here</Link>
                    </Button>
                    <Button
                      variant="contained"
                      color="primary"
                      className={classes.serviceButton}
                    >
                      <Link to="/register">Register</Link>
                    </Button>
                  </Dialog>
                </div>
              )}
              {/* IS LOGGED IN REVIEW BUTTON */}
              {Auth.getToken() && (
                <div>
                  <Button
                    variant="contained"
                    color="primary"
                    className={classes.serviceButton}
                    onClick={() => activateReviewBox()}
                  >
                    Write a Review
                  </Button>
                  <Snackbar
                    open={reviewOpen}
                    autoHideDuration={6000}
                    onClose={handleAlertClose}
                  >
                    <Alert
                      onClose={handleAlertClose}
                      className={classes.alerts}
                      severity="success"
                    >
                      We've posted your review!
                    </Alert>
                  </Snackbar>
                </div>
              )}
              {/* IS NOT LOGGED IN REVIEW BUTTON */}
              {!Auth.getToken() && (
                <div>
                  <Button
                    variant="contained"
                    color="primary"
                    className="servicePageButtons"
                    className={classes.serviceButton}
                    onClick={handleClickOpen}
                  >
                    Review
                  </Button>
                  <Dialog open={open} onClose={handleClose}>
                    <DialogTitle className={classes.dialogue}>
                      Please Login
                    </DialogTitle>
                    <Button
                      variant="contained"
                      color="primary"
                      className={classes.serviceButton}
                    >
                      <Link to="/login"> Login Here</Link>
                    </Button>
                    <Button
                      variant="contained"
                      color="primary"
                      className={classes.serviceButton}
                    >
                      <Link to="/register">Register</Link>
                    </Button>
                  </Dialog>
                </div>
              )}
            </div>

            {activateReview && (
              <ReviewForm
                setReviewRating={setReviewRating}
                setReviewDescription={setReviewDescription}
                userReviewSubmit={userReviewSubmit}
              />
            )}
            {serviceReviews ? (
              <div>
                <h2>Reviews</h2>
                <div className="reviewsContainer">
                  {serviceReviews.review.map((review, i) => (
                    <div key={i} className="individualReviews">
                      <h3 className="reviewUser">{review.username}</h3>
                      <Rating
                        name="reviewRating"
                        value={review.rating}
                        readOnly
                      />
                      <p>{review.description}</p>
                      <p>{review.created_at.slice(0, 10)}</p>
                    </div>
                  ))}
                </div>
              </div>
            ) : (
              <p>No Reviews Yet</p>
            )}
          </div>
          <div className="serviceRightContainer">
            {servicePhotos ? (
              <div className="servicePhotoCarousel">
                <div className="foodPhotoPadding">
                  <Slide>
                    {servicePhotos.map((photo, i) => (
                      <img
                        className="foodCarouselPhoto"
                        src={photo}
                        alt="food pictures"
                        key={i}
                      />
                    ))}
                  </Slide>
                </div>
              </div>
            ) : (
              <p>loading photos...</p>
            )}
            <div className="serviceHours">
              <h1>Hours</h1>
              {serviceInfo.hours ? (
                serviceInfo.hours[0].open.map((dayHour, i) => (
                  <p key={i}>
                    {formatDayHour(dayHour.day)}: {formatHour(dayHour.start)} -{" "}
                    {formatHour(dayHour.end)}
                  </p>
                ))
              ) : (
                <p>no hours available</p>
              )}

              {/* {serviceInfo.hours.open.map((day, i) => (
              <p key={i}>
                {day.day}: {day.start} - {day.end}
              </p>
            ))} */}
            </div>
          </div>
        </div>
      ) : (
        <p>loading...</p>
      )}
    </div>
  );
};

export default ServicePage;
