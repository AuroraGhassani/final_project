import { useState } from 'react';
import { updatePost } from '../api/post'; // Import fungsi update API

const useUpdatePost = () => {
    const [postData, setPostData] = useState({ caption: '', imageUrl: '' });
    const [isUpdating, setIsUpdating] = useState(false);
    const [error, setError] = useState(null);

    const updatePostHandler = async (postId) => {
        try {
            setIsUpdating(true);
            setError(null);
            await updatePost(postId, postData);
            window.location.href = `/post/${postId}`;
        } catch (err) {
            setError(err.response?.data?.message || err.message || 'Something went wrong.');
        } finally {
            setIsUpdating(false);
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setPostData((prev) => ({ ...prev, [name]: value }));
    };

    return { postData, setPostData, updatePostHandler, handleChange, isUpdating, error };
};

export default useUpdatePost;
