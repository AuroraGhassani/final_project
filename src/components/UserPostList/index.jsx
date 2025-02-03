import React, { useEffect } from 'react';
import { Link } from 'react-router-dom'; 
import usePostsUser from '../../hooks/usePostsUser';
import { userID } from '../../api/api';

const UserPostList = () => {
  const { posts, loading, error } = usePostsUser(userID);

  if (loading) return <p>Loading...</p>;
  if (error) return <p className="text-red-500">Error: {error}</p>;

  // Urutkan posts berdasarkan createdAt, terbaru ke terlama
  const sortedPosts = [...posts].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

  return (
    <div className="grid grid-cols-2 gap-5 mx-3 mt-8 mb-40 sm:gap-5 md:grid-cols-3 drop-shadow-lg">
      
      {sortedPosts.length > 0 ? (
        sortedPosts.map((post) => (
          <div key={post.id} className="relative overflow-hidden bg-gray-200 group aspect-square">
            {/* Make the post image clickable */}
            <Link to={`/post/${post.id}`}>
              {/* Menampilkan gambar jika ada */}
              {post.imageUrl ? (
                <img
                  src={post.imageUrl}
                  alt={post.caption || "Post image"}
                  className="object-cover w-full h-full"
                  onError={(e) => (e.target.src = "/fallback-image.png")}
                />
              ) : (
                <div className="flex items-center justify-center w-full h-full text-gray-500 bg-gray-100">
                  No Image
                </div>
              )}
            </Link>
          </div>
        ))
      ) : (
        <p className="text-center text-gray-500">No posts available.</p>
      )}
    </div>
  );
};

export default UserPostList;
