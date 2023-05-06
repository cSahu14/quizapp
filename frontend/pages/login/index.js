import React from 'react'
import Navbar from '../../Components/NavComponent/Navbar'
import Login from '../../Components/authComponent/Login'

const index = () => {
  return (
    <div>
        <Navbar />
        <h3>Login</h3>
        <Login/>
    </div>
  )
}

export default index