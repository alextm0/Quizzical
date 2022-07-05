import React from 'react'

import '../App.css'
import './Home.css'

import lowerBlob from '../assets/lowerBlob.png'
import upperBlob from '../assets/upperBlob.png'

export default function Home({ toggleIsHome }) {
  return (
    <div className="home">
      <h1 className="home__title"> Quizzical </h1>
      <div className="home__subtitle"> The ultimate trivia game! </div>
      <button className="home__startBtn" onClick={toggleIsHome}> Start quiz </button>
      <img src={lowerBlob} className="lowerBlob" alt="upperBlob" />
      <img src={upperBlob} className="upperBlob" alt="upperBlob" />
    </div>
  )
}