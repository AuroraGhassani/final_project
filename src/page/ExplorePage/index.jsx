import React, { useEffect, useState } from "react";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import useExplorePost from "../../hooks/useExplorePost";
import { useNavigate } from "react-router-dom";

const ExplorePage = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [allPosts, setAllPosts] = useState([]);
  const [isFetching, setIsFetching] = useState(false);

  const { data, loading, error } = useExplorePost(currentPage, 10);
  const navigate = useNavigate();

  useEffect(() => {
    if (data?.posts) {
      setAllPosts((prevPosts) => [...prevPosts, ...data.posts]);
    }
  }, [data]);

  useEffect(() => {
    const handleScroll = () => {
      if (
        window.innerHeight + window.scrollY >= document.body.offsetHeight - 500 &&
        !isFetching &&
        currentPage < data?.totalPages
      ) {
        setIsFetching(true);
        setCurrentPage((prev) => prev + 1);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [isFetching, currentPage, data?.totalPages]);

  useEffect(() => {
    if (isFetching && !loading) {
      setIsFetching(false);
    }
  }, [loading]);

  const handlePostClick = (id) => {
    navigate(`/post/${id}`);
  };

  if (loading && currentPage === 1) {
    return <p className="text-lg text-center text-white">Loading...</p>;
  }

  if (error) {
    return <p className="text-lg text-center text-red-500">Error: {error}</p>;
  }

  return (
    <main className="min-h-screen text-white bg-gray-800">
      <Navbar />
      <div className="max-w-4xl px-5 py-20 mx-auto">
        <div className="mb-8 text-center">
          <h1 className="text-4xl font-extrabold text-green-500">Explore</h1>
          <p className="mt-2 text-lg text-gray-300">
            Discover the latest posts from our amazing community!
          </p>
        </div>

        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-4">
          {allPosts.length > 0 ? (
            allPosts.map((item, index) => (
              <div
                key={`${item.id}-${index}`}
                onClick={() => handlePostClick(item.id)}
                className="relative overflow-hidden transition-all duration-300 bg-gray-800 border border-gray-700 shadow-lg cursor-pointer group hover:shadow-xl"
              >
                <div className="flex items-center justify-center w-full h-56 bg-gray-700">
                  <img
                    className="object-cover w-full h-full transition-transform duration-300 group-hover:scale-110"
                    src={item.imageUrl}
                    alt={item.caption}
                    onError={(e) => (e.target.src = "/fallback-image.png")}
                  />
                </div>
              </div>
            ))
          ) : (
            <p className="text-lg text-center text-gray-500 col-span-full">
              No Posts Available.
            </p>
          )}
        </div>

        {isFetching && (
          <p className="mt-8 text-center text-green-400">Loading more posts...</p>
        )}
      </div>
      <Footer />
    </main>
  );
};

export default ExplorePage;
