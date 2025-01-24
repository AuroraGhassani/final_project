import { useState, useEffect } from "react";
import { getMyFollowingPosts } from "../api/post"; // Import fungsi API

const useMyFollowingPost = (size = 10, page = 1) => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPosts = async () => {
      setLoading(true);
      setError(null);
      try {
        const data = await getMyFollowingPosts(page, size); // Panggil fungsi API
        setPosts(data || []);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, [size, page]);

  return { posts, loading, error };
};

export default useMyFollowingPost;
