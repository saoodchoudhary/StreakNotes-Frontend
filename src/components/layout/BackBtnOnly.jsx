import React from 'react'
import { IoArrowBack } from 'react-icons/io5'

const BackBtnOnly = () => {
  return (
    <div>
    <div className='h-[60px] p-[18px] max-w-[390px] mx-auto bg-white flex  border-b fixed  top-0 gap-3 w-full z-50'>
        <div className='flex gap-[17px] align-middle'>
        <button onClick={() => window.history.back()} className='text-[18px] font-semibold self-center'><IoArrowBack /></button>
        </div>
    </div>      
</div>
  )
}

export default BackBtnOnly
