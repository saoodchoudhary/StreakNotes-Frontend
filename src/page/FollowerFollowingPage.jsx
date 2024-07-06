import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import BackBtnNavbar from '../components/layout/BackBtnNavbar';
// const followers = [
//     { id: 1, name: 'John Doe', profileImage: 'https://via.placeholder.com/150' },
//     { id: 2, name: 'Jane Smith', profileImage: 'https://via.placeholder.com/150' },
//     // Add more followers
// ];

// const following = [
//     { id: 3, name: 'Emily Johnson', profileImage: 'https://via.placeholder.com/150' },
//     { id: 4, name: 'Michael Brown', profileImage: 'https://via.placeholder.com/150' },
//     // Add more following
// ];
const FollowerFollowingPage = () => {
    const { which, id } = useParams();
    const whichTab = which || 'followers';
    const [activeTab, setActiveTab] = useState(whichTab);
    const [followers, setFollowers] = useState([]);
    const [following, setFollowing] = useState([]);

    useEffect(() => {
        // Fetch followers and following

        const fetchFollowersFollowings = async () => {
            const response = await axios.get(`${import.meta.env.VITE_API_URI}/user/follower-following/${id}`);
            console.log('response', response.data);
            setFollowers(response.data.followers);
            setFollowing(response.data.following);
        }

        fetchFollowersFollowings();

    }
    , []);

    return (
        <div className="flex flex-col items-center bg-gray-100 min-h-screen p-4">
            <BackBtnNavbar text={activeTab === 'followers' ? 'Followers' : 'Following'} />
            <div className="w-full max-w-md bg-white mt-[60px] rounded-lg shadow-md overflow-hidden">
                <div className="flex justify-around border-b">
                    <button
                        className={`w-1/2 p-4 text-center ${
                            activeTab === 'followers' ? 'border-b-2 border-blue-500 text-blue-500' : 'text-gray-500'
                        }`}
                        onClick={() => setActiveTab('followers')}
                    >
                        Followers
                    </button>
                    <button
                        className={`w-1/2 p-4 text-center ${
                            activeTab === 'following' ? 'border-b-2 border-blue-500 text-blue-500' : 'text-gray-500'
                        }`}
                        onClick={() => setActiveTab('following')}
                    >
                        Following
                    </button>
                </div>

                <div className="p-4">
                    {activeTab === 'followers' ? (
                        <ul>
                            {followers.map((follower) => (
                                <li key={follower.id} className="flex items-center py-2 border-b">
                                    <img src={"/profile-logo.jpg"} alt={follower.fullName} className="w-10 h-10 rounded-full mr-3 object-cover" />
                                    <span>{follower.fullName}</span>
                                </li>
                            ))}
                        </ul>
                    ) : (
                        <ul>
                            {following.map((followed) => (
                                <li key={followed._id} className="flex items-center py-2 border-b">
                                    <img src={"/profile-logo.jpg"} alt={followed.fullName} className="w-10 h-10 rounded-full mr-3 object-cover" />
                                    <span>{followed.fullName}</span>
                                </li>
                            ))}
                        </ul>
                    )}
                </div>
            </div>
        </div>
    );
};

export default FollowerFollowingPage;
