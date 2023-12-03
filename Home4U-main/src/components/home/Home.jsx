import React from "react";
import { useState, useEffect } from "react";

import Featured from "./featured/Featured";
import Hero from "./hero/Hero";
import Location from "./location/Location";
import Recent from "./recent/Recent";
import { useLocation } from 'react-router-dom';


const cookies = require("js-cookie");

const Home = () => {
  const location = useLocation();
  const [uid, setuid] = useState(null);
  // uid = location.state.uid;


  // console.log(uid)`

  const getUid = async () => {
    try {
      const token = cookies.get('access_token');
      const base64Url = token.split('.')[1];
      const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
      const jsonPayload = decodeURIComponent(atob(base64).split('').map(function (c) {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
      }).join(''));

      const tuid = await JSON.parse(jsonPayload).uid;
      setuid(tuid);
      console.log("hii" + uid);
    } catch (error) {
      try {
        uid = location.state.uid;
        console.log(uid);
      } catch (error) {
      }
      console.error(error);
    }
  };

  useEffect(() => {

    getUid();
  }, []);

  const [searchResults, setSearchResults] = useState([]);
  const searchListings = async () => {
    try {
      const response = await fetch(`http://localhost:3000/api/listing/listings/get`, { credentials: 'include' });
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const data = await response.json();
      setSearchResults(data);
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

      {console.log("gg" + uid)}
      {uid == 4 && <Hero uid={uid} />}
      <Featured />
      <Recent searchResults={searchResults} heading={"All Listings"} />
      <Location />
    </>
  );
};

export default Home;
