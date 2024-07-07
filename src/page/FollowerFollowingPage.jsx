import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import BackBtnNavbar from '../components/layout/BackBtnNavbar';

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
        <div className="flex flex-col items-center bg-gray-50 min-h-screen "
        onLoad={()=> window.scroll(0 , 0)}>
            <BackBtnNavbar text={activeTab === 'followers' ? 'Followers' : 'Following'} />
            <div className="w-full max-w-md bg-white mt-[60px] rounded-lg shadow-md px-4 min-h-screen overflow-hidden">
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

                <div className="py-4 px-2">
                    {activeTab === 'followers' ? (
                        <div>
                            {followers && followers.map((follower) => (
                                <Link to={`/user/profile/${follower._id}`} key={follower._id} className="flex items-center py-2 border-b px-1">
                                    <img src={"/profile-logo.jpg"} alt={follower.fullName} className="w-10 h-10 rounded-full mr-3 object-cover" />
                                    <span>{follower.fullName}</span>
                                </Link>
                            ))}
                            {followers.length === 0 && <p className="text-center py-2">No followers yet</p>}
                        </div>
                    ) : (
                        <div>
                            {following && following.map((followed) => (
                                <Link to={`/user/profile/${followed._id}`} key={followed._id} className="flex items-center py-2 border-b">
                                    <img src={"/profile-logo.jpg"} alt={followed.fullName} className="w-10 h-10 rounded-full mr-3 object-cover" />
                                    <span>{followed.fullName}</span>
                                </Link>
                            ))}
                            {following.length === 0 && <p className="text-center py-2">No following yet</p>}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default FollowerFollowingPage;
