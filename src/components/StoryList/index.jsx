import { useEffect, useState } from "react";
import { getMyFollowingStories } from "../../api/story";
import ConfirmModal from "../Common/ConfirmModal";

const StoryList = () => {
  const [storiesGrouped, setStoriesGrouped] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedUserId, setSelectedUserId] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const fetchStories = async () => {
      try {
        const response = await getMyFollowingStories();
        const grouped = response.data.stories.reduce((acc, story) => {
          if (!acc[story.userId]) {
            acc[story.userId] = [];
          }
          acc[story.userId].push(story);
          return acc;
        }, {});
        setStoriesGrouped(grouped);
      } catch (err) {
        setError("Failed to fetch stories. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchStories();
  }, []);

  const openModal = (userId) => {
    setSelectedUserId(userId);
    setIsModalOpen(true);
    setCurrentIndex(0);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedUserId(null);
  };

  if (loading) {
    return <div className="mt-5 text-center text-gray-700">Loading...</div>;
  }

  if (error) {
    return <div className="mt-5 text-center text-red-500">{error}</div>;
  }

  return (
    <div className="max-w-md p-3">
      {Object.keys(storiesGrouped).length === 0 ? (
        <p className="text-center text-gray-600">No stories found.</p>
      ) : (
        <div className="flex space-x-3 overflow-x-auto">
          {Object.entries(storiesGrouped).map(([userId, userStories]) => (
            <div key={userId} className="flex-shrink-0 w-24 text-center">
              <div
                className="relative w-24 cursor-pointer h-36 rounded-xl"
                onClick={() => openModal(userId)}
              >
                <img
                  src={userStories[0].user.profilePictureUrl}
                  alt="Thumbnail"
                  className="object-cover h-40 border-2 border-green-500 rounded-xl w-28"
                  onError={(e) => (e.target.src = "/fallback-image.png")}
                />
              </div>
              <p className="mt-5 text-sm text-black">{userStories[0].user.username}</p>
            </div>
          ))}
        </div>
      )}

      {isModalOpen && selectedUserId && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-900 bg-opacity-80">
          <div className="relative w-full max-w-lg ">
            <button
              className="absolute p-2 text-lg text-gray-900 rounded-lg bg-emerald-500 top-2 right-2"
              onClick={closeModal}
            >
              ✕
            </button>
            <div className="carousel">
              {storiesGrouped[selectedUserId].map((story, index) => (
                <div key={index} className="flex justify-center w-full carousel-item">
                  <img
                    src={story.imageUrl}
                    alt={story.caption}
                    className="object-cover w-full h-full"
                    onError={(e) => (e.target.src = "/fallback-image.png")}
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default StoryList;
