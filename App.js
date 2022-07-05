/**
 * clg - console.log('')
 * rfc - default template
 * rafce - default template
 */

import React, { useState } from 'react'

// Components
import Home from './components/Home'
import Quiz from './components/Quiz'
import './App.css'

export default function App() {
  const [isHome, setIsHome] = useState(true)

  function toggleIsHome() {
    setIsHome(prevIsHome => !prevIsHome);
  }

  return (
    <div className="app">
      {
        (!isHome) ? <Quiz /> : <Home toggleIsHome={toggleIsHome} />
      }
    </div>
  )
}