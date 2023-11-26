import React from "react";
import Featured from "./featured/Featured";
import Hero from "./hero/Hero";
import Location from "./location/Location";
import Recent from "./recent/Recent";
import { useLocation } from 'react-router-dom';

const Home = () => {
  const location = useLocation();
  console.log(location);
  const uid = location.state.uid;
  return (
    <>
      <Hero uid={uid} />
      <Featured />
      <Recent />
      <Location />
    </>
  );
};

export default Home;
