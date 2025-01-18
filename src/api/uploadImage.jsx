import axios from 'axios';
import { baseUrl, apiKey, jwtToken } from './api'; // Pastikan variabel ini sesuai dengan konfigurasi Anda

// Upload Image
export const uploadImage = async (imageFile) => {
    const formData = new FormData();
    formData.append('image', imageFile);

    const config = {
        headers: {
            'Content-Type': 'multipart/form-data',
            apiKey: apiKey,
            Authorization: `Bearer ${jwtToken}`,
        },
    };

    try {
        const response = await axios.post(`${baseUrl}/api/v1/upload-image`, formData, config);
        return response.data.imageUrl; // Mengembalikan URL gambar yang diunggah
    } catch (error) {
        console.error('Error uploading image:', error.response?.data || error.message);
        throw error;
    }
};
