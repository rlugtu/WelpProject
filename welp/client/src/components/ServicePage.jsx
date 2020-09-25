import React, { useState, useEffect } from "react";
import AliceCarousel from "react-alice-carousel";

import ServiceReviews from "./ServiceReviews";
import ReviewForm from "./ReviewForm";

import "react-alice-carousel/lib/alice-carousel.css";
import Carousel from "react-elastic-carousel";
import Button from "@material-ui/core/Button";
import { makeStyles } from "@material-ui/core/styles";
import Auth from "../modules/Auth";

const style = makeStyles({
  serviceButton: {
    margin: 5,
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
  // DB SERVICES && Reviews
  const [existingService, setExistingService] = useState(null);
  const [serviceReviews, setServiceReviews] = useState(null);

  // user review
  const [activateReview, setActivateReview] = useState(false);
  const [reviewRating, setReviewRating] = useState("");
  const [reviewDescription, setReviewDescription] = useState("");

  // db id
  const [serviceUniqueID, setServiceUniqueID] = useState(null);

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
  }, [serviceName]);
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
      })
      .catch((err) => {
        console.log(err);
      });
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
    setActivateReview(!activateReview);
  };
  const userReviewSubmit = (e) => {
    reviewSubmit(e);
  };

  return (
    <div className="serviceContainer">
      {serviceInfo ? (
        <div className="serviceContent">
          <div className="serviceLeftContainer">
            <h1 className="serviceName">{serviceInfo.name}</h1>
            <div className="serviceCategories">
              {serviceInfo.categories &&
                serviceInfo.categories.map((category, i) => (
                  <p key={i}>{category.title}</p>
                ))}
            </div>
            <p>{serviceInfo.price}</p>
            <p>{serviceInfo.is_closed}</p>
            <p>{serviceInfo.display_phone}</p>
            <p>{serviceInfo.location.display_address[0]}</p>
            <p>{serviceInfo.location.display_address[1]}</p>
            <div className="serviceButtonContainer">
              <Button
                variant="contained"
                color="primary"
                className="servicePageButtons"
                className={classes.serviceButton}
                onClick={() => userBookmarkService()}
              >
                Bookmark
              </Button>
              <Button
                variant="contained"
                color="primary"
                className={classes.serviceButton}
                onClick={() => activateReviewBox()}
              >
                Write a Review
              </Button>
              <Button
                variant="contained"
                color="primary"
                className={classes.serviceButton}
              >
                Share
              </Button>
            </div>

            {activateReview && (
              <ReviewForm
                setReviewRating={setReviewRating}
                setReviewDescription={setReviewDescription}
                userReviewSubmit={userReviewSubmit}
              />
            )}
            {serviceReviews ? (
              <div className="reviewsContainer">
                <h2>Reviews</h2>
                {serviceReviews.review.map((review, i) => (
                  <div key={i} className="individualReviews">
                    <p>{review.rating}</p>
                    <p>{review.description}</p>
                  </div>
                ))}
              </div>
            ) : (
              <p>No Reviews Yet</p>
            )}
          </div>
          <div className="serviceRightContainer">
            {servicePhotos ? (
              <div className="servicePhotoCarousel">
                <AliceCarousel autoPlay={true} autoPlayInterval={2000}>
                  {servicePhotos.map((photo, i) => (
                    <img
                      className="foodCarouselPhoto"
                      src={photo}
                      alt="food pictures"
                      key={i}
                    />
                  ))}
                </AliceCarousel>
              </div>
            ) : (
              <p>loading photos...</p>
            )}
            <div className="serviceHours">
              <h1>Hours</h1>
              {serviceInfo.hours ? (
                serviceInfo.hours[0].open.map((dayHour, i) => (
                  <p key={i}>
                    {dayHour.day}: {dayHour.start} - {dayHour.end}
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
