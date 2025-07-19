import React from 'react'
import './Navbar.css'
import { NavLink } from 'react-router-dom'
const Navbar = () => {
  return (
    <div className='Nav'>
       <NavLink to={'/'} className={({isActive})=>isActive?"tab-active":""}> Home </NavLink>
       <NavLink to={'/pastes'} className={({isActive})=>isActive?"tab-active":""}> Pastes </NavLink>
    </div>
  )
}

export default Navbar
