import React, { useState } from 'react';
import { followUser, unfollowUser } from '../../api/follow'; // Import API functions

const FollowButton = ({ userId, isFollowing, onFollowChange }) => {
  const [loading, setLoading] = useState(false);

  const handleFollowToggle = async () => {
    try {
      setLoading(true);
      if (isFollowing) {
        await unfollowUser(userId); // Call unfollow API
      } else {
        await followUser(userId); // Call follow API
      }
      onFollowChange(); // Notify parent to update state
    } catch (error) {
      console.error('Error updating follow status:', error);
      alert('Failed to update follow status. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <button
      onClick={handleFollowToggle}
      disabled={loading}
      className={`px-6 py-2 font-semibold rounded-md transition duration-300 ease-in-out transform ${
        loading
          ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
          : isFollowing
          ? 'bg-gray-300 text-gray-800 hover:bg-gray-400'
          : 'bg-blue-500 text-white hover:bg-blue-600'
      }`}
    >
      {loading ? 'Processing...' : isFollowing ? 'Unfollow' : 'Follow'}
    </button>
  );
};


export default FollowButton;
