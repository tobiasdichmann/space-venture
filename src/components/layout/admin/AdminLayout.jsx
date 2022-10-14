import React, { useContext } from 'react'
import { Outlet, Navigate } from 'react-router-dom'
import { NavLink } from 'react-router-dom';

// LAYOUT
import AdminNavbar from './AdminNavbar';

// LOGIN
import { LoginContext } from '../../../context/LoginContext';

// IMAGES
import Logo from '../../../assets/img/logo.png';


const AdminLayout = () => {
  const { user } = useContext(LoginContext);

  if (!user) {
    // Send the user to the login page
    return <Navigate to="/login" replace />
  }

  return (
    <div className='layout-content'>
      <NavLink to="/"><img src={Logo} alt="Logo" className='logo' /></NavLink>

      <AdminNavbar />

      {/* The child-path - Located in App.js */}
      <Outlet />
    </div>
  )
}

export default AdminLayout