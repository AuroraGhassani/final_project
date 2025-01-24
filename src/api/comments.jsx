import axios from 'axios';
import { baseUrl, apiKey, jwtToken } from './api'; // Import base URL dan API key

// Create Comment
export const createComment = async (postId, commentText) => {
    try {
        const response = await axios.post(
            `${baseUrl}/api/v1/create-comment`,
            { postId, comment: commentText },
            {
                headers: {
                    apiKey: `${apiKey}`,
                    Authorization: `Bearer ${jwtToken}`,
                },
            }
        );
        
        console.log('Comment created successfully:', response.data);

        // Assuming the API returns the new comment data including the id
        const newComment = response.data; // Replace this with the actual structure of the response

        // Return the new comment along with its id
        return newComment; 
    } catch (error) {
        console.error('Error creating comment:', error.response?.data || error.message);
        throw error; // Throw error for further handling
    }
};


// Delete Comment
export const deleteComment = async (commentId) => {
    try {
        const response = await axios.delete(
            `${baseUrl}/api/v1/delete-comment/${commentId}`,
            {
                headers: {
                    apiKey: `${apiKey}`,
                    Authorization: `Bearer ${jwtToken}`,
                },
            }
        );
        console.log('Comment deleted successfully:', response.data);
        return response.data; // Return response data
    } catch (error) {
        console.error('Error deleting comment:', error.response?.data || error.message);
        throw error; // Throw error for further handling
    }
};
