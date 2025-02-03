import React, { useState, useEffect } from 'react';
import { followUser, unfollowUser } from '../../api/follow';

  const FollowButton = ({ userId, isFollowing, onFollowChange }) => {
  const [loading, setLoading] = useState(false);

  const handleFollowToggle = async () => {
    try {
      setLoading(true);
    
      if (isFollowing) {
        await unfollowUser(userId);
      } else {
        await followUser(userId);
      }
    
      // console.log("Changing follow status to:", !isFollowing);
      onFollowChange(!isFollowing); // Kirim status baru ke parent component

    } catch (error) {
      console.error('Error updating follow status:', error);

    } finally {
      setLoading(false);
    }
  };

  return (
    <button
      onClick={handleFollowToggle}
      disabled={loading}
      className={`px-4 py-2 mt-4 font-semibold rounded-md transition duration-300 ease-in-out transform 
        ${
        loading
          ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
          : isFollowing
          ? 'bg-gray-400 text-gray-800 hover:bg-gray-500'
          : 'bg-emerald-500 text-white hover:bg-emerald-600'
      }`}
    >
      {loading ? 'Processing...' : isFollowing ? 'Unfollow' : 'Follow'}
    </button>
  );
};

export default FollowButton;
