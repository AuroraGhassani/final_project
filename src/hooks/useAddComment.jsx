import { useState } from 'react';
import { createComment } from '../api/comments';
import { getPostById } from '../api/post';

const useAddComment = (postId, setPost) => {
    const [isCommenting, setIsCommenting] = useState(false);


    const handleAddComment = async (newCommentText) => {
        if (isCommenting || !newCommentText.trim()) return;
        setIsCommenting(true);

        try {
          
            const addedComment = await createComment(postId, newCommentText);
            setPost((prevPost) => ({
                ...prevPost,
                comments: [...prevPost.comments, addedComment], 
            }));

            const updatedData = await getPostById(postId); // ambil kembali data postingan untuh merefresh data
            setPost(updatedData);

        } catch (error) {
            console.error('Error adding comment:', error);
        } finally {
            setIsCommenting(false);
        }
    };

    return { isCommenting, handleAddComment };
};

export default useAddComment;
