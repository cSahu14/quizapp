import React from 'react'
import Register from '../../Components/authComponent/Register'
import Navbar from '../../Components/NavComponent/Navbar'

const index = () => {
  return (
    <div>
        <Navbar />
        <h3>Register</h3>
        <Register/>
    </div>
  )
}

export default index