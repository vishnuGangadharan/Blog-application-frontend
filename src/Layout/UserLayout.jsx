import React from 'react'
import { Outlet } from 'react-router-dom'
import Nav from '../Pages/User/Nav'
import Footer from '../Pages/User/Footer'
const UserLayout = () => {
  return (
    <div className=''>
      <Nav/>
      <Outlet/>
        <Footer/>
    </div>
  )
}

export default UserLayout
