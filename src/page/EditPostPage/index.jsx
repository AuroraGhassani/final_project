import React, { useEffect, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { getPostById } from "../../api/post";
import { useProfileUser } from "../../hooks/useProfileUser";
import useUpdatePost from "../../hooks/useUpdatePost";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import BackButton from "../../components/BackButton";

const EditPostPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [post, setPost] = useState(null);
  const { profileData, loading: profileLoading, error: profileError } = useProfileUser();
  const { postData, setPostData, updatePostHandler, handleChange, isUpdating, error: updateError } = useUpdatePost();

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const data = await getPostById(id);
        setPost(data);
        setPostData((prev) => ({ ...prev, imageUrl: data.imageUrl, caption: data.caption }));
      } catch (error) {
        console.error("Error fetching post details:", error);
      }
    };
    fetchPost();
  }, [id]);

  const handleSubmitCaption = async () => {
    try {
      await updatePostHandler(id);
      setTimeout(() => {
        navigate(`/post/${id}`);
      }, 3000);
    } catch (err) {
      console.error("Error updating caption:", err);
      alert("Failed to update caption.");
    }
  };

  if (profileLoading || !post) {
    return <p className="text-center text-white">Loading...</p>;
  }

  if (profileError) {
    return <p className="text-center text-red-500">Error loading profile data: {profileError}</p>;
  }

  return (
    <main className="min-h-screen pt-3 pb-24 text-white bg-gray-900">
      <Navbar />
      <div className="max-w-3xl pt-20 mx-auto md:px-6">
        <div className="overflow-hidden bg-gray-800 border border-gray-700 rounded-lg shadow-lg">
          <div className="flex items-center p-4 border-b border-gray-700">
            <BackButton className="mr-4" /> 
            <h1 className="text-xl font-bold text-white">Edit Post</h1>
          </div>

          <div className="flex items-center p-4">
            <img
              className="object-cover w-12 h-12 border-2 border-green-500 rounded-full"
              src={profileData.profilePictureUrl || "/fallback-avatar.png"}
              alt={profileData.username}
              onError={(e) => (e.target.src = "/fallback-avatar.png")}
            />
            <div className="ml-3">
              <Link to={`/profilepage/${post.user.id}`} className="font-semibold text-green-400 hover:underline">
                {post.user.username}
              </Link>
            </div>
          </div>

          <div className="flex items-center justify-center w-full bg-gray-700 h-96">
            <img
              className="object-cover w-full h-96"
              src={postData.imageUrl || "/fallback-image.png"}
              alt={postData.caption}
              onError={(e) => (e.target.src = "/fallback-image.png")}
            />
          </div>

          <div className="p-4">
            <label htmlFor="caption" className="block text-sm font-semibold text-white">
              Edit Caption:
            </label>
            <textarea
              id="caption"
              name="caption"
              className="w-full p-2 mt-1 text-white bg-gray-800 border border-gray-600 rounded-md"
              rows="3"
              value={postData.caption}
              onChange={handleChange}
            />
            <button
              type="button"
              className={`w-full px-4 py-2 mt-3 text-white rounded-md ${isUpdating ? "bg-gray-400" : "bg-green-500 hover:bg-green-600"}`}
              onClick={handleSubmitCaption}
              disabled={isUpdating}
            >
              {isUpdating ? "Submitting..." : "Submit"}
            </button>
          </div>
        </div>
      </div>
      <Footer />
    </main>
  );
};

export default EditPostPage;
