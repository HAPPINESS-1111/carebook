import React from 'react'
import {Link} from 'react-router-dom'
import logoOnDarkBg from "../assets/assets/logo/logo-on-dark.svg"

function Footer() {
  return (
    <footer className="footer">
        <div className="footer-inner">
          <div className="footer-brand">
            <Link to={"/"} className='logo footer-logo'>
             <img src={logoOnDarkBg} alt="CareBook logo" className='logo-b' />
            </Link>
            <p>Find an approved doctor, book a real open slut and pay securely with Paystack.</p>
          </div>
          <nav className="footer-col">
            <h2>For Patients</h2>
            <Link to={"/doctors"}>Find a doctor</Link>
            <Link to={"/"}>Available today</Link>
            <Link to={"/#How-it-works"}>How it works</Link>
          </nav>
          <nav className="footer-col">
            <h2>For Doctors</h2>
            <Link to={"/"}>Join as a doctor</Link>
            <Link to={"/#How-it-works"}>How approval works</Link>
          </nav>
          <nav className="footer-col">
            <h2>Account</h2>
            <Link to={"/login"}>Log in</Link>
            <Link to={"/register"}>Create account</Link>
            <Link to={"/forgot-password"}>Forgot password</Link>
          </nav>
        </div>
        <div className="footer-bottom">
            <p>&copy; 2026 CarBook. All rights Reserved. Built by Me</p>
        </div>
    </footer>
  )
}

export default Footer