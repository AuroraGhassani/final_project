import axios from 'axios';
import { baseUrl, apiKey, jwtToken } from './api'; // Import base URL dan API key


// Register User
export const registerUser = async (userData) => {
    try {
      const response = await axios.post(`${baseUrl}/api/v1/register`, userData, {
        headers: {
          apiKey: `${apiKey}`, // API key diperlukan
        },
      });
      return response.data; // Data berhasil registrasi
    } catch (error) {
      console.error('Error during registration:', error.response?.data || error.message);
      throw error; // Lemparkan error untuk penanganan lebih lanjut
    }
  };


// Login User
export const loginUser = async (loginData) => {
    try {
        const response = await axios.post(`${baseUrl}/api/v1/login`, loginData, {
            headers: {
                apiKey: `${apiKey}`, // API key diperlukan
            },
        });

        console.log(response.data)
        const { token } = response.data.token; // Ambil JWT token dari respons
        localStorage.setItem(`${jwtToken}`, token);
        return response.data.token; // Mengembalikan data pengguna yang berhasil login
    } catch (error) {
        console.error('Error during login:', error.response?.data || error.message);
        throw error; // Lemparkan error untuk penanganan lebih lanjut
    }
};


// Logout User
export const logoutUser = async () => {
    const config = {
        headers: {
            apiKey: `${apiKey}`,
            Authorization: `Bearer ${localStorage.getItem('jwtToken')}`, // Ambil token dari localStorage
        },
    };

    try {
        const response = await axios.post(`${baseUrl}/api/v1/logout`, {}, config); // Panggil endpoint logout
        // Hapus token dari localStorage setelah berhasil logout
        localStorage.removeItem('jwtToken');
        console.log('User logged out successfully:', response.data.message || 'Logout successful.');
        return response.data; // Mengembalikan respons API (opsional)
    } catch (error) {
        console.error('Error during logout:', error.response?.data || error.message);
        throw error; // Lemparkan error jika ada
    }
};

