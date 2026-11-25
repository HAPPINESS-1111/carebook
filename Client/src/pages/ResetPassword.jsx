import React from 'react'

function ResetPassword() {
  return (
    <form  action="" className="form card">
       <h1>Choose a new password</h1>
      <lable className="field">
        Enter new password
        <input type="email" required value={""} minLenght={"8"}/>
        <button className="btn">update password</button>
      </lable>
    </form>
  )
}

export default ResetPassword