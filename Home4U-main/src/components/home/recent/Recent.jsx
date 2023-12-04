import React from "react"
import Heading from "../../common/Heading"
import "./recent.css"
import RecentCard from "./RecentCard"

const Recent = ({ searchResults, heading }) => {
  return (
    <>
      <section className='recent padding'>
        <div className='container'>
          <Heading title={heading} subtitle='' />
          <RecentCard list={searchResults} />
        </div>
      </section>
    </>
  )
}

export default Recent
