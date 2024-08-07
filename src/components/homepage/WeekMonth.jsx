import React, { useEffect, useState } from 'react'
import { format, startOfWeek, addDays, isBefore, isToday } from 'date-fns';
import { FaRegCalendarAlt } from "react-icons/fa";
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { CurrentUser, fetchCurrentUsers } from '../../redux/slice/userSlice';
import Loading from '../layout/Loading';
const WeekMonth = () => {
    const dispatch = useDispatch();
    const state = useSelector(CurrentUser)
    const [isRestore, setIsRestore] = useState(false);
    console.log('state', state);    
    // matching colors for each day of the week
    const weekDaysColor = [
        "bg-[#FFF5F5]", // Sunday: Very Light Red
        "bg-[#FFFBE6]", // Monday: Very Light Yellow
        "bg-[#E6F9FF]", // Wednesday: Very Light Blue
        "bg-[#F5E6FF]", // Thursday: Very Light Purple
        "bg-[#FFF9E6]", // Friday: Very Light Orange
        "bg-[#E6FFF5]", // Tuesday: Very Light Green
        "bg-[#FFE6FA]", // Saturday: Very Light Pink
    ];
    

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

    useEffect(() => {
        if (state !== null) {
       
        const today1 = new Date();
        const yesterday1 = addDays(today1, -1);
        const dateId = format(yesterday1, 'yyyy-MM-dd');
        console.log('dateId', dateId);
      const checkinStreaks =   state.streaks[0].streak.includes(dateId) ;
      const restoreStreaks = state.streaks[0].restoreStreak.includes(format(today1, 'yyyy-MM-dd'));
      console.log('checkinStreaks', checkinStreaks);
      console.log('restoreStreaks', restoreStreaks);
        if(!checkinStreaks && !restoreStreaks){
            setIsRestore(true);
        } }
    }, [state])

    const handleRestoreStreaks = async () => {
        console.log('restoring streaks');
        const date = new Date();
        const dateId = format(date, 'yyyy-MM-dd');
        const response = await fetch(`${import.meta.env.VITE_API_URI}/streaks/restore`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                userId: localStorage.getItem('uid'),
                dateId,
            }),
        });
        if (response.ok) {
            setIsRestore(false);
            dispatch(fetchCurrentUsers( {userId : localStorage.getItem('uid')} ));
        }
    }

    const today = new Date();
    if(state === null){
        return <Loading/>
    }

  
    return (
        <div className=' bg-white  rounded-t-3xl mx-2 border  mt-2 mb-[50px] pb-[10px]'>
            <div className='flex mt-5 mx-6 justify-between items-center'>
                <div className='text-md text-gray-700 font-medium'>Week 26</div>
              {isRestore && <div className='text-md flex gap-1 justify-center items-center border border-orange-500 px-4 py-1 rounded-full text-orange-500 font-medium' onClick={()=>{handleRestoreStreaks()}}>Restore <img src='/icon/streak-fire.svg' className=' w-[16px] h-[16px]' /></div> }
                <div className='text-md text-gray-700 font-medium'>June 2024</div>

            </div>
            {/* <div className='flex justify-between px-[30px] mt-2'>
                <div className='flex align-middle gap-1'>
               
                    <FaRegCalendarAlt className='h-[18px] w-auto text-gray-600 self-center'/>
                </div>
            </div> */}
            <div className='px-4 mt-2'>
                {weekDays.map((day, index) => {
                    const isFutureDate = !isBefore(day, today) && !isToday(day);
                    const linkClass = isFutureDate ? 'cursor-not-allowed text-gray-400' : 'cursor-pointer text-black';
                    const linkProps = isFutureDate ? { onClick: (e) => e.preventDefault() } : {};

                    return (
                        <Link
                            to={`/notes/list/${format(day, 'yyyy-MM-dd')}`}
                            key={index}
                            className={`bg-white py-5 px-[25px] rounded-xl my-[20px] block mx-[5px] shadow ${linkClass}`}
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
