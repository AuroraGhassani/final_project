import React, { useEffect } from 'react';
import { Link } from 'react-router-dom'; 
import usePostsUser from '../../hooks/usePostsUser';
import { userID } from '../../api/api';


const UserPostList = () => {

  const { posts, loading, error } = usePostsUser(userID);

  if (loading) return <p>Loading...</p>;
  if (error) return <p className="text-red-500">Error: {error}</p>;

  return (
    <div className="grid grid-cols-2 gap-3 mt-6 sm:gap-6">
      {posts && posts.length > 0 ? (
        posts.map((post) => (
          <div
            key={post.id}
            className="relative overflow-hidden bg-gray-200 group aspect-square"
          >
            {/* Make the post image clickable */}
            <Link to={`/post/${post.id}`}>
              {/* Menampilkan gambar jika ada */}
              {post.imageUrl ? (
                <img
                  src={post.imageUrl}
                  alt={post.caption || "Post image"}
                  className="object-cover w-full h-full"
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
