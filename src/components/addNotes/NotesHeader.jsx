import React, { useState } from 'react'
import { IoIosArrowBack } from 'react-icons/io'
import { IoSend } from 'react-icons/io5';
import { useDispatch } from 'react-redux';
import { setNotesTitle, setSendComponent } from '../../redux/slice/noteSlice';
import { Link } from 'react-router-dom';

const NotesHeader = () => {
  const dispatch = useDispatch();

  const handleOnTitleChange = (e) => {
    console.log(e.target.value);
    dispatch(setNotesTitle(e.target.value));
  }


  return (
    <div className='bg-white px-[20px] border-b h-[60px] items-center fixed top-0 w-full flex justify-between'>
      <div className=' flex gap-1 items-center'>
        <Link to={"/"}>  <IoIosArrowBack className='text-2xl text-gray-600' /> </Link>
        <div>
          <input type="text
            " className='w-full  rounded-lg p-2 outline-none' placeholder='Title'
            onChange={handleOnTitleChange}
            maxLength={25} />
        </div>
      </div>
      <div className=''>

        <div onClick={() => { dispatch(setSendComponent(true)) }} className=' flex items-center justify-center align-middle  text-green-700'><IoSend className='self-center' /></div>
      </div>
    </div>
  )
}

export default NotesHeader
