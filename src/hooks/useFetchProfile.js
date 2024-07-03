import { useEffect, useState } from "react";
import axios from "axios";

const useFetchProfile = () => {
  const [profileData, setProfileData] = useState({
    fullName: "",
    username: "",
    followers: 0,
    following: 0,
    streaks: 0,
    score: 0,
    profileType: "",
    profileImage: "",
    profileBannerImage: "",
    totalNotes: 0,
    createdAt: "",
    updatedAt: "",
  });

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProfileData = async () => {
      try {
        const uid = localStorage.getItem('uid');
        const response = await axios.get(`${import.meta.env.VITE_API_URI}/user/profile/${uid}`);
        const data = response.data;
        setProfileData(data);
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };
    fetchProfileData();
  }, []);

  return { profileData, loading, error };
};

export default useFetchProfile;
