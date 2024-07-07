import React, { useEffect, useState } from 'react'
import { format, startOfWeek, addDays, isBefore, isToday } from 'date-fns';
import { FaRegCalendarAlt } from "react-icons/fa";
import { Link } from 'react-router-dom';
const WeekMonth = () => {

    const [weekDays, setWeekDays] = useState([]);
    useEffect(() => {
        const getCurrentWeekDates = () => {
            const today = new Date();
            const startOfCurrentWeek = startOfWeek(today, { weekStartsOn: 0 }); // Week starts on Sunday
            const dates = [];

            for (let i = 0; i < 7; i++) {
                dates.push(addDays(startOfCurrentWeek, i));
            }

            return dates;
        };
        setWeekDays(getCurrentWeekDates());
    }, [])

    const today = new Date();
    return (
        <div className=' w-full bg-white  rounded-t-3xl  mt-0 mb-[50px] pb-[10px]'>
            <div className='flex justify-center mb-4 relative'>
                <div className='text-[18px] font-medium absolute left-8 top-2'>JUNE</div>
                <div className='text-[18px] font-medium absolute right-8 top-2 '>2024</div>
                <div className='text-[20px] font-semibold text-center bg-green-100 px-5 py-1 rounded-b-md'>WEEK 26</div>
            </div>
            {/* <div className='flex justify-between px-[30px] mt-2'>
                <div className='flex align-middle gap-1'>
               
                    <FaRegCalendarAlt className='h-[18px] w-auto text-gray-600 self-center'/>
                </div>
            </div> */}
            <div className='px-4 mt-10'>
                {weekDays.map((day, index) => {
                    const isFutureDate = !isBefore(day, today) && !isToday(day);
                    const linkClass = isFutureDate ? 'cursor-not-allowed text-gray-400' : 'cursor-pointer text-black';
                    const linkProps = isFutureDate ? { onClick: (e) => e.preventDefault() } : {};

                    return (
                        <Link
                            to={`/notes/list/${format(day, 'yyyy-MM-dd')}`}
                            key={index}
                            className={`bg-white py-5 px-[25px] my-[10px] block mx-[5px] border ${linkClass}`}
                            {...linkProps}
                        >
                            <div className='text-[18px] font-medium'>{format(day, 'E')}</div>
                        </Link>
                    );
                })}
            </div>

        </div>
    )
}

export default WeekMonth
