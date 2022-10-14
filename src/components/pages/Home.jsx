import React from 'react'

// COMPONENTS
import Slider from '../Slider'

// SECTIONS
import Tours from './sections/ToursSection'
import About from './sections/About'
import Team from './sections/Team'
import Newsletter from './sections/Newsletter'

const Home = () => {
  return (
    <div>
      <Slider />
      <Tours />
      <About />
      <Team />
      <Newsletter />
    </div>
  )
}

export default Home