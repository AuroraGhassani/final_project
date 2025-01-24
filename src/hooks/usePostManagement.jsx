import { useState, useEffect } from "react";
import useMyFollowingPost from "./useMyFollowingPosts";

const usePostManagement = () => {
  const [page, setPage] = useState(1); // Halaman saat ini
  const [allPosts, setAllPosts] = useState([]); // Semua post

  const { posts, loading, error } = useMyFollowingPost(10, page); // Ambil post berdasarkan halaman

  // Update allPosts saat ada post baru
  useEffect(() => {
    if (posts.length > 0) {
      setAllPosts((prevPosts) => [...prevPosts, ...posts]);
    }
  }, [posts]);

  // Fungsi untuk menangani infinite scroll
  const handleScroll = () => {
    if (
      window.innerHeight + document.documentElement.scrollTop >=
      document.documentElement.offsetHeight - 50 // Dekat bawah halaman
    ) {
      setPage((prevPage) => prevPage + 1); // Tambah halaman
    }
  };

  // Daftarkan event listener scroll
  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return { allPosts, loading, error, setAllPosts };
};

export default usePostManagement;
