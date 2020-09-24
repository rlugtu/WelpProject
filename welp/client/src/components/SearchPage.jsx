import React from "react";
import { Link } from "react-router-dom";
const SearchPage = (props) => {
  //   let resultsRaw = localStorage.getItem("searchResults");
  //   let result = JSON.parse(resultsRaw);
  //   const [results, setResults] = useState(result);

  //   setResults(result);
  //   console.log(results);
  return (
    <div className="searchResultsContainer">
      {props.results ? (
        props.results.businesses.map((item, i) => (
          <Link
            to={`/services/${item.name}`}
            key={i}
            onClick={() => {
              props.setServiceResult(item.id);
            }}
          >
            <div className="servicesSearchContainer">
              <div className="serviceSearchDiv">
                <div className="serviceSearchPic">
                  {" "}
                  <img
                    src={item.image_url}
                    className="searchServiceImage"
                    height="200px"
                    width="250px"
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
                  <li>{item.price}</li>
                  <li>{item.rating}</li>
                  <li>{item.is_closed}</li>
                </div>
              </div>
              <div className="serviceUserOptions">block</div>
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
