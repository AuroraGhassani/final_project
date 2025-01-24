import React, { useEffect } from 'react';
import { Link } from 'react-router-dom'; 
import usePosts from '../../hooks/usePosts';
import { useProfileUser } from '../../hooks/useProfileUser';

const PostList = () => {
  const {profileData} = useProfileUser();
  const id = profileData.id;
  const { posts, loading, error } = usePosts(id);

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

export default PostList;
