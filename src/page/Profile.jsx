import React from 'react';
import { FaUserFriends, FaNotesMedical, FaUser, FaStar, FaTrophy } from 'react-icons/fa';
import 'tailwindcss/tailwind.css';

const suggestionsFriends = [
  {
    id: 1,
    name: 'Jane Smith',
    username: 'janesmith',
    image: 'https://via.placeholder.com/50',
  },
  {
    id: 2,
    name: 'John Doe',
    username: 'johndoe',
    image: 'https://via.placeholder.com/50',
  },
  {
    id: 3,
    name: 'Alice Johnson',
    username: 'alicejohnson',
    image: 'https://via.placeholder.com/50',
  },
  {
    id: 4,
    name: 'Bob Brown',
    username: 'bobbrown',
    image: 'https://via.placeholder.com/50',
  },
  {
    id: 5,
    name: 'Charlie White',
    username: 'charliewhite',
    image: 'https://via.placeholder.com/50',
  },
];

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
]

const Profile = () => {
  const profileImage = '/profile-logo.jpg';
  const bannerImage = '/profile-banner.jpg';

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center pb-[50px]">
      <div className="w-full">
        <img src={bannerImage} alt="Banner" className="w-full h-56 object-cover" />
      </div>
      <div className="w-11/12 md:w-3/4 lg:w-1/2 bg-white shadow-md rounded-lg -mt-20 mb-6 p-4">
        <div className="flex justify-center mb-4">
          <img src={profileImage} alt="Profile" className="w-32 h-32 rounded-full border-4 border-white -mt-16 object-cover" />
        </div>
        <div className="text-center mb-4">
          <h1 className="text-2xl font-bold">John Doe</h1>
          <p className="text-gray-600">@johndoe</p>
        </div>
        <div className="flex justify-around items-center mb-4">
          
          <div className="flex items-center">
            <FaUserFriends className="text-green-500 mr-2" />
            <span>Followers: 300</span>
          </div>
          <div className="flex items-center">
            <FaUser className="text-yellow-500 mr-2" />
            <span>Following: 180</span>
          </div>
        </div>
        <div className="mb-6">
        <div className="flex items-center justify-center">
            <FaNotesMedical className="text-blue-500 mr-2" />
            <span>Total Notes: 120</span>
          </div>
        </div>
        <div className="mb-6">
          <h2 className="text-xl font-semibold mb-2">Statistic</h2>
        <div className="flex justify-around items-center mb-4">
          <div className="flex items-center">
            <FaStar className="text-red-500 mr-2" />
            <span>Streak: 45</span>
          </div>
          <div className="flex items-center">
            <FaTrophy className="text-purple-500 mr-2" />
            <span>Score: 1500</span>
          </div>
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
            {/* <div className="inline-block w-1/2 p-2">
              <div className="bg-gray-200 rounded-lg p-4">
                <FaTrophy className="text-purple-500 mb-2" />
                <p>Achievement 1</p>
              </div>
            </div>
            <div className="inline-block w-1/2 p-2">
              <div className="bg-gray-200 rounded-lg p-4">
                <FaTrophy className="text-purple-500 mb-2" />
                <p>Achievement 2</p>
              </div>
            </div>
            <div className="inline-block w-1/2 p-2">
              <div className="bg-gray-200 rounded-lg p-4">
                <FaTrophy className="text-purple-500 mb-2" />
                <p>Achievement 2</p>
              </div>
            </div> */}
          </div>
        </div>
        <div>
          <h2 className="text-xl font-semibold mb-2">Suggested Friends</h2>
          <div className="overflow-x-auto whitespace-nowrap no-scrollbar">
            {suggestionsFriends.map((friend) => (
              <div key={friend.id} className=" rounded-lg inline-block w-[136px] mr-3 py-4 bg-gray-200">
                <div className="flex flex-col items-center justify-center text-center">
                  <img src={friend.image} alt="Friend" className="w-12 h-12 rounded-full self-center" />
                  <div>
                    <p className="font-semibold mt-1 text-[14px]">{friend.name}</p>
                    <p className="text-gray-600 text-[12px]">@{friend.username}</p>
                  </div>
                  <button className="bg-white  self-center text-blue-600 border border-blue-500 px-4 py-1 mt-2 text-sm rounded-full">Follow</button>
                </div>
              </div>
            ))}
            {/* <div className="inline-block w-1/2 p-2">
              <div className="bg-gray-200 rounded-lg p-4 flex flex-col items-center justify-center">
                <img src="https://via.placeholder.com/50" alt="Friend" className="w-12 h-12 rounded-full self-center" />
                <div>
                  <p className="font-semibold mt-1">Jane Smith</p>
                  <p className="text-gray-600">@janesmith</p>
                </div>
              </div>
            </div> */}
            {/* Add more suggested friends as needed */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
