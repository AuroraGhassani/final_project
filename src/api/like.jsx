import axios from 'axios';
import { baseUrl, apiKey, jwtToken } from './api'; // Import base URL dan API key

// Like Post
export const likePost = async (postId) => {
    try {
        const response = await axios.post(`${baseUrl}/api/v1/like`, { postId }, {
            headers: {
                apiKey: `${apiKey}`,
                Authorization: `Bearer ${jwtToken}`,
            },
        });
        console.log('Post liked successfully:', response.data);
        return response.data; // Return response data
    } catch (error) {
        console.error('Error liking post:', error.response?.data || error.message);
        throw error; // Throw error for further handling
    }
};

// Unlike Post
export const unlikePost = async (postId) => {
    try {
        const response = await axios.post(`${baseUrl}/api/v1/unlike`, { postId }, {
            headers: {
                apiKey: `${apiKey}`,
                Authorization: `Bearer ${jwtToken}`,
            },
        });
        console.log('Post unliked successfully:', response.data);
        return response.data; // Return response data
    } catch (error) {
        console.error('Error unliking post:', error.response?.data || error.message);
        throw error; // Throw error for further handling
    }
};
