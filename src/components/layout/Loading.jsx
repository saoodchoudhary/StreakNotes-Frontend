import React from 'react'

const Loading = () => {
  return (
    <div className='fixed inset-0 bg-white h-screen w-screen z-20'>
        <div className='flex h-full justify-center items-center'>
            <div className='animate-spin rounded-full h-[48px] w-[48px] border-[3px] border-t-transparent border-blue-300'></div>
        </div>      
    </div>
  )
}

export default Loading
