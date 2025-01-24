// hooks/useFollowingAndFollowers.js
import { useState, useEffect } from 'react';
import { getFollowersByUserId, getFollowingByUserId } from '../api/follow'; // Import the API functions
import { useParams } from 'react-router-dom';

const useFollowingAndFollowers = () => {
  const {id} = useParams();
  const [followers, setFollowers] = useState([]);
  const [following, setFollowing] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  const fetchFollowingAndFollowers = async () => {

    // console.log("ini useparam:", id);

    if (!id) return;

    setLoading(true); 

    try {
      const followersData = await getFollowersByUserId(id);
      const followingData = await getFollowingByUserId(id);

      setFollowers(followersData.data.users); // Update followers
      setFollowing(followingData.data.users); // Update following
      // console.log("ini data followers hooks:", followersData);
      // console.log("ini data following hooks:", followingData);

    } catch (err) {
      setError('Error fetching following and followers');
    }finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchFollowingAndFollowers();
  }, [id]);

  return {
    followers,
    following,
    loading,
    error,
  };
};

export default useFollowingAndFollowers;
