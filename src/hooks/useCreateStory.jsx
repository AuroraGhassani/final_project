import { useState } from 'react';
import { createStory } from '../api/story'; // Import API createStory

const useCreateStory = () => {
    const [isLoading, setIsLoading] = useState(false); // State untuk proses loading
    const [error, setError] = useState(null); // State untuk error

    const handleCreateStory = async (storyData, onSuccess, onError) => {
        setIsLoading(true); // Mulai loading
        setError(null); // Reset error

        try {
            const response = await createStory(storyData); // Panggil API
            if (onSuccess) {
                onSuccess(response); // Jalankan callback onSuccess jika berhasil
            }
            return response;
        } catch (err) {
            console.error('Error creating story:', err);
            setError(err); // Simpan error di state
            if (onError) {
                onError(err); // Jalankan callback onError jika ada
            }
            throw err; // Lempar error agar bisa ditangani di tempat lain
        } finally {
            setIsLoading(false); // Akhiri loading
        }
    };

    return { isLoading, error, handleCreateStory };
};

export default useCreateStory;