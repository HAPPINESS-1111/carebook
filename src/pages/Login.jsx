import React from 'react'
import { Link } from 'react-router-dom'
import{ FaStethoscope } from "react-icons/fa";
import AuthLayout from './layouts/AuthLayout';

function Login() {
  return (
    <AuthLayout
     title={"Your appointments, notes and payments in one place."} 
     text={"Patients book and pay. Doctors manage their schedule. Admina keep everything safe"}>
      <form action="">
    <h1>Welcome back</h1>
    <p className="muted">Log in to manage your appointments.</p>
    <label className="field">
      Email address
      <input type="email" name='email' required value={""} />
    </label>
    <div className="field">
      <div className="row-between">
        <input type="password" name="password" id="password" value={""}/>
        <Link to={"/forgot-password"} class ="small">Forgot password?</Link>
      </div>
    <div className="password-field">
        <lable htmlFor="password">Password</lable>
        <button type='button' className="show-password"></button>
        </div>
        </div>
        <button className="btn btn-block">Log in</button>
        <p className="small center">
          New to Carebook?
          <Link to={"/register"}>Create an account</Link>
        </p>
      <div className="auth-note">
        <FaStethoscope />
        <div>
          <strong>Are you a doctor?</strong>
          <Link to="">Rgister as a doctor</Link>
          Your profile goes live once an admim checks your MDCN License.
        </div>
      </div>
    </form>
    </AuthLayout>
  )
}

export default Login