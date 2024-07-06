// src/components/FriendsPage.jsx

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { BiSearch } from 'react-icons/bi';

const FriendsPage = () => {
  const [users, setUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [suggestedUsers, setSuggestedUsers] = useState([]);
  const [isFollowStatus, setIsFollowStatus] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchSuggestedUsers = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_API_URI}/user/someUser/${localStorage.getItem('uid')}`);
        console.log('response', response.data);
        setSuggestedUsers(response.data);
        setIsLoading(false);
      } catch (error) {
        console.error('Error fetching suggested users:', error);
      }
    };

    fetchSuggestedUsers();
  }, []);

  const handleSearch = async () => {
    try {
      const response = await axios.get(`${import.meta.env.VITE_API_URI}/user/search`, { params: { term: searchTerm } });
      setUsers(response.data);
    } catch (error) {
      console.error('Error searching users:', error);
    }
  };

  const handleFollow = async (userId) => {
    try {
      await axios.post(`${import.meta.env.VITE_API_URI}/user/follow`, { userId: localStorage.getItem('uid'), followUserId: userId });
      setIsFollowStatus(prev => ({ ...prev, [userId]: true }));

    } catch (error) {
      console.error('Error following user:', error);
    }
  };

  if (isLoading) {
    return <p>Loading...</p>;
  }

  return (
    <div style={{minHeight : "calc(100vh - 108px)"}} className="bg-white p-4 pb-20 max-w-md">
      <div className="mb-4 flex border rounded-sm pr-3">
        <input
          type="text"
          placeholder="Search users..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full px-3 py-2 text-sm outline-none  rounded-lg shadow-sm"
        />
        <BiSearch 
          onClick={handleSearch} className=" self-center w-5 h-5 text-gray-400 " />
      </div>
      <div className='relative'>
      <div className="  mb-6">
        <h2 className="text-lg font-semibold mb-2">Suggested Users</h2>
        { suggestedUsers && suggestedUsers.map((user) => (
          <div key={user._id} className="flex items-center p-2 border rounded-lg shadow-sm mb-2">
            <div className="flex-1 flex">
            <img src={user.profilePicture || '/profile-logo.jpg'} alt={user.fullName} className="w-10 h-10 rounded-full mr-4 object-cover" />
            <div className="">
              <p className="font-medium text-[16px]">{user.fullName}</p>
              <p className="text-[12px] text-gray-500">@{user.username}</p>
            </div>
            </div>
            <button
              onClick={() => handleFollow(user._id)}
              className="p-1 px-4 bg-blue-600 text-white rounded-lg shadow hover:bg-blue-700 transition-colors text-sm"
            >
                {isFollowStatus[user._id] ? 'Followed' : 'Follow'}
            </button>
          </div>
        ))}
      </div>
      <div className={`${(searchTerm !== "" ? " block " : " hidden ")} absolute top-0 h-full w-full z-10 bg-white`}>
        <h2 className="text-lg font-semibold mb-2">Search Results</h2>
        {users.map((user) => (
          <div key={user._id} className="flex items-center p-2 border rounded-lg shadow-sm mb-2">
            <img src={user.profilePicture || '/profile-logo.jpg'} alt={user.fullName} className="w-10 h-10 rounded-full mr-4 object-cover" />
            <div className="flex-1">
              <p className="font-medium">{user.fullName}</p>
              <p className="text-sm text-gray-500">{user.mutualFriends} mutual friends</p>
            </div>
            <button
              onClick={() => handleFollow(user._id)}
              className="p-2 bg-blue-600 text-white rounded-lg shadow hover:bg-blue-700 transition-colors"
            >
                {isFollowStatus[user._id] ? 'Followed' : 'Follow'}
            </button>
          </div>
        ))}
      </div>
      </div>
    </div>
  );
};

export default FriendsPage;
