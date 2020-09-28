import React from "react";
import { Link } from "react-router-dom";

import { Rating } from "@material-ui/lab";
import MonetizationOnIcon from "@material-ui/icons/MonetizationOn";

const SearchPage = (props) => {
  // let resultsRaw = localStorage.getItem("searchResults");
  // let result = JSON.parse(resultsRaw);
  // const [results, setResults] = useState(result);
  // setResults(result);
  // console.log(results);

  const priceToString = (e) => {
    // console.log(`${e}`.length);
    return `${e}`;
  };
  return (
    <div className="searchResultsContainer">
      {props.results && props.results.businesses ? (
        props.results.businesses.map((item, i) => (
          <Link
            to={`/services/${item.name}`}
            key={i}
            onClick={() => {
              props.setServiceResult(item.id);
              // localStorage.setItem("serviceResult", JSON.stringify(item.id));
            }}
          >
            <div className="servicesSearchContainer">
              <div className="serviceSearchDiv">
                <div className="serviceSearchPic">
                  {" "}
                  <img
                    src={item.image_url}
                    className="searchServiceImage"
                    height="150px"
                    width="200px"
                    alt={"service logo"}
                  />
                </div>
                <div className="serviceSearchInfo">
                  <li>
                    <h1>{item.name}</h1>
                  </li>
                  <li>
                    {item.categories.map((category, i) => (
                      <div className="serviceSearchCategories" key={i}>
                        <p>{category.title}</p>
                      </div>
                    ))}
                  </li>
                  {item.location.city && item.location.state && (
                    <li>
                      {item.location.city}, {item.location.state}
                    </li>
                  )}

                  <Rating
                    name="reviewRating"
                    value={priceToString(item.price).length}
                    readOnly
                    icon={<MonetizationOnIcon />}
                  />
                  <li>Average Rating: {item.rating}</li>
                  <li>{item.is_closed}</li>
                </div>
              </div>
              <div className="serviceUserOptions">
                {item.display_phone && (
                  <>
                    <h3>Contact</h3>
                    {item.display_phone}
                  </>
                )}
              </div>
            </div>
          </Link>
        ))
      ) : (
        <p>Invalid Location Please Try Again</p>
      )}
    </div>
  );
};

export default SearchPage;
