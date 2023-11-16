import React, { useState } from "react";
import Heading from "../../common/Heading"
import DropdownList from "react-widgets/DropdownList";
import Box from '@mui/material/Box';
import Slider from '@mui/material/Slider';
import "react-widgets/styles.css";
import "./hero.css"

const Hero = () => {
  const [showMoreMenu, setShowMoreMenu] = useState(false);

  const toggleMoreMenu = (e) => {
    e.preventDefault(); // Prevent the default form submission behavior
    setShowMoreMenu(!showMoreMenu);
  };
  
  return (
    <>
      <section className='hero'>
        <div className='container'>
          <Heading title='Your new Home Awaits! ' subtitle='Find new & featured property located in your local city.' />

          <form className='flex'>
            <div className='box'>
              <span>City/Street</span>
              <input type='text' placeholder='Location' />
            </div>
            <div className='box'>
              <span>Listing Type</span>
              <DropdownList defaultValue="Buy" data={["Buy", "Rent", "Lease"]}/>
            </div>
            <div className='box'>
              <span>Property Type</span>
              <DropdownList defaultValue="House" data={["House", "Villa", "Apartment", "Office"]}/>
            </div>
            <div className="additional">
              <button className='btnmore' onClick={(e) => toggleMoreMenu(e)}>
                <h4>More</h4>
              </button>
              <button className='btn1'>
                <i className='fa fa-search'></i>
              </button>
            </div>
            {showMoreMenu && (
              <>
                <div className='box'>
                  <span>Price Range</span>
                  <Box sx={{ width: 500 }}></Box>
                  <Slider size="small" defaultValue={3500000} aria-label="Small" valueLabelDisplay="auto" max={50000000}/>
                </div>
                <div className='box'>
                  <span>Bedrooms</span>
                  <DropdownList defaultValue="2BHK" data={["1BHK", "2BHK", "3BHK", "4BHK", "5BHK+"]}/>
                </div>
              </>
            )}
          </form>
          
        </div>
      </section>
    </>
  )
}

export default Hero
