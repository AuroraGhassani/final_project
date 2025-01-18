// hooks/useCreatePost.js
import { useState } from 'react';
import { createPost } from '../api/post';
import { useNavigate } from 'react-router-dom';

export const useCreatePost = () => {
    const [postData, setPostData] = useState({
        caption: '',
        imageUrl: '',
    });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState(false);

    const navigate = useNavigate(); // Hook untuk navigasi

    const handleChange = (e) => {
        const { name, value } = e.target;
        setPostData((prevState) => ({
            ...prevState,
            [name]: value,
        }));
    };

    const handleCreatePost = async () => {
        setLoading(true);
        setError('');
        setSuccess(false);

        try {
            const result = await createPost(postData);
            console.log('Post created successfully:', result);
            setSuccess(true);
            navigate('/profilepage'); // Pindah ke halaman profil
        } catch (err) {
            setError('Failed to create post. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    return {
        postData,
        loading,
        error,
        success,
        handleChange,
        handleCreatePost,
    };
};
