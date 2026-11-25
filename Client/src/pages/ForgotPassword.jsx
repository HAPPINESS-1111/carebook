import React from 'react'

function ForgotPassword() {
  return (
    <form action="" className="form-card">
      <h1>Reset your password</h1>
      <lable className="field">
        Enter your Email
        <input type="email" required value={""}/>
        <button className="btn">Send reset link</button>
      </lable>
    </form>
  )
}

export default ForgotPassword