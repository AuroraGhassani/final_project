import axios from 'axios';
import { baseUrl, apiKey, jwtToken, userID } from './api'; // Import konfigurasi API

// Follow User
export const followUser = async (userId) => {
    const config =  {
        headers: {
          apiKey: `c7b411cc-0e7c-4ad1-aa3f-822b00e7734b`,
          Authorization: `Bearer ${jwtToken}`,
          'Content-Type': 'application/json',
        },
      }
      console.log("Following user with ID sblm try catch:", userId); 

  try {
    const response = await axios.post(`${baseUrl}/api/v1/follow`,{userIdFollow: userId}, config);
    console.log('user followed successfully:', response.data);
    return response.data;
  } catch (error) {
    console.error('Error api follow:', error.response?.data || error.message);
    throw error;
  }
};

// Unfollow User
export const unfollowUser = async (userId) => {
  const config =  {
    headers: {
      apiKey: `c7b411cc-0e7c-4ad1-aa3f-822b00e7734b`,
      Authorization: `Bearer ${jwtToken}`,
    },
  }
  console.log("Unfollowing user with ID:", userId);
  try {
    const response = await axios.delete(
      `${baseUrl}/api/v1/unfollow/${userId}`,config);
    // console.log('User unfollowed successfully:', response.data);
    return response.data;
  } catch (error) {
    console.error('Error during unfollow:', error.response?.data || error.message);
    throw error;
  }
};

// Get My Following
export const getMyFollowing = async (size = 10, page = 1) => {
  try {
    const response = await axios.get(
      `${baseUrl}/api/v1/my-following?size=${size}&page=${page}`,
      {
        headers: {
          apiKey: `${apiKey}`,
          Authorization: `Bearer ${jwtToken}`,
        },
      }
    );
    // console.log('My following API:', response.data);
    return response.data;
  } catch (error) {
    console.error('Error fetching my following:', error.response?.data || error.message);
    throw error;
  }
};

// Get My Followers
export const getMyFollowers = async (size = 10, page = 1) => {
  const config = {
    headers: {
      apiKey: `${apiKey}`,
      Authorization: `Bearer ${jwtToken}`,
    },
  }
  try {
    const response = await axios.get(`${baseUrl}/api/v1/my-followers?size=${size}&page=${page}`, config);
    // console.log('My followers API:', response.data.data);
    return response.data;
  } catch (error) {
    console.error('Error fetching my followers:', error.response?.data || error.message);
    throw error;
  }
};

// Get Following by User ID
export const getFollowingByUserId = async (userId, size = 1000, page = 1) => {
    try {
      const response = await axios.get(
        `${baseUrl}/api/v1/following/${userId}?size=${size}&page=${page}`,
        {
          headers: {
            apiKey: `${apiKey}`,
            Authorization: `Bearer ${jwtToken}`,
          },
        }
      );
      // console.log('Following list for user:', response.data);
      return response.data;
    } catch (error) {
      console.error('Error fetching following by user ID:', error.response?.data || error.message);
      throw error;
    }
  };
  
  // Get Followers by User ID
  export const getFollowersByUserId = async (userId, size = 1000, page = 1) => {
    try {
      const response = await axios.get(
        `${baseUrl}/api/v1/followers/${userId}?size=${size}&page=${page}`,
        {
          headers: {
            apiKey: `${apiKey}`,
            Authorization: `Bearer ${jwtToken}`,
          },
        }
      );
      // console.log('Followers list for user:', response.data);
      return response.data;
    } catch (error) {
      console.error('Error fetching followers by user ID:', error.response?.data || error.message);
      throw error;
    }
  };
  