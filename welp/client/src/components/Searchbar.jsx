import React, { useState } from "react";
import Input from "@material-ui/core/Input";
import Button from "@material-ui/core/Button";
import { Redirect } from "react-router-dom";
import SearchIcon from "@material-ui/icons/Search";

const SearchBar = (props) => {
  // const [term, setTerm] = useState("");
  // const [location, setLocation] = useState("");
  // const [searchResults, setSearchResults] = useState(null);
  const [fireRedirect, setFireRedirect] = useState(false);

  const YELP_API_KEY = process.env.REACT_APP_YELP_KEY;
  const yelpFetch = (term, location) => {
    return fetch(
      `https://cors-anywhere.herokuapp.com/api.yelp.com/v3/businesses/search?term=${props.term}&location=${props.location}`,
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
        // props.setSearchResults(res);
        // setSearchResults(res);
        // localStorage.setItem("searchResults", JSON.stringify(res));
        props.setResults(res);
        // console.log(term, location);
      })
      .then(() => {
        setFireRedirect(true);
      });
  };

  const handleSearch = (term, location) => {
    const data = { term: term, location: location };
    return fetch("/search", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((res) => res.json())
      .then((res) => {
        console.log(res);
        // props.setSearchResults(res);
        // setSearchResults(res);
        // localStorage.setItem("searchResults", JSON.stringify(res));
        props.setResults(res);
        // console.log(term, location);
      });
    // .then(() => {
    //   setFireRedirect(true);
    // });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    yelpFetch(props.term, props.location);
    // handleSearch(props.term, props.location);
    console.log(props.term, props.location);
  };

  return (
    <div className="searchBarContainer">
      <form onSubmit={handleSubmit} className="searchBarForm">
        <Input
          name="term"
          color="primary"
          onInput={(e) => props.setTerm(e.target.value)}
          placeholder="Keyword"
          className="searchBarLeftInput"
          required
          value={props.term}
        />
        <Input
          name="location"
          placeholder="Location"
          className="searchBarRightInput"
          required
          onInput={(e) => props.setLocation(e.target.value)}
          value={props.location}
        />
        <Button
          type="submit"
          variant="contained"
          color="primary"
          className="searchBarButton"
        >
          <SearchIcon />
        </Button>
      </form>
      {fireRedirect && (
        <Redirect
          to={{
            pathname: "/search/" + props.term + "&" + props.location,
          }}
        />
      )}
    </div>
  );
};

export default SearchBar;
