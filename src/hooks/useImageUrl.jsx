import { useState } from 'react';
import axios from 'axios';

const useImageUrl = () => {
    const [imageUrl, setImageUrl] = useState(null); // State untuk URL lokal gambar
    const [uploadedImageUrl, setUploadedImageUrl] = useState(null); // URL gambar dari server
    const [error, setError] = useState(null); // Error state
    const [isUploading, setIsUploading] = useState(false); // Status upload

    const handleFileChange = (file) => {
        if (!file) {
            setError('No file selected');
            return;
        }

        const newImageUrl = URL.createObjectURL(file); // URL lokal untuk preview
        setImageUrl(newImageUrl); // Simpan URL di state
        setError(null); // Reset error jika sukses
    };

    const uploadImageToServer = async (file) => {
        if (!file) {
            setError('No file selected to upload');
            return;
        }

        const formData = new FormData();
        formData.append('image', file); // Tambahkan file ke FormData

        setIsUploading(true);
        setError(null);

        try {
            const response = await axios.post('https://your-server-api.com/upload', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            setUploadedImageUrl(response.data.imageUrl); // Simpan URL dari server
        } catch (err) {
            console.error('Error uploading image:', err);
            setError('Failed to upload image to the server');
        } finally {
            setIsUploading(false);
        }
    };

    const clearImageUrl = () => {
        setImageUrl(null); // Reset URL lokal
        setUploadedImageUrl(null); // Reset URL dari server
    };

    return {
        imageUrl, // URL lokal untuk preview
        uploadedImageUrl, // URL gambar dari server
        error,
        isUploading,
        handleFileChange,
        uploadImageToServer,
        clearImageUrl,
    };
};

export default useImageUrl;
