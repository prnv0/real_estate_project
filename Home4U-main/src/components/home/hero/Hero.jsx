import React, { useState, useEffect } from "react";
import Heading from "../../common/Heading";
import DropdownList from "react-widgets/DropdownList";
import Box from "@mui/material/Box";
import Slider from "@mui/material/Slider";
import "react-widgets/styles.css";
import "./hero.css";

const Hero = () => {
  const [showMoreMenu, setShowMoreMenu] = useState(false);
  const [listings, setListings] = useState([]);
  const [searchResults, setSearchResults] = useState([]);
  const toggleMoreMenu = (e) => {
    e.preventDefault();
    setShowMoreMenu(!showMoreMenu);
  };

  const searchListings = async () => {
    try {
      const response = await fetch(
        "http://localhost:3000/api/listing/listings/search?location=Suburb%20City&type=villa"
      );
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const data = await response.json();
      setSearchResults(data); // Set the retrieved search results in state
    } catch (error) {
      console.error("There was a problem with the fetch operation:", error);
    }
  };

  useEffect(() => {
    // Fetch search results when component mounts
    searchListings();
  }, []);
  return (
    <>
      <section className="hero">
        <div className="container">
          <Heading
            title="Your new Home Awaits! "
            subtitle="Find new & featured property located in your local city."
          />

          <form className="flex">
            <div className="box">
              <span>City/Street</span>
              <input type="text" placeholder="Location" />
            </div>
            <div className="box">
              <span>Listing Type</span>
              <DropdownList
                defaultValue="Buy"
                data={["Buy", "Rent", "Lease"]}
              />
            </div>
            <div className="box">
              <span>Property Type</span>
              <DropdownList
                defaultValue="House"
                data={["House", "Villa", "Apartment", "Office"]}
              />
            </div>
            <div className="additional">
              <button className="btnmore" onClick={(e) => toggleMoreMenu(e)}>
                <h4>More</h4>
              </button>
              <button className="btn1">
                <i className="fa fa-search"></i>
              </button>
            </div>
            {showMoreMenu && (
              <>
                <div className="box">
                  <span>Price Range</span>
                  <Box sx={{ width: 500 }}></Box>
                  <Slider
                    size="small"
                    defaultValue={3500000}
                    aria-label="Small"
                    valueLabelDisplay="auto"
                    max={50000000}
                  />
                </div>
                <div className="box">
                  <span>Bedrooms</span>
                  <DropdownList
                    defaultValue="2BHK"
                    data={["1BHK", "2BHK", "3BHK", "4BHK", "5BHK+"]}
                  />
                </div>
              </>
            )}
          </form>
        </div>
        <div>
          <h2>Search Results</h2>
          <ul>
            {searchResults.map((result, index) => (
              <li key={index}>
                {/* Render result details */}
                {/* Example: */}
                <p>Name: {result.name}</p>
                <p>Location: {result.location}</p>
                {/* Add other details as needed */}
              </li>
            ))}
          </ul>
        </div>
      </section>
    </>
  );
};

export default Hero;
