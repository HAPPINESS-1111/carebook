import React from 'react'

function NotFound() {
  return (
    <div>
        <h1>Page not found...</h1>
        <Link to={"/"} className='back-btn'>Go home</Link>
    </div>
  )
}

export default NotFound