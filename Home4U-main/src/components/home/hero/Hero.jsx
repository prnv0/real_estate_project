import React, { useState, useEffect } from "react";
import Heading from "../../common/Heading";
import DropdownList from "react-widgets/DropdownList";
import Box from "@mui/material/Box";
import Slider from "@mui/material/Slider";
import "react-widgets/styles.css";
import "./hero.css";
import RecentCard from "../recent/RecentCard.jsx";
import axios from "axios";

const Hero = ({ uid }) => {
  const [showMoreMenu, setShowMoreMenu] = useState(false);
  const [listings, setListings] = useState([]);
  const [searchResults, setSearchResults] = useState([]);

  const [location, setLocation] = useState('');
  const handleLocationChange = (event) => {
    setLocation(event.target.value);
  };
  const [listingType, setListingType] = useState('Buy');
  const handleListingTypeChange = (event) => {
    setListingType(event.target.value);
  };
  const [type, settype] = useState('');
  const handletypeChange = (event) => {
    settype(event.target.value);
  };

  const toggleMoreMenu = (e) => {
    e.preventDefault();
    setShowMoreMenu(!showMoreMenu);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    console.log(location);
    console.log(type);
    // const response = await axios.get('http://localhost:3000/api/listing/listings/search', {
    //   params: {
    //     type,
    //     location,

    //   },
    // });
    const response = await fetch('http://localhost:3000/api/listing/listings/search?type=' + encodeURIComponent(type) + '&location=' + encodeURIComponent(location),
      { credentials: 'include' },
    );
    const data = await response.json();
    setListings(data);
  };

  const searchListings = async () => {
    try {
      const userId = uid; // Replace with actual user ID
      const response = await fetch(`http://localhost:3000/api/user/listings/${userId}`, { credentials: 'include' });
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const data = await response.json();
      console.log(data);
      setSearchResults(data);
      console.log(searchResults);
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

          <form className="flex" onSubmit={handleSubmit}>
            <div className="box">
              <span>City/Street</span>
              <input type="text" value={location} onChange={handleLocationChange} placeholder="Location" />
            </div>
            <div className="box">
              <span>Listing Type</span>
              <div onChange={handleListingTypeChange}>
                <input type="radio" value="Buy" name="listingType" defaultChecked /> Buy
                <input type="radio" value="Rent" name="listingType" /> Rent
                <input type="radio" value="Lease" name="listingType" /> Lease
              </div>
            </div>
            <div className="box">
              <span>Property Type</span>
              <div onChange={handletypeChange}>
                {["house", "villa", "apartment", "office"].map((option, index) => (
                  <label key={index}>
                    <input type="radio" value={option} name="type" defaultChecked={option === "House"} />
                    {option}
                  </label>
                ))}
              </div>
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
          {/* <h2>Search Results</h2>
          <div className='content grid5 mtop'><ul>
            {searchResults.map((result, index) => (
              // <li key={index}>
              //   <h3>{result.title}</h3>
              //   <p>{result.description}</p>
              //   <p>{result.price}</p>
              //   <p>{result.address}</p>
              // </li>
              <div className='box' key={index}>

                <h3>{result.name}</h3>
                <p>{result.description}</p>
                <p>{result.price}</p>
                <p>{result.address}</p>
              </div>
            ))}
          </ul></div> */}
          <RecentCard list={listings} />
        </div>
      </section>
    </>
  );
};
export default Hero;
