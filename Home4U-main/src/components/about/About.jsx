import React from "react"
import Back from "../common/Back"
import Heading from "../common/Heading"
import img from "../images/about.jpg"
import "./about.css"

const About = () => {
  return (
    <>
      <section className='about'>
        <Back name='About Us' title='About Us - Who Are We?' cover={img} />
        <div className='container flex mtop'>
          <div className='left row'>
            <Heading title='HOMES4U' subtitle='Simplifying the home owning process' />

            <p>Welcome to HOMES4U, your premier destination for finding the perfect property that truly feels like home. Our innovative real estate platform is designed to simplify your property search and connect you with your dream living space effortlessly.</p>
            <p>Discover the future of real estate with HOMES4U – where your ideal home is just a click away. Our platform goes beyond traditional listings, offering a dynamic and comprehensive view of each property through high-quality images, detailed descriptions, and virtual tours. </p>
            <button className='btn2'>More About Us</button>
          </div>
          <div className='right row'>
            <img src='./immio.jpg' alt='' />
          </div>
        </div>
      </section>
    </>
  )
}

export default About
