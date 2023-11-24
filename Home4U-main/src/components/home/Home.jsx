import React from "react";
import Featured from "./featured/Featured";
import Hero from "./hero/Hero";
import Location from "./location/Location";
import Recent from "./recent/Recent";

const Home = () => {
  return (
    <>
      <Hero />
      <Featured />
      <Recent />
      <Location />
    </>
  );
};

export default Home;
