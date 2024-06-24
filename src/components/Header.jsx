import React from 'react'
import { Link } from 'react-router-dom'

const Header = () => {
  return (
    <header>
        <h1>StayNz</h1>
        <nav>
        <Link to="/" className='nav-link'>Home</Link>
        <Link to="/search" className='nav-link'>Search</Link>
        </nav>
    </header>
  )
}

export default Header
