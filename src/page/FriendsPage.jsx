// src/components/FriendsPage.jsx

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { BiSearch } from 'react-icons/bi';
import { Link } from 'react-router-dom';
import Loading from '../components/layout/Loading';
import { useDispatch, useSelector } from 'react-redux';
import { postFollowUser, setFollowedUsers } from '../redux/slice/userSlice';

const FriendsPage = () => {
  const [users, setUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [suggestedUsers, setSuggestedUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  
  const dispatch = useDispatch();

  const data = useSelector(state => state.user);
  const followedUsers = data.followedUsers;
  const followButtonLoadingByUserId = data.followButtonLoadingByUserId;

  useEffect(() => {
    const fetchSuggestedUsers = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_API_URI}/user/getAllUsers`);
        setSuggestedUsers(response.data);
        setIsLoading(false);
        const res = await axios.get(`${import.meta.env.VITE_API_URI}/user/profile/${localStorage.getItem('uid')}`);
        if(res.data.following && res.data.following.length > 0){
          dispatch(setFollowedUsers(res.data.following));
        }

        console.log('data', data);
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

  useEffect(() => {
    if (searchTerm === '') {
      setUsers([]);
    }
    const timer = setTimeout(() => {
      handleSearch();
    }, 500);
    return () => clearTimeout(timer);
  }, [searchTerm]);


  const handleFollow = async (followUserId) => {
    dispatch(postFollowUser({ userId : localStorage.getItem('uid'), followUserId : followUserId }));
  };

  if (isLoading) {
    return <Loading/>;
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
           <Link  to={`/user/profile/${user._id}`} className='flex-1 '>
          <div className="flex">
            <img src={user.profilePicture || '/profile-logo.jpg'} alt={user.fullName} className="w-10 h-10 rounded-full mr-4 object-cover" />
            <div className="">
              <p className="font-medium text-[16px]">{user.fullName}</p>
              <p className="text-[12px] text-gray-500">@{user.username}</p>
            </div>
            </div> 
             </Link>
            <button
              onClick={() => handleFollow(user._id)}
              className="p-1 px-2 text-blue-600 bg-white  hover:text-blue-700 transition-colors text-sm"
            >
                 {followedUsers.includes(user._id) ? 'unfollow' : 'Follow'}
            </button>
          </div>
        ))}
      </div>
      <div className={`${(searchTerm !== "" ? " block " : " hidden ")} absolute top-0 h-full w-full z-10 bg-white`}>
        <h2 className="text-lg font-semibold mb-2">Search Results</h2>
        {users.map((user) => (
          <div  key={user._id} className="flex items-center p-2 border rounded-lg shadow-sm mb-2">
            <Link to={`/user/profile/${user._id}`} className='flex-1'>
          <div className="flex">
          <img src={user.profilePicture || '/profile-logo.jpg'} alt={user.fullName} className="w-10 h-10 rounded-full mr-4 object-cover" />
          <div className="">
            <p className="font-medium text-[16px]">{user.fullName}</p>
            <p className="text-[12px] text-gray-500">@{user.username}</p>
          </div>
          </div>
          </Link>
          <button
              onClick={() => handleFollow(user._id)}
              className="p-1 px-2 text-blue-600 bg-white  hover:bg-blue-700 transition-colors text-sm"
            >
               {followedUsers.includes(user._id) ? 'unfollow' : 'Follow'}
          </button>
        </div>
        ))}
      </div>
      </div>
    </div>
  );
};

export default FriendsPage;
