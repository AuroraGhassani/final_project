import axios from 'axios';
import { baseUrl, jwtToken, apiKey, apiClient } from './api';

// Create Story
export const createStory = async (storyData) => {
    const config = {
        headers: {
            apiKey: `${apiKey}`,
            Authorization: `Bearer ${jwtToken}`,
        },
    };

    try {
        const response = await axios.post(`${baseUrl}/api/v1/create-story`, storyData, config);
        return response.data.data;
    } catch (error) {
        console.error('Error creating story:', error.response?.data || error.message);
        throw error;
    }
};

// Delete Story
export const deleteStory = async (storyId) => {
    const config = {
        headers: {
            apiKey: `${apiKey}`,
            Authorization: `Bearer ${jwtToken}`,
        },
    };

    try {
        const response = await axios.delete(`${baseUrl}/api/v1/delete-story/${storyId}`, config);
        return response.data.data;
    } catch (error) {
        console.error('Error deleting story:', error.response?.data || error.message);
        throw error;
    }
};

// Get Story By ID
export const getStoryById = async (storyId) => {
    const config = {
        headers: {
            apiKey: `${apiKey}`,
            Authorization: `Bearer ${jwtToken}`,
        },
    };

    try {
        const response = await axios.get(`${baseUrl}/api/v1/story/${storyId}`, config);
        return response.data.data;
    } catch (error) {
        console.error('Error fetching story by ID:', error.response?.data || error.message);
        throw error;
    }
};

// Get Story Views By Story ID
export const getStoryViewsById = async (storyId) => {
    const config = {
        headers: {
            apiKey: `${apiKey}`,
            Authorization: `Bearer ${jwtToken}`,
        },
    };

    try {
        const response = await axios.get(`${baseUrl}/api/v1/story-views/${storyId}`, config);
        return response.data.data;
    } catch (error) {
        console.error('Error fetching story views:', error.response?.data || error.message);
        throw error;
    }
};

// Get My Following Stories
export const getMyFollowingStories = async (page = 1, size = 10) => {

    try {
       const response = await apiClient.get(`/api/v1/following-story?page=${page}&size=${size}`);
        // console.log("result in api:", response.data);
        return response.data;
    } catch (error) {
        console.error('Error fetching api followingStories:', error.response?.data || error.message);
        throw error;
    }
};

// Get My Stories
export const getMyStories = async (size = 10, page = 1) => {

    try {
        const response = await apiClient.get(`/api/v1/my-story?size=${size}&page=${page}`);
        // console.log("result in api:", response.data)
        return response.data;
    } catch (error) {
        console.error('Error fetching api myStories:', error.response?.data || error.message);
        throw error;
    }
};
