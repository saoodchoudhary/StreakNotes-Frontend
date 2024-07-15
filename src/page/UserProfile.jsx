import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { FaUserFriends, FaNotesMedical, FaUser, FaStar, FaTrophy } from 'react-icons/fa';
import 'tailwindcss/tailwind.css';
import useFetchProfile from '../hooks/useFetchProfile';
import { Link, useParams } from 'react-router-dom';
import BackBtnNavbar from '../components/layout/BackBtnNavbar';
import { IoAdd } from 'react-icons/io5';
import Loading from '../components/layout/Loading';
import { useDispatch, useSelector } from 'react-redux';
import { fetchSuggestionsFriends, fetchUsers, postFollowUser } from '../redux/slice/userSlice';


const achievementImagesAndName = [
    { achievementName: "First Streak", image: "/icon/first-streak.svg" },
    { achievementName: "Week Streak", image: "/icon/week-streak.svg" },
    { achievementName: "Month Streak", image: "/icon/month-streak.svg" },
    { achievementName: "100 Days Streak", image: "/icon/100-days-streak.svg" },
    { achievementName: "Streak Master", image: "/icon/streak-master.png" },
    { achievementName: "Collaborator", image: "/icon/collaborator.svg" },
    { achievementName: "Note Creator", image: "/icon/notes-creator.svg" },
    { achievementName: "Note Master", image: "/icon/notes-master.png" }
  ];


const UserProfile = () => {
    const {id} = useParams();
  const profileImage = '/profile-logo.jpg';
  const bannerImage = '/profile-banner.jpg';
  // const [suggestionsFriends, setSuggestionsFriends] = useState([]);


  // const [followButtonLoadingByUserId, setFollowButtonLoadingByUserId] = useState([]);
  // const [followedUsers, setFollowedUsers] = useState([]);
  //   const [profileData, setProfileData] = useState({});
    const [isFollowStatus, setIsFollowStatus] = useState(false);

    const dispatch = useDispatch();
    const data = useSelector(state => state.user);
    const profileData = data.currentUser;
    const suggestionsFriends = data.users || [];
    const followedUsers = data.followedUsers;
    console.log('followedUsers', followedUsers);
    const followButtonLoadingByUserId = data.followButtonLoadingByUserId;

    

  console.log(profileData);

  const handleFollowUser = async (followUserId) => {
    dispatch(postFollowUser({ userId : localStorage.getItem('uid'), followUserId }));
    console.log('followUser', followedUsers);
  };

    useEffect(() => {
      dispatch(fetchUsers( {userId: id}));
      dispatch(fetchSuggestionsFriends( {userId: id}));
    }, [id]);

  if (!profileData) {
    return <Loading />;
  }
  const unlockedAchievements = profileData.achievements || [];
  const achievements = achievementImagesAndName.map((achievement) => ({
    ...achievement,
    unlocked: unlockedAchievements.includes(achievement.achievementName),
  }));


  return (
    <div className="min-h-screen mt-[60px] bg-gray-100 flex flex-col items-center"
    onLoad={()=> window.scroll(0 , 0)}>
        <BackBtnNavbar text="Profile" />
      <div className=" w-full">
        <div className='absolute top-[60px] right-0 bg-gray-500 z-10 text-[10px] px-3 py-1 bg-gradient-to-r to-gray-100  from-transparent'>Joined 24-02-2024</div>
        <img src={bannerImage} alt="Banner" className="w-full h-[150px] object-cover" />
      </div>
      <div className="w-full bg-white shadow-md rounded-lg  px-4 pb-8">
        <div className="flex gap-[20px] mb-4">
          <img src={profileImage} alt="Profile" className="w-[100px] h-[100px] rounded-full border-4 border-white -mt-7 object-cover" />
          <div className="mt-2">
            <h1 className="text-xl font-semibold">{profileData.fullName}</h1>
            <p className="text-gray-600 text-[12px]">@{profileData.username}</p>
          </div>
        </div>
        
        <div className="flex justify-around items-center mb-8">
          <Link to={`/profile/follower-following/followers/${id}`} className="flex items-center">
            <FaUserFriends className="text-green-500 mr-2" />
            <span>Followers { data.followers.length }</span>
          </Link>
          <Link to={`/profile/follower-following/following/${id}`} className="flex items-center">
            <FaUser className="text-yellow-500 mr-2" />
            <span>Following {data.following.length }</span>
          </Link>
        </div>
        {/* follow button */}
        <div className="mb-6">
        {followedUsers.includes(id) ? (
            <button onClick={()=> handleFollowUser(id)} className="bg-blue-500 text-white px-4 py-2 rounded-full w-full flex justify-center">
                Unfollow
            </button>
        ) : (
            <button onClick={()=> handleFollowUser(id)} className="text-blue-500 bg-white px-4 py-2 rounded-full w-full flex justify-center border border-blue-500">
                Follow
            </button>
        )}
            </div>
       
        <div className="mb-6 flex bg-white shadow-sm border  rounded-sm justify-around px-2 text-black py-4 text-center">
          <div className="flex flex-col gap-1 py-1 items-center justify-center ">
            <div className='flex'><FaNotesMedical className="text-gray-600 mr-1 self-center" /> Notes</div>
            <span>{profileData.notes && profileData.notes.length}</span>
          </div>
          <div className='rounded-md bg-gray-300 w-[2px]'></div>
          <div className="flex flex-col gap-1 items-center justify-center">
            <div className='flex'><FaStar className="text-gray-600 mr-1 self-center" /> Streak</div>
            <span>{ data.streak}</span>
          </div>
          <div className='rounded-md bg-gray-300 w-[2px]'></div>
          <div className="flex flex-col gap-1 items-center justify-center">
            <div className='flex'><FaTrophy className="text-gray-600 mr-1 self-center" /> Score</div>
            <span>{profileData.score}</span>
          </div>
        </div>
        <div className="mb-6">
          <h2 className="text-xl font-semibold mb-2">Achievements</h2>
          <div className="overflow-x-auto whitespace-nowrap no-scrollbar">
            {achievements.map((achievement, index) => (
               <div key={index} className="inline-flex justify-center p-2">
               <div className={`flex justify-center flex-col rounded-lg shadow p-4 ${achievement.unlocked ? 'bg-gray-200' : 'bg-gray-100'}`} style={{ filter: achievement.unlocked ? 'none' : 'grayscale(100%)' }}>
                 <img src={achievement.image} alt={achievement.achievementName} className="mb-2 self-center h-[80px]" />
                 <p className='text-[13px] text-center'>{achievement.achievementName}</p>
               </div>
             </div>
            ))}
          </div>
        </div>
        <div>
        </div>
        <div>
          <h2 className="text-xl font-semibold mb-2">Suggested Friends</h2>
          <div className="overflow-x-auto p-1 whitespace-nowrap no-scrollbar">
            {suggestionsFriends.map((friend) => {

                if(friend._id === localStorage.getItem('uid')){
                    return null;
                }
                
                return(
              <div key={friend._id} className=" rounded-lg inline-block w-[136px] mr-3 py-4 bg-gray-100 shadow">
                <div className="flex flex-col items-center justify-center text-center">
                  <img src={"/profile-logo.jpg"} alt="Friend" className="w-12 h-12 rounded-full self-center border border-white object-cover" />
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
                    className={`bg-white self-center text-blue-600 border border-blue-500 px-4 py-1 mt-2 text-sm rounded-full`}
                   
                  >
                    {followedUsers.includes(friend._id) ? 'unfollow' : 'Follow'}
                  </button>
                  )}
                </div>
              </div>
            )})}
          </div>
        </div>
      </div>
    </div>
  );
};


export default UserProfile
