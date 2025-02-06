import { useState, useEffect } from 'react';
import { getPostByUserId } from '../api/post'; 
import { userID } from '../api/api';

const usePostsUser = () => {
  const [postCount, setPostCount] = useState(0);
  const [posts, setPosts] = useState([]); 
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPosts = async () => {
      let userID = localStorage.getItem("userId");
      setLoading(true);
      try {
        const response = await getPostByUserId(userID); 
        // console.log("result in api usePostUser:", response.posts.length);
        setPosts(response.posts); 
        setPostCount(response.posts.length); 
      } catch (err) {
        console.error("Error fetching usePostsUser:", err.message || err.response?.data);
        setError(err.message || "Failed to fetch posts.");
      } finally {
        setLoading(false);
      }
    };

    fetchPosts(); 

  }, [userID]); 

  return { posts, postCount, loading, error };
};

export default usePostsUser;
