import React from 'react'
import { MdOutlineEditNote } from "react-icons/md";
import { FaRegCalendarAlt, FaUserFriends } from "react-icons/fa";
import { IoPersonSharp } from "react-icons/io5";
import { Link } from 'react-router-dom';
const Bottombar = () => {
  return (
    <div className='flex bg-white justify-around fixed bottom-0 w-full z-40 h-[48px] align-middle'>
      <Link to={`/`} className='self-center'> <MdOutlineEditNote className='h-[24px] w-auto text-gray-500'/></Link>
       <Link to={`/calendar/someCalendar`} className='self-center'> <FaRegCalendarAlt className='h-[20px] w-auto text-gray-500'/></Link>
      <Link to={`/friends`} className='self-center'> <FaUserFriends className='h-[20px] w-auto text-gray-500'/></Link>
       <Link to={`/profile/someprofile`} className='self-center'> <IoPersonSharp className='h-[20px] w-auto text-gray-500'/></Link>
    </div>
  )
}

export default Bottombar
