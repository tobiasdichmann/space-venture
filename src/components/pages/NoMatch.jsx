import React from 'react'
import { Link } from 'react-router-dom'

const NoMatch = () => {
  return (
    <div>
      <h1>Beklager</h1>
      <p>Den side du prøver at tilgå findes ikke... <Link to="/">Tilbage til forsiden</Link></p>
    </div>
  )
}

export default NoMatch