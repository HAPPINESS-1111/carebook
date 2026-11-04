import React from 'react'
import { Link } from 'react-router-dom'
import Navbar from './Navbar'

function Header() {
  return (
    <header>
        <div className='logo'>
            <Link to={"/"} className='logo-brand'>CareBook</Link>
        </div>
        <Navbar/>
    </header>
  )
}

export default Header