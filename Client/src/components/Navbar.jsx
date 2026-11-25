import React from 'react'
import { Link } from 'react-router-dom'

function Navbar() {
  return (
    <>
        <div>
            <Link to={""} className='link'>find a Doctor</Link>
            <Link to={""} className='link'>specialist</Link>
            <Link to={""} className='link'>How it works</Link>
            <Link to={""} className='link'>for Doctors</Link>
        </div>
        <div>
            <Link to={"/login"} className='link aut-btn'>Login</Link>
            <Link to={"/register"} className='link reg-btn'>Create Account</Link>

        </div>
    </>
  )
}

export default Navbar