 import React from 'react'
 
 const StreakScore = () => {
   return (
     <div className='flex w-full gap-[4px] px-[5px] py-[6px]  '>
        <div className='bg-white flex-1 rounded-sm pb-[10px]'>
        <div className='bg-green-300 inline-block py-[2px] pl-[15px] rounded-tl-sm pr-[20px] rounded-r-xl text-[10px] font-medium'>Streak</div>
        <div className='flex gap-2 align-middle justify-center'>
                <div className='font-medium'>10</div>
                <img src="/icon/streak-fire.svg" alt="fire"   className='h-[28px] w-auto' />
            </div>
        </div>
        <div className='bg-white flex-1 rounded-sm pb-[10px]'>
            <div className='bg-green-300 inline-block py-[2px] pl-[15px] rounded-tl-sm pr-[20px] rounded-r-xl text-[10px] font-medium'>Score</div>
            <div className='flex gap-2 align-middle justify-center'>
                <div className='font-medium'>10000</div>
                <img src="/icon/score.svg" className='h-[28px] w-auto' alt="fire" />
            </div>
        </div>
       
     </div>
   )
 }
 
 export default StreakScore
 