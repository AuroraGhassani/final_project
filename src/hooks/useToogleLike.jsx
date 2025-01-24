// hooks/useToggleLike.js
import { useState } from 'react';
import { likePost, unlikePost } from '../api/like'; // Import like/unlike functions

const useToggleLike = (post, setPost) => {
    const [isLiking, setIsLiking] = useState(false);

    const handleToggleLike = async () => {
        if (isLiking || !post) return;
        setIsLiking(true);

        try {
            if (post.isLike) {
                await unlikePost(post.id);
                setPost((prevPost) => ({
                    ...prevPost,
                    isLike: false,
                    totalLikes: prevPost.totalLikes - 1,
                }));
            } else {
                await likePost(post.id);
                setPost((prevPost) => ({
                    ...prevPost,
                    isLike: true,
                    totalLikes: prevPost.totalLikes + 1,
                }));
            }
        } catch (error) {
            console.error('Error toggling like:', error);
        } finally {
            setIsLiking(false);
        }
    };

    return {
        isLiking,
        handleToggleLike,
    };
};

export default useToggleLike;
