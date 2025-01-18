import { useState } from 'react';
import { deletePost } from '../api/post'; // Sesuaikan path ini dengan struktur proyek Anda

const useDeletePost = () => {
    const [isDeleting, setIsDeleting] = useState(false);

    const deletePostHandler = async (postId) => {
        setIsDeleting(true);
        try {
            await deletePost(postId);
            setIsDeleting(false);
        } catch (error) {
            console.error('Error deleting post:', error);
            setIsDeleting(false);
            throw error;
        }
    };

    return {
        deletePostHandler,
        isDeleting,
    };
};

export default useDeletePost;
