import axios from 'axios';
import { baseUrl, apiKey, jwtToken } from './api'; 

// Create Comment
export const createComment = async (postId, commentText) => {
    let jwtToken = localStorage.getItem("jwtToken");
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
        // console.log('Comment created successfully:', response.data);
        const newComment = response.data;
        return newComment; 
    } catch (error) {
        console.error('Error creating comment:', error.response?.data || error.message);
        throw error; 
    }
};


// Delete Comment
export const deleteComment = async (commentId) => {
    let jwtToken = localStorage.getItem("jwtToken");
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
        return response.data; 
    } catch (error) {
        console.error('Error deleting comment:', error.response?.data || error.message);
        throw error;
    }
};
