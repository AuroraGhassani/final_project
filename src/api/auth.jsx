import axios from 'axios';
import { baseUrl, apiKey, jwtToken } from './api'; // Import base URL dan API key


// Register User
export const registerUser = async (userData) => {
    try {
      const response = await axios.post(`${baseUrl}/api/v1/register`, userData, {
        headers: {
          apiKey: `${apiKey}`, 
        },
      });
      return response.data; 
    } catch (error) {
      console.error('Error during registration:', error.response?.data || error.message);
      throw error; 
    }
  };


// Login User
export const loginUser = async (loginData) => {
    try {
        const response = await axios.post(`${baseUrl}/api/v1/login`, loginData, {
            headers: {
                apiKey: `${apiKey}`, 
            },
        });

        // console.log(response.data)
        const { token } = response.data.token; 
        const { userId } = response.data.user.id;
        localStorage.setItem(`${jwtToken}`, token);
        localStorage.setItem(`${userId}`, userId);
        return response.data; 
       
    } catch (error) {
        console.error('Error during login:', error.response?.data || error.message);
        throw error; 
    }
};


// Logout User
export const logoutUser = async () => {
    const config = {
        headers: {
            apiKey: `${apiKey}`,
            Authorization: `Bearer ${localStorage.getItem('jwtToken')}`, 
        },
    };

    try {
        const response = await axios.post(`${baseUrl}/api/v1/logout`, {}, config);
        localStorage.removeItem('jwtToken');
        localStorage.removeItem('useId');
        // console.log('User logged out successfully:', response.data.message || 'Logout successful.');
        return response.data; 
    } catch (error) {
        console.error('Error during logout:', error.response?.data || error.message);
        throw error; 
    }
};

