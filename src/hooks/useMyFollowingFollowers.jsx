import { useState, useEffect } from 'react';
import { getMyFollowers, getMyFollowing } from '../api/follow'; // Import the API functions

const useMyFollowingFollowers = () => {
  const [followers, setFollowers] = useState([]);
  const [following, setFollowing] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchFollowingAndFollowers = async () => {
    setLoading(true);

    try {
      const followersData = await getMyFollowers();
      const followingData = await getMyFollowing();

      setFollowers(followersData.data.users); // Update followers
      setFollowing(followingData.data.users); // Update following
    } catch (err) {
      setError('Error fetching following and followers');
    } finally {
      setLoading(false);
    }
  };

  // Function to update the "following" list (e.g., when a user unfollows someone)
  const handleUnfollow = (userId) => {
    setFollowing((prevFollowing) =>
      prevFollowing.filter((user) => user.id !== userId)
    );
  };

  // Function to add someone to the "following" list (optional)
  const handleFollow = (newUser) => {
    setFollowing((prevFollowing) => [...prevFollowing, newUser]);
  };

  useEffect(() => {
    fetchFollowingAndFollowers();
  }, []);

  return {
    followers,
    following,
    loading,
    error,
    handleUnfollow, // Function to remove a user from the following list
    handleFollow,   // Optional: Add a user to the following list
  };
};

export default useMyFollowingFollowers;
