import axios from 'axios';
import { baseUrl, jwtToken, apiKey } from './api';

// Get Logged User Data
export const getLoggedUser = async () => {
    const config = {
        headers: {
            Authorization: `Bearer ${jwtToken}`,
            apiKey: `${apiKey}`,
        },
    };

    try {
        const response = await axios.get(`${baseUrl}/api/v1/user`, config);
        return response.data.data; 
    } catch (error) {
        console.error('Error fetching logged user:', error.response?.data || error.message);
        throw error; 
    }
};


// Update Profile
export const updateProfile = async (profileData) => {
    const config = {
        headers: {
            apiKey: `${apiKey}`,
            Authorization: `Bearer ${jwtToken}`,
        },
    };

    try {
        const response = await axios.post(
            `${baseUrl}/api/v1/update-profile`,
            profileData,
            config
        );
        return response.data.data; // Mengembalikan data hasil response
    } catch (error) {
        console.error('Error updating profile:', error.response?.data || error.message);
        throw error; // Melempar error agar bisa ditangkap di tempat lain
    }
};

// Get User By ID
export const getUserById = async (id) => {
    const config = {
        headers: {
            Authorization: `Bearer ${jwtToken}`,
            apiKey: `c7b411cc-0e7c-4ad1-aa3f-822b00e7734b`,
        },
    };

    try {
        const response = await axios.get(`${baseUrl}/api/v1/user/${id}`, config);
        return response.data; // Return the user data
        // console.log("di api getuserbyid:", response.data);
    } catch (error) {
        console.error('Error fetching user by ID:', error.response?.data || error.message);
        throw error; // Throw error to be handled elsewhere
    }
};