import { useState } from 'react';
import { updatePost } from '../api/post'; // Import fungsi API

const useUpdatePost = () => {
    const [postData, setPostData] = useState({ imageUrl: '', caption: '' }); // Tambahkan state untuk form
    const [isUpdating, setIsUpdating] = useState(false);
    const [error, setError] = useState(null);

    const updatePostHandler = async (postId) => {
        setIsUpdating(true);
        setError(null);
        try {
            const response = await updatePost(postId, postData); // Panggil API dengan `postData`
            setIsUpdating(false);
            return response; // Kembalikan response jika berhasil
        } catch (err) {
            setIsUpdating(false);
            setError(err.response?.data || err.message);
            throw err; // Lempar error untuk penanganan di komponen
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setPostData((prevData) => ({ ...prevData, [name]: value })); // Update state `postData`
    };

    return { postData, setPostData, updatePostHandler, handleChange, isUpdating, error };
};

export default useUpdatePost;
