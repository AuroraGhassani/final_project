import useToggleLike from "../hooks/useToogleLike";
import useAddComment from "../hooks/useAddComment";
import { useState } from "react";

const usePostInteractions = (setAllPosts) => {
  const { handleToggleLike, isLiking } = useToggleLike();
  const { handleAddComment, isCommenting } = useAddComment();
  const [newComments, setNewComments] = useState({}); // Menyimpan komentar baru

  // Fungsi toggle like
  const toggleLikePost = (postId) => {
    handleToggleLike(postId, (updatedPost) => {
      setAllPosts((prevPosts) =>
        prevPosts.map((post) =>
          post.id === postId ? { ...post, ...updatedPost } : post
        )
      );
    });
  };

  // Fungsi menambahkan komentar
  const addCommentToPost = (postId, comment) => {
    handleAddComment(postId, comment, (updatedPost) => {
      setAllPosts((prevPosts) =>
        prevPosts.map((post) =>
          post.id === postId ? { ...post, ...updatedPost } : post
        )
      );
      setNewComments((prev) => ({ ...prev, [postId]: "" })); // Reset komentar
    });
  };

  const handleCommentChange = (postId, value) => {
    setNewComments((prev) => ({ ...prev, [postId]: value }));
  };

  return {
    isLiking,
    isCommenting,
    newComments,
    toggleLikePost,
    addCommentToPost,
    handleCommentChange,
  };
};

export default usePostInteractions;
