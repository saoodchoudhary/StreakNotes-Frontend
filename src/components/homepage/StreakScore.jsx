 import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { fetchCurrentUsers } from '../../redux/slice/userSlice';
import Loading from '../layout/Loading';
 
 const StreakScore = () => {

  const dispatch = useDispatch();
  const data = useSelector(state => state.user);
  const profileData = data.currentUser;
  const streak = data.streak;

  useEffect(() => {
    dispatch(fetchCurrentUsers({userId: localStorage.getItem('uid')}));
  }, []);

  if(!profileData){
    return <Loading />
  };



   return (
     <div className='flex mt-1 w-full gap-3 px-6 py-[6px]  '>
        <div className='bg-white flex-1 rounded-sm pb-[10px] shadow'>
        <div className='bg-green-200 inline-block py-[2px] pl-[15px] rounded-tl-sm pr-[20px] rounded-r-xl text-[10px] font-medium'>Streak</div>
        <div className='flex gap-2 align-middle justify-center'>
                <div className='font-medium'>{streak}</div>
                <img src="/icon/streak-fire.svg" alt="fire"   className='h-[28px] w-auto' />
            </div>
        </div>
        <div className='bg-white flex-1 rounded-sm pb-[10px] shadow'>
            <div className='bg-green-200 inline-block py-[2px] pl-[15px] rounded-tl-sm pr-[20px] rounded-r-xl text-[10px] font-medium'>Score</div>
            <div className='flex gap-2 align-middle justify-center'>
                <div className='font-medium'>{profileData.score}</div>
                <img src="/icon/score.svg" className='h-[28px] w-auto' alt="fire" />
            </div>
        </div>
       
     </div>
   )
 }
 
 export default StreakScore
 