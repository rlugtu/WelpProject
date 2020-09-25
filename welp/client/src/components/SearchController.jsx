import React, { useState } from "react";
import { Redirect } from "react-router-dom";

import Navbar from "./Navbar";
import SearchPage from "./SearchPage";
import ServicePage from "./ServicePage";

const SearchController = (props) => {
  const [currentPage, setCurrentPage] = useState(props.currentPage);
  // const [fireRedirect, setFireRedirect] = useState(false);

  // const [results, setResults] = useState(null);

  // let getResults = () => {
  //   let resultsRaw = localStorage.getItem("searchResults");
  //   let results = JSON.parse(resultsRaw);
  //   setResults(results);
  // };

  let decideWhichToRender = () => {
    switch (currentPage) {
      case "search":
        return (
          <SearchPage
            setCurrentPage={setCurrentPage}
            results={props.results}
            setServiceResult={props.setServiceResult}
          />
        );
      case "service":
        return (
          <ServicePage
            setCurrentPage={setCurrentPage}
            serviceResult={props.serviceResult}
            setServiceResult={props.setServiceResult}
            isLoggedIn={props.isLoggedIn}
            userInfo={props.userInfo}
          />
        );
      default:
        return <Redirect push to="/" />;
    }
  };
  return (
    <div className="searchControllerContainer">
      <Navbar
        setResults={props.setResults}
        isLoggedIn={props.isLoggedIn}
        logoutUser={props.logoutUser}
        setTerm={props.setTerm}
        setLocation={props.setLocation}
        term={props.term}
        location={props.location}
      />
      {decideWhichToRender()}
    </div>
  );
};

export default SearchController;
