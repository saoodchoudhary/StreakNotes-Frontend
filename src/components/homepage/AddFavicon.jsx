import React from 'react'
import { IoMdAdd } from "react-icons/io";
import { Link } from 'react-router-dom';
const AddFavicon = () => {
  return (
    <Link to={"/addNotes/someid"} className='fixed bottom-[65px] inline-block right-[30px] bg-green-600 z-30 p-[10px] rounded-[50%]'>
      <IoMdAdd className='h-[20px] w-auto text-white self-center'/>
    </Link>
  )
}

export default AddFavicon
