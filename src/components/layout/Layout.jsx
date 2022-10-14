import React from 'react'
import { NavLink } from 'react-router-dom'
import { Outlet } from 'react-router-dom'
import Navbar from './Navbar'
import Footer from './Footer'

// IMAGES
import Logo from '../../assets/img/logo.png';

const Layout = () => {
  return (
    <div className='layout-content'>
      <NavLink to="/"><img src={Logo} alt="SpaceVentures logo" className='logo' /></NavLink>

      <Navbar />

      {/* The child-path - Located in App.js */}
      <Outlet />

      <Footer />
    </div>
  )
}

export default Layout