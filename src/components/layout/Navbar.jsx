import React, { useState } from 'react'
import { RxHamburgerMenu } from "react-icons/rx";
import { HiOutlineChatBubbleOvalLeftEllipsis } from "react-icons/hi2";
import { Link } from 'react-router-dom';
import Sidebar from './Sidebar';

const Navbar = () => {
  const [isSidebarOpen, setSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setSidebarOpen(!isSidebarOpen);
  };

  const closeSidebar = () => {
    setSidebarOpen(false);
  };
  return (
    <div className='h-[60px] w-full max-w-[390px] mx-auto p-[18px] border-b bg-white flex justify-between fixed top-0  z-50'>
      <div className='flex gap-[17px] align-middle'><RxHamburgerMenu className='h-[24px] w-auto self-center'  onClick={()=>toggleSidebar()} /> <span className='text-[18px] font-semibold self-center'>LiFE NOTES</span>
      </div>
      <Link to={"/recieved-notes"}> <HiOutlineChatBubbleOvalLeftEllipsis  className='h-[24px] w-auto '/> </Link>
      
      <Sidebar isOpen={isSidebarOpen} onClose={closeSidebar} />
    </div>
  )
}

export default Navbar
