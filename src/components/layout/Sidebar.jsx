// src/components/Sidebar.js
import React, { useContext } from 'react';
import { FaTimes, FaCog, FaSignOutAlt } from 'react-icons/fa';
import { IoPerson } from 'react-icons/io5';
import useFetchProfile from '../../hooks/useFetchProfile';
import { AuthContext } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';

const Sidebar = ({ isOpen, onClose }) => {
  const {logout} = useContext(AuthContext)

  const navigate = useNavigate();


  const handleLogout = () => {
    logout();
    navigate('/login');
  }


 const {profileData, loading, error}= useFetchProfile();
  if (loading) return <p>Loading...</p>;

  return (
    <div className={`fixed min-h-[100vh] inset-0 transition-opacity duration-300 ${isOpen ? 'opacity-100 bg-gray-900 bg-opacity-50' : 'opacity-0 pointer-events-none'}`}>
      <div className={`fixed top-0 left-0 h-full w-64 bg-white shadow-lg transform transition-transform duration-300 ${isOpen ? 'translate-x-0' : '-translate-x-full'}`}>
        <div className="flex relative justify-between items-center p-4 border-b bg-green-50">
          {/* <h2 className="text-lg font-bold">LiFE NOTES</h2> */}
         
            <div className='flex flex-col justify-center gap-[2px] align-middle w-full  '>
            <img src="/profile-logo.jpg" alt="logo" className="w-10 h-10 rounded-full self-center object-cover" />
            <div className="text-[12px] font-medium self-center">{profileData.username}</div>
            <div className="text-[14px] font-semibold self-center">{profileData.fullName}</div>
            </div>
          <button onClick={onClose} className=' absolute top-4 right-4'>
            <FaTimes className="text-gray-700" />
          </button>
        </div>
        <div className="py-4">
          <ul className='space-y-1'>
            <li className="flex items-center p-2 hover:bg-gray-100 cursor-pointer">
              <IoPerson className="mr-2 text-gray-600" />
              <span>Edit Profile</span>
            </li>
            <li className="flex items-center p-2 hover:bg-gray-100 cursor-pointer">
              <FaCog className="mr-2 text-gray-600" />
              <span>Settings</span>
            </li>
            <li className="flex items-center p-2 hover:bg-gray-100 cursor-pointer">
            <IoPerson className="mr-2 text-gray-600" />
              <span>Options 1</span>
            </li>
            <li className="flex items-center p-2 hover:bg-gray-100 cursor-pointer">
              <FaCog className="mr-2 text-gray-600" />
              <span>Options 2</span>
            </li>
            <li className="flex items-center p-2 hover:bg-gray-100 cursor-pointer">
            <IoPerson className="mr-2 text-gray-600" />
              <span>Options 3</span>
            </li>
          </ul>
        </div>
        
        <div className="flex fixed bottom-6 left-4 items-center p-2 hover:bg-gray-100 text-red-600 cursor-pointer" onClick={()=>handleLogout()}>
              <FaSignOutAlt className="mr-2 text-red-600" />
              <span>Logout</span>
            </div>
      </div>
    </div>
  );
};

export default Sidebar;
