import React from 'react'
import { IoArrowBack } from "react-icons/io5";
const BackBtnNavbar = ({text}) => {
  return (
    <div>
        <div className='h-[60px] p-[18px] bg-white flex  fixed right-0 top-0 gap-3 w-full z-50'>
            <div className='flex gap-[17px] align-middle'>
            <button onClick={() => window.history.back()} className='text-[18px] font-semibold self-center'><IoArrowBack /></button>
            </div>
            <div className='text-[18px] font-semibold self-center'>{text || "LiFE NOTES"}</div>
        </div>      
    </div>
  )
}

export default BackBtnNavbar
