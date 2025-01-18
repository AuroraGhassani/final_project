import { apiClient } from './api';
import axios from 'axios';
import { baseUrl, jwtToken, apiKey } from './api';
import { userID } from './api';

// Create Post
export const createPost = async (postData) => {
    try {
        const response = await apiClient.post('/api/v1/create-post', postData);
        return response.data;
    } catch (error) {
        console.error('Error creating post:', error.response?.data || error.message);
        throw error;
    }
};

// Get Posts by User ID
export const getUserPosts = async () => {
    const config = {
        headers: {
            Authorization: `Bearer ${jwtToken}`,
            apiKey: `${apiKey}`,
        },
    };

    try {
        const response = await axios.get(`${baseUrl}/api/v1/users-post/${userID}?size=10&page=1`, config);
        return response.data.data.posts;
    } catch (error) {
        console.error("Error fetching posts:", error.response?.data || error.message);
        throw error;
    }
};



// Update Post
export const updatePost = async (postId, updatedData) => {
    const config = {
        headers: {
            apiKey: `${apiKey}`,
            Authorization: `Bearer ${jwtToken}`,
        },
    };

    try {
        const response = await axios.post(`${baseUrl}/api/v1/update-post/${postId}`, updatedData, config);
        console.log(response);
        return response.data; 
    } catch (error) {
        console.error('Error in API:', error.response?.data || error.message);
        throw error; 
    }
};


// Delete Post
export const deletePost = async (postId) => {
    const config = {
        headers: {
            apiKey: `${apiKey}`,
            Authorization: `Bearer ${jwtToken}`,
        },
    };

    try {
        const response = await axios.delete(`${baseUrl}/api/v1/delete-post/${postId}`, config);
        return response.data; 
    } catch (error) {
        console.error('Error deleting post:', error.response?.data || error.message);
        throw error; 
    }
};

// Get Explore Posts
export const getExplorePosts = async (page = 1, size = 10) => {
    const config = {
        headers: {
            Authorization: `Bearer ${jwtToken}`,
            apiKey: `${apiKey}`,
        },
    };

    try {
        const response = await axios.get(`${baseUrl}/api/v1/explore-posts?size=${size}&page=${page}`, config);
        return response.data.data.posts; 
    } catch (error) {
        console.error('Error fetching explore posts:', error.response?.data || error.message);
        throw error; 
    }
};

// get post by id
export const getPostById = async (id) => {
    const config = {
        headers: {
            apiKey: `${apiKey}`,
            Authorization: `Bearer ${jwtToken}`,
        },
    };

    try {
        const response = await axios.get(`${baseUrl}/api/v1/post/${id}`, config);
        return response.data.data;
        // console.log( "Data get post by id:", response.data.data);
    } catch (error) {
        console.error('Error fetching post by ID:', error.response?.data || error.message);
        throw error;
    }
};

// Get My Following Posts
export const getMyFollowingPosts = async (page = 1, size = 10) => {
    const config = {
        headers: {
            Authorization: `Bearer ${jwtToken}`,
            apiKey: `${apiKey}`,
        },
    };

    try {
        const response = await axios.get(`${baseUrl}/api/v1/my-following-posts?size=${size}&page=${page}`, config);
        return response.data.data.posts; 
    } catch (error) {
        console.error('Error fetching following posts:', error.response?.data || error.message);
        throw error; 
    }
};