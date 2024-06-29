import React from 'react'
import { FaRegCalendarAlt } from "react-icons/fa";
const week = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']
const WeekMonth = () => {
    return (
        <div className=' w-full bg-white  rounded-t-3xl  mt-2 mb-[60px] pb-[10px]'>
            <div className='flex justify-center mb-4 relative'>
            <div className='text-[18px] font-medium absolute left-8 top-2'>JUNE</div>
            <div className='text-[18px] font-medium absolute right-8 top-2 '>2024</div>
            <div className='text-[20px] font-semibold text-center bg-green-200 px-5 py-1 rounded-b-md'>WEEK 26</div>
            </div>
            {/* <div className='flex justify-between px-[30px] mt-2'>
                <div className='flex align-middle gap-1'>
               
                    <FaRegCalendarAlt className='h-[18px] w-auto text-gray-600 self-center'/>
                </div>
            </div> */}
            <div className='px-4'>
                {week.map((day, index) => (
                    <div key={index} className='bg-white py-5 px-[25px] my-[10px] mx-[5px] border'>
                        <div className='text-[18px] font-medium'>{day}</div>
                    </div>
                ))}
            </div>

        </div>
    )
}

export default WeekMonth
