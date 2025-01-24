import React, { useEffect, useState } from "react";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import useExplorePost from "../../hooks/useExplorePost";
import { useNavigate } from "react-router-dom";
import NoImage from "../../components/Common/NoImage";

const ExplorePage = () => {
  const [currentPage, setCurrentPage] = useState(1); // State untuk halaman
  const [allPosts, setAllPosts] = useState([]); // State untuk menyimpan semua post
  const [isFetching, setIsFetching] = useState(false); // State untuk loading infinite scroll
  
  const { data, loading, error } = useExplorePost(currentPage, 10); // Fetch data dengan page & size
  const navigate = useNavigate(); // Untuk navigasi ke halaman lain

  useEffect(() => {
    if (data?.posts) {
      setAllPosts((prevPosts) => [...prevPosts, ...data.posts]);
    }
  }, [data]);

  // Infinite scroll: deteksi scroll ke bawah
  useEffect(() => {
    const handleScroll = () => {
      if (
        window.innerHeight + window.scrollY >= document.body.offsetHeight - 500 &&
        !isFetching &&
        currentPage < data?.totalPages
      ) {
        setIsFetching(true);
        setCurrentPage((prev) => prev + 1); // Increment halaman
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [isFetching, currentPage, data?.totalPages]);

  useEffect(() => {
    if (isFetching && !loading) {
      setIsFetching(false);}
  }, [loading]);

  const handlePostClick = (id) => {
    navigate(`/post/${id}`); // Navigasi ke halaman post detail dengan ID
  };

  if (loading && currentPage === 1) {
    return <p>Loading...</p>; // Tampilkan loading awal hanya saat halaman pertama
  }

  if (error) {
    return <p className="text-red-500">Error: {error}</p>;
  }

  return (
    <main>
      <Navbar />
      <div className="py-24">
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold">Explore</h1>
          <p className="text-gray-600">
            Jelajahi post terbaru dari komunitas kami!
          </p>
        </div>
        
        {/* Grid Layout */}
        <div className="grid grid-cols-2 gap-4 px-4 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-4">
          {allPosts.length > 0 ? (
            allPosts.map((item,index) => (
              <div
              key={`${item.id}-${index}`}
                onClick={() => handlePostClick(item.id)}
                className="relative overflow-hidden bg-gray-200 cursor-pointer group"
              >
                {/* images */}
                <div className="flex items-center justify-center w-full h-56 bg-gray-100">
                {item.imageUrl ? (
                    <img
                        className="object-cover w-full h-full"
                        src={item.imageUrl}
                        alt={item.caption}
                    />
                    ) : (
                        <NoImage /> 
                    )}
                </div>
              </div>
            ))
          ) : (
            <p className="text-center col-span-full">
              Tidak ada post untuk ditampilkan.
            </p>
          )}
        </div>
        {/* Infinite Scroll Loading */}
        {isFetching && <p className="mt-4 text-center">Loading more posts...</p>}
      </div>
      <Footer />
    </main>
  );
};

export default ExplorePage;
