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