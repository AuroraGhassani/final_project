import axios from 'axios';
import { useState, useEffect } from 'react';
import { baseUrl, jwtToken, apiKey } from '../api/api';
import { getUserPosts } from '../api/post';
import { userID } from '../api/api';

const usePosts = (userID) => {
  
  const [postCount, setPostCount] = useState(0);
  const [posts, setPosts] = useState([]); // Menyimpan data postingan
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPosts = async () => {
      setLoading(true);
      try {
        const response = await getUserPosts(userID);
        console.log("API Response:", response); //data berupa array
        setPosts(response); // Set posts dengan data API
        setPostCount(response.length); // Hitung jumlah posting
      } catch (err) {
        console.error("Error fetching posts:", err.message || err.response?.data);
        setError(err.message || "Failed to fetch posts.");
      } finally {
        setLoading(false);
      }
    };
  
    if (userID) fetchPosts();
  }, [userID]);
  

  return { posts, postCount, loading, error };
};

export default usePosts;
