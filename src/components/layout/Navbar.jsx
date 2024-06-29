import React from 'react'
import { RxHamburgerMenu } from "react-icons/rx";
import { HiOutlineChatBubbleOvalLeftEllipsis } from "react-icons/hi2";

const Navbar = () => {
  return (
    <div className='h-[60px] p-[18px] bg-white flex justify-between fixed right-0 top-0 w-full'>
      <div className='flex gap-[17px] align-middle'><RxHamburgerMenu className='h-[24px] w-auto self-center' /> <span className='text-[18px] font-semibold self-center'>LiFE NOTES</span>
      </div>
      <div> <HiOutlineChatBubbleOvalLeftEllipsis  className='h-[24px] w-auto '/> </div>
    </div>
  )
}

export default Navbar
