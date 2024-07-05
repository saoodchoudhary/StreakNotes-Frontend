import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { FaUserFriends, FaNotesMedical, FaUser, FaStar, FaTrophy } from 'react-icons/fa';
import 'tailwindcss/tailwind.css';
import useFetchProfile from '../hooks/useFetchProfile';

const Achievement = [
  {
    id: 1,
    name: 'Achievement 1',
    icon: 'https://via.placeholder.com/50',
  },
  {
    id: 2,
    name: 'Achievement 2',
    icon: 'https://via.placeholder.com/50',
  },
  {
    id: 3,
    name: 'Achievement 3',
    icon: 'https://via.placeholder.com/50',
  },
];

const Profile = () => {
  const profileImage = '/profile-logo.jpg';
  const bannerImage = '/profile-banner.jpg';
  const [suggestionsFriends, setSuggestionsFriends] = useState([]);
  const { profileData, loading, error } = useFetchProfile();
  const [followButtonLoadingByUserId, setFollowButtonLoadingByUserId] = useState([]);
  const [followedUsers, setFollowedUsers] = useState([]);

  console.log(profileData);

  const handleFollowUser = async (followUserId) => {
    setFollowButtonLoadingByUserId((prev) => [...prev, followUserId]);
    console.log(followButtonLoadingByUserId)
    try {
      const response = await axios.post(`${import.meta.env.VITE_API_URI}/user/follow`, {
        userId: localStorage.getItem('uid'),
        followUserId,
      });
      setFollowButtonLoadingByUserId((prev) => prev.filter((id) => id !== followUserId));
      setFollowedUsers((prev) => [...prev, followUserId]);
      console.log(response.data);
    } catch (err) {
      setFollowButtonLoadingByUserId((prev) => prev.filter((id) => id !== followUserId));
      console.error(err);
    }
  };

  useEffect(() => {
    const fetchSuggestionsFriends = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_API_URI}/user/getSuggestionsUser/${localStorage.getItem('uid')}`);
        setSuggestionsFriends(response.data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchSuggestionsFriends();
  }, []);

  if (!profileData) {
    return <div>Loading...</div>;
  }

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center pb-[50px]">
      <div className=" w-full">
        <div className='absolute top-[60px] right-0 bg-gray-500 z-10 text-[10px] px-3 py-1 bg-gradient-to-r to-gray-100  from-transparent'>Joined 24-02-2024</div>
        <img src={bannerImage} alt="Banner" className="w-full h-[150px] object-cover" />
      </div>
      <div className="w-full bg-white shadow-md rounded-lg  mb-6 px-4 pb-4">
        <div className="flex gap-[20px] mb-4">
          <img src={profileImage} alt="Profile" className="w-[100px] h-[100px] rounded-full border-4 border-white -mt-7 object-cover" />
          <div className="mt-2">
            <h1 className="text-xl font-semibold">{profileData.fullName}</h1>
            <p className="text-gray-600 text-[12px]">@{profileData.username}</p>
          </div>
        </div>
        
        <div className="flex justify-around items-center mb-8">
          <div className="flex items-center">
            <FaUserFriends className="text-green-500 mr-2" />
            <span>Followers {profileData.followers}</span>
          </div>
          <div className="flex items-center">
            <FaUser className="text-yellow-500 mr-2" />
            <span>Following {profileData.following}</span>
          </div>
        </div>
        <div className="mb-6 flex bg-cyan-800 rounded-sm justify-around px-2 text-white py-4 text-center">
          <div className="flex flex-col gap-1 py-1 items-center justify-center ">
            <div className='flex'>  <FaNotesMedical className="text-white mr-1 self-center" /> Notes</div>
            <span>{profileData.totalNotes}</span>
          </div>
          <div className='rounded-md bg-white w-[2px]'></div>
          <div className="flex flex-col  gap-1 items-center justify-center">
            <div className='flex'>  <FaStar className="text-white mr-1 self-center" /> Streak</div>
            <span> {profileData.streaks}</span>
          </div>
          <div className='rounded-md bg-white w-[2px]'></div>
          <div className="flex flex-col  gap-1 items-center justify-center">
            <div className='flex'>  <FaTrophy className="text-white mr-1 self-center" /> Score</div>
            <span>{profileData.score}</span>
          </div>
        </div>
        <div className="mb-6">
          <h2 className="text-xl font-semibold mb-2">Achievements</h2>
          <div className="overflow-x-auto whitespace-nowrap no-scrollbar">
            {Achievement.map((achievement) => (
              <div key={achievement.id} className="inline-block p-2">
                <div className="bg-gray-200 rounded-lg p-4">
                  <FaTrophy className="text-purple-500 mb-2" />
                  <p>{achievement.name}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div>
          <h2 className="text-xl font-semibold mb-2">Suggested Friends</h2>
          <div className="overflow-x-auto whitespace-nowrap no-scrollbar">
            {suggestionsFriends.map((friend) => (
              <div key={friend._id} className=" rounded-lg inline-block w-[136px] mr-3 py-4 bg-gray-200">
                <div className="flex flex-col items-center justify-center text-center">
                  <img src={friend.image} alt="Friend" className="w-12 h-12 rounded-full self-center border border-white object-cover" />
                  <div>
                    <p className="font-semibold mt-1 text-[14px]">{friend.fullName}</p>
                    <p className="text-gray-600 text-[12px]">@{friend.username}</p>
                  </div>
                  {followButtonLoadingByUserId.includes(friend._id) ? (
                    <div className='bg-white  self-center text-blue-600 border border-blue-500 px-4 py-1 rounded-full mt-2'>
                      <div className='h-[14px] w-[14px] rounded-full border-[2px] border-blue-500 border-t-transparent animate-spin '></div>
                    </div>
                  ) : (
                    <button
                      onClick={() => handleFollowUser(friend._id)}
                      className={`bg-white self-center text-blue-600 border border-blue-500 px-4 py-1 mt-2 text-sm rounded-full ${
                        followedUsers.includes(friend._id) ? 'cursor-default' : ''
                      }`}
                      disabled={followedUsers.includes(friend._id)}
                    >
                      {followedUsers.includes(friend._id) ? 'Followed' : 'Follow'}
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
