import { useEffect, useState } from "react";
import { getMyStories, getStoryViewsById, deleteStory } from "../../api/story";
import ConfirmModal from "../Common/ConfirmModal";

const UserStoryList = () => {
  const [userStories, setUserStories] = useState([]);
  const [storyViews, setStoryViews] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [deletingStoryId, setDeletingStoryId] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [confirmDelete, setConfirmDelete] = useState(false);

  useEffect(() => {
    const fetchUserStories = async () => {
      try {
        const response = await getMyStories();
        setUserStories(response.data.stories || []);
      } catch (err) {
        setError("Failed to fetch user stories. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchUserStories();
  }, []);

  const fetchStoryViews = async (storyId) => {
    try {
      const views = await getStoryViewsById(storyId);
      setStoryViews((prev) => ({ ...prev, [storyId]: views || 0 }));
    } catch (error) {
      console.error("Failed to fetch story views:", error);
      setStoryViews((prev) => ({ ...prev, [storyId]: 0 }));
    }
  };

  const handleDeleteStory = async () => {
    if (!deletingStoryId) return;
    setConfirmDelete(false);
    try {
      await deleteStory(deletingStoryId);
      setUserStories((prev) => prev.filter((story) => story.id !== deletingStoryId));
    } catch (error) {
      alert("Failed to delete story. Please try again.");
    } finally {
      setDeletingStoryId(null);
    }
  };

  const openModal = () => {
    setIsModalOpen(true);
    setCurrentIndex(0);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  if (loading) {
    return <div className="mt-5 text-center text-gray-700">Loading...</div>;
  }

  if (error) {
    return <div className="mt-5 text-center text-red-500">{error}</div>;
  }

  console.log("isi storyviews", storyViews);
  return (
    <div className="max-w-md p-3">
      {userStories.length === 0 ? (
        <p className="w-16 pt-8 text-center text-gray-500 bg-gray-300">You haven't posted a story.</p>
      ) : (
        <main>
          {/* icon story */}
          <div className="relative w-24 cursor-pointer h-36 rounded-xl" onClick={openModal}>
            <img
              src={userStories[0]?.user.profilePictureUrl}
              alt="Thumbnail"
              className="object-cover h-40 border-2 border-green-500 rounded-xl w-28"
              onError={(e) => (e.target.src = "/fallback-image.png")}
            />
            <p className="mt-1 text-sm text-black">Your Story</p>
          </div>

        {/* isi popup story */}
          {isModalOpen && (
            <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-800 bg-opacity-80">
              <div className="relative w-full max-w-lg bg-gray-100">
                
                <button className="absolute p-2 text-lg text-gray-900 rounded-lg bg-emerald-500 top-2 right-2" onClick={closeModal}> ✕ </button>
                
                <div className="carousel">
                  {userStories.map((story, index) => (
                    <div key={index} className="flex justify-center w-full carousel-item ">
                      <img
                        src={story.imageUrl}
                        alt={story.caption}
                        className="object-cover w-full h-full "
                        onError={(e) => (e.target.src = "/fallback-image.png")}
                        onLoad={() => fetchStoryViews(story.id)}
                      />
                    </div>
                  ))}
                </div>
              
                <div className="flex flex-row justify-between px-5 pt-3 pb-4 item-center ">
                  <p className="text-sm text-gray-500">
                    Views: {storyViews[userStories[currentIndex].id]?.length ?? "0"}
                  </p>
                  <button
                    className="px-5 py-1 mt-4 text-sm text-white bg-gray-500 rounded-lg"
                    onClick={() => {
                      setDeletingStoryId(userStories[currentIndex].id);
                      setConfirmDelete(true);
                    }}
                    disabled={deletingStoryId === userStories[currentIndex].id}
                  >
                    {deletingStoryId === userStories[currentIndex].id ? "Deleting..." : "Delete"}
                  </button>
                </div>
              </div>
            </div>
          )}

          <ConfirmModal
            isOpen={confirmDelete}
            onClose={() => setConfirmDelete(false)}
            onConfirm={handleDeleteStory}
            message="Are you sure you want to delete this story?"
          />
        </main>
      )}
    </div>
  );
};

export default UserStoryList;
