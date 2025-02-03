import { useEffect, useState } from "react";
import { getMyFollowingStories } from "../../api/story";
import ConfirmModal from "../Common/ConfirmModal";

const StoryList = () => {
  const [stories, setStories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedStory, setSelectedStory] = useState(null);

  useEffect(() => {
    const fetchStories = async () => {
      try {
        const response = await getMyFollowingStories();
        setStories(response.data.stories);
      } catch (err) {
        setError("Failed to fetch stories. Please try again later.");
      } finally {
        setLoading(false);
      }
    };
    fetchStories();
  }, []);

  const openModal = (story) => {
    setSelectedStory(story);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedStory(null);
  };

  if (loading) {
    return <div className="mt-5 text-center text-gray-700">Loading...</div>;
  }

  if (error) {
    return <div className="mt-5 text-center text-red-500">{error}</div>;
  }

  console.log(stories)

  return (
    <div className="max-w-xs p-3 md:max-w-2xl">
      {stories.length === 0 ? (
        <p className="px-3 py-16 ml-3 text-sm text-center text-gray-500">No stories found.</p>
      ) : (
        <main className="">
          <div className="flex w-full space-x-1 overflow-x-auto">
            {stories.map((story, index) => (
              <div key={index} className="flex-shrink-0 w-24 text-center snap-start">
                <div
                  className="relative cursor-pointer rounded-xl"
                  onClick={() => openModal(story)}
                >
                  <img
                    src={story.user?.profilePictureUrl ?? "/fallback-avatar.png"}
                    className="object-cover w-20 h-32 border-2 border-green-500 rounded-xl"
                    onError={(e) => (e.target.src = "/fallback-avatar.png")}
                  />
                </div>
                <p className="pt-1 mr-2 text-sm text-black">{story.user?.username || "Unknown"}</p>
              </div>
            ))}
          </div>
        </main>
      )}

      {isModalOpen && selectedStory && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-900 bg-opacity-80">
          <div className="relative w-full max-w-lg">
            <button
              className="absolute p-2 text-lg text-gray-900 rounded-lg top-2 right-2 bg-emerald-500"
              onClick={closeModal}
            >
              ✕
            </button>
            <div className="carousel">
              <div className="flex justify-center w-full carousel-item">
                <img
                  src={selectedStory.imageUrl}
                  alt={selectedStory.caption}
                  className="object-cover w-full h-full"
                  onError={(e) => (e.target.src = "/fallback-image.png")}
                />
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default StoryList;
