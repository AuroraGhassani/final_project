import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom'; // Menggunakan useParams untuk mendapatkan id dari URL
import { getPostByUserId } from '../api/post'; // Mengimpor fungsi getPostByUserId

const usePosts = () => {
  const { id } = useParams(); // Mengambil 'id' dari URL
  const [postCount, setPostCount] = useState(0);
  const [posts, setPosts] = useState([]); // Menyimpan data postingan
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPosts = async () => {

      if (!id) return; 
      setLoading(true);

      try {
        const response = await getPostByUserId(id);
        // console.log("result in api usePosts:", response.posts); 
        setPosts(response.posts);
        setPostCount(response.posts.length); 

      } catch (err) {
        console.error("Error fetching posts:", err.message || err.response?.data);
        setError(err.message || "Failed to fetch posts.");
      } finally {
        setLoading(false);
      }
    };

    fetchPosts(); // Memanggil fungsi untuk mengambil data postingan

  }, [id]); // Menggunakan 'id' sebagai dependency agar refetch jika 'id' berubah

  return { posts, postCount, loading, error };
};

export default usePosts;
