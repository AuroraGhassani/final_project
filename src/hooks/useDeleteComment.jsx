import { useState } from 'react';
import { deleteComment } from '../api/comments';

const useDeleteComment = (setPost) => {
    const [isDeleting, setIsDeleting] = useState(false);

    const handleDeleteComment = async (commentId) => {
        if (isDeleting) return;
        setIsDeleting(true);

        try {
            await deleteComment(commentId);
            setPost((prevPost) => ({
                ...prevPost,
                comments: prevPost.comments.filter((comment) => comment.id !== commentId),
            }));
        } catch (error) {
            console.error('Error deleting comment:', error);
        } finally {
            setIsDeleting(false);
        }
    };

    return { isDeleting, handleDeleteComment };
};

export default useDeleteComment;
