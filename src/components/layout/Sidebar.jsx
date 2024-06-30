// src/components/Sidebar.js
import React from 'react';
import { FaTimes, FaCog, FaSignOutAlt } from 'react-icons/fa';

const Sidebar = ({ isOpen, onClose }) => {
  return (
    <div className={`fixed inset-0 transition-opacity duration-300 ${isOpen ? 'opacity-100 bg-gray-900 bg-opacity-50' : 'opacity-0 pointer-events-none'}`}>
      <div className={`fixed top-0 left-0 h-full w-64 bg-white shadow-lg transform transition-transform duration-300 ${isOpen ? 'translate-x-0' : '-translate-x-full'}`}>
        <div className="flex justify-between items-center p-4 border-b">
          <h2 className="text-lg font-bold">LiFE NOTES</h2>
          <button onClick={onClose}>
            <FaTimes className="text-gray-700" />
          </button>
        </div>
        <div className="p-4">
          <ul>
            <li className="flex items-center p-2 hover:bg-gray-100 cursor-pointer">
              <FaCog className="mr-2 text-gray-600" />
              <span>Settings</span>
            </li>
            <li className="flex items-center p-2 hover:bg-gray-100 cursor-pointer">
              <FaSignOutAlt className="mr-2 text-gray-600" />
              <span>Logout</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
