import React from 'react'
import { useNavigate } from 'react-router-dom'

const Homepage = () => {
  const navigate = useNavigate();

  const handleButton = () => {
    navigate('/search');
  }
  return (
    <div className='home-container'>
      <div className='home-info'>
        <h1>Find your next NZ Stay</h1>
        <p>Curated accomodation from all around New Zealand.</p>
        <div className='button-container'>
          <button onClick={handleButton}>Search Rooms</button>
        </div>
      </div>
    </div>
  )
}

export default Homepage
