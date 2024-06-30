import React, { useState } from 'react'
import Navbar from '../components/layout/Navbar'
import { Outlet } from 'react-router-dom'
import Bottombar from '../components/layout/Bottombar'

const Home = () => {

  return (
    <div>
      <Navbar/>
      <div className=' overflow-y-auto mt-[60px]'>
        <div>
         <Outlet/>
        </div>
      </div>
      <Bottombar/>
    </div>
  )
}

export default Home
