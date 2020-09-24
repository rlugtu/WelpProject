import React from "react";
import Navbar from "./Navbar";
const UserProfile = (props) => {
  // const [userInfo, setUserInfo] = useState(null);
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
        <div>
          <div className="userInfoContainer">
            <h1>{props.userInfo.user.name}</h1>
            <p>{props.userInfo.user.about}</p>
            <p>{props.userInfo.user.city}</p>
            <p>{props.userInfo.user.state}</p>
            <p>{props.userInfo.user.zip_code}</p>
          </div>
          <div className="reviewsContainer">
            {props.userInfo.reviews &&
              props.userInfo.reviews.map((review, i) => (
                <div key={i} className="individualReviewContainer">
                  <p>{review.description}</p>
                  <p>{review.created_at}</p>
                </div>
              ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default UserProfile;
