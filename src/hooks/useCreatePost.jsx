import { useState } from "react";
import { createPost } from "../api/post";
import { useNavigate } from "react-router-dom";
import useUploadImage from "./useUploadImage";

export const useCreatePost = () => {
  const [postData, setPostData] = useState({
    caption: "", // Untuk menyimpan teks caption
  });
  const [loading, setLoading] = useState(false); // Loading state untuk proses create post
  const [error, setError] = useState(null); // State untuk error
  const [success, setSuccess] = useState(""); // State untuk pesan sukses

  const { uploadImage, data: imageUrl, loading: uploading, error: uploadError } =
    useUploadImage(); // Hook untuk upload gambar

  const navigate = useNavigate(); // Untuk navigasi setelah post berhasil dibuat

  // Handle perubahan input caption
  const handleChange = (e) => {
    const { name, value } = e.target;
    setPostData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  // Handle perubahan file input
  const handleFileChange = (event) => {
    const selectedFile = event.target.files[0];
    console.log("Selected file:", selectedFile); // Debugging untuk melihat file yang dipilih
    if (selectedFile) {
      uploadImage(selectedFile); // Mengupload file
    }
  };

  // Handle pembuatan post
  const handleCreatePost = async () => {
    // Validasi: pastikan gambar sudah terupload
    if (!imageUrl) {
      setError("Please upload an image before creating the post.");
      return;
    }

    setLoading(true);
    setError(null);
    setSuccess("");

    const payload = {
      caption: postData.caption,
      imageUrl, // Gunakan URL dari gambar yang diupload
    };

    try {
      await createPost(payload); // Fungsi API untuk membuat post
      console.log("Post created successfully:", payload); // Debugging
      setSuccess("Post created successfully.");
      navigate("/profilepage"); // Navigasi ke halaman profil setelah sukses
    } catch (err) {
      console.error("Error creating post:", err);
      setError("Failed to create post. Please try again."); // Tampilkan pesan error
    } finally {
      setLoading(false); // Reset loading state
    }
  };

  // Return semua state dan handler yang dibutuhkan
  return {
    postData,
    loading,
    uploading,
    error: uploadError || error, // Menggabungkan error dari upload dan pembuatan post
    success,
    handleChange,
    handleCreatePost,
    handleFileChange,
  };
};
