import React, { useEffect } from 'react';
import { Link } from 'react-router-dom'; 
import usePosts from '../../hooks/usePosts';
import { useProfileUser } from '../../hooks/useProfileUser';

const PostList = () => {
  const { profileData } = useProfileUser();
  const id = profileData.id;
  const { posts, loading, error } = usePosts(id);

  if (loading) return <p>Loading...</p>;
  if (error) return <p className="text-red-500">Error: {error}</p>;

  // Urutkan posts berdasarkan createdAt, terbaru ke terlama
  const sortedPosts = [...posts].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

  return (
    <div className="grid grid-cols-2 gap-4 mt-3 sm:gap-5 md:grid-cols-3 drop-shadow-lg">
      {sortedPosts.length > 0 ? (
        sortedPosts.map((post) => (
          <div key={post.id} className="relative overflow-hidden bg-gray-200 group aspect-square">
            {/* Make the post image clickable */}
            <Link to={`/post/${post.id}`}>
              {/* Menampilkan gambar jika ada */}
                <img
                  src={post.imageUrl}
                  alt={post.caption || "Post image"}
                  className="object-cover w-full h-full"
                  onError={(e) => (e.target.src = "/fallback-image.png")}
                />
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
