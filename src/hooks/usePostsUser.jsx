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
      setLoading(true);
      try {
        const response = await getPostByUserId(userID); 
        // console.log("result in api usePostUser:", response.data.posts);
        setPosts(response.data.posts); // Menyimpan data postingan
        setPostCount(response.data.posts.length); // Menghitung jumlah postingan
      } catch (err) {
        console.error("Error fetching posts:", err.message || err.response?.data);
        setError(err.message || "Failed to fetch posts.");
      } finally {
        setLoading(false);
      }
    };

    fetchPosts(); // Memanggil fungsi untuk mengambil data postingan

  }, [userID]); // Menggunakan 'id' sebagai dependency agar refetch jika 'id' berubah

  return { posts, postCount, loading, error };
};

export default usePostsUser;
