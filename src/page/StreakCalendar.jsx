import React, { useState, useEffect, useRef } from 'react';
import { addMonths, format, startOfMonth, endOfMonth, eachDayOfInterval, subMonths, getDay } from 'date-fns';
import { Box } from '@mui/material';
import '../styles/Calendar.css';
import axios from 'axios';
import { Link } from 'react-router-dom';

const StreakCalendar = () => {
  const initialYear = 2024;
  const [months, setMonths] = useState(
    Array.from({ length: 12 }, (_, i) => new Date(initialYear, i, 1))
  );
  const scrollRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      if (scrollRef.current) {
        const { scrollTop, clientHeight, scrollHeight } = scrollRef.current;
        if (scrollTop + clientHeight >= scrollHeight) {
          setMonths(prev => [...prev, ...Array.from({ length: 12 }, (_, i) => addMonths(prev[prev.length - 1], i + 1))]);
        } else if (scrollTop === 0) {
          setMonths(prev => [...Array.from({ length: 12 }, (_, i) => subMonths(prev[0], i + 1)).reverse(), ...prev]);
        }
      }
    };

    if (scrollRef.current) {
      scrollRef.current.addEventListener('scroll', handleScroll);
    }

    return () => {
      if (scrollRef.current) {
        scrollRef.current.removeEventListener('scroll', handleScroll);
      }
    };
  }, []);

  const [streakDates, setStreakDates] = useState([]);
  const [streakRestoreDates, setStreakRestoreDates] = useState([]);


  useEffect(() => {
    const fetchStreakAndRestoreDates = async () => {
      try{
        const response = await axios.post(`${import.meta.env.VITE_API_URI}/streaks/getStreakAndRestoreDates`, {
          userId: localStorage.getItem('uid')
        });
        // console.log(response.data);
        setStreakDates(response.data.streakDates);
        setStreakRestoreDates(response.data.streakRestoreDates);
      }
      catch(error){
        console.log(error);
      }
    };

    fetchStreakAndRestoreDates();
  }, []);

  // const streakDates = ['2024-07-10', '2024-07-15']; // Example streak dates
  const daysOfWeek = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'];

  return (
    <div className="calendar-container bg-white pb-[50px]" ref={scrollRef} style={{ overflowY: 'auto', height: '100vh' }}>
      {months.map((month, index) => {
        const startDay = getDay(startOfMonth(month));
        const daysInMonth = eachDayOfInterval({ start: startOfMonth(month), end: endOfMonth(month) });
        const emptyDays = Array.from({ length: startDay }, (_, i) => <Box key={`empty-${i}`} className="day-box empty"></Box>);

        return (
          <div key={index} className="month-box">
            <h2 className="month-title">{format(month, 'MMMM yyyy')}</h2>
            <div className="days-of-week">
              {daysOfWeek.map((day,_) => (
                <div key={_} className="day-header">{day}</div>
              ))}
            </div>
            <div className="days-grid">
              {emptyDays}
              {daysInMonth.map((day, _) => (
               <Link 
               key={"i"+_}
               to={`/notes/list/${format(day, 'yyyy-MM-dd')}`}
               className='link-box'> 
               
               <div
                  id={format(day, 'yyyy-MM-dd')}
                  className={`day-box ${streakRestoreDates.includes(format(day, 'yyyy-MM-dd')) ? 'restore-streak' : ''} ${streakDates.includes(format(day, 'yyyy-MM-dd')) ? 'streak' : ''}  `}
                >
                  {format(day, 'd')}
                </div>
                </Link>
              ))}
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default StreakCalendar;
