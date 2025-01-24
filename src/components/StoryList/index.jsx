import React, { useState, useEffect } from 'react';
import { getMyFollowingStories, getMyStories } from '../../api/story';

const StoryList = () => {
  const [stories, setStories] = useState([]);
  const [myStories, setMyStories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedAccountStories, setSelectedAccountStories] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentStoryIndex, setCurrentStoryIndex] = useState(0);

  useEffect(() => {
    const fetchMyStories = async () => {
      setLoading(true);
      try {
        const response = await getMyStories();
        setMyStories(response.data.stories);
      } catch (error) {
        console.error('Error fetching my stories:', error);
        setError('Failed to fetch my stories');
      } finally {
        setLoading(false);
      }
    };
    fetchMyStories();
  }, []);

  useEffect(() => {
    const fetchStories = async () => {
      setLoading(true);
      try {
        const response = await getMyFollowingStories();
        setStories(response.data.stories);
      } catch (error) {
        console.error('Error fetching stories:', error);
        setError('Failed to fetch stories');
      } finally {
        setLoading(false);
      }
    };
    fetchStories();
  }, []);

  const openModal = (accountStories) => {
    setSelectedAccountStories(accountStories);
    setCurrentStoryIndex(0);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedAccountStories([]);
  };

  const goToNextStory = () => {
    if (currentStoryIndex < selectedAccountStories.length - 1) {
      setCurrentStoryIndex(currentStoryIndex + 1);
    }
  };

  const goToPreviousStory = () => {
    if (currentStoryIndex > 0) {
      setCurrentStoryIndex(currentStoryIndex - 1);
    }
  };

  console.log(myStories) //mapping .user.profilepicture = profpic
  console.log(stories)

  return (
    <main className="p-4">
      <div className="flex mt-20 space-x-6 overflow-x-auto">
        
        {/* My Stories */}
        <div>
          {myStories.length === 0 ? (
            <div className="text-center text-gray-600">I haven't created any stories yet.</div>
          ) : (
            <div
              key={myStories.id}
              className="relative flex-shrink-0 w-32 h-32 border-4 border-blue-500 rounded-full cursor-pointer"
              onClick={() => openModal(myStories)}
            >
             
            </div>
          )}
        </div>

        {/* Following Stories */}
        <div className="flex mt-10 space-x-4">
          {stories.length === 0 ? (
            <div>No stories available.</div>
          ) : (
            stories.map((story) => (
              <div
                key={story.id}
                className="relative flex-shrink-0 w-32 h-32 overflow-hidden border-4 border-gray-300 rounded-full cursor-pointer group"
                onClick={() => openModal(stories.filter((s) => s.accountId === story.accountId))}
              >
                <img
                  src={story.imageUrl}
                  alt={story.title}
                  className="object-cover w-full h-full rounded-full"
                />
                {/* Profile Icon */}
                <div className="absolute flex items-center justify-center w-8 h-8 bg-white border-2 border-gray-500 rounded-full top-2 left-2">
                  
                </div>
              </div>
            ))
          )}
        </div>
      </div>

      {/* Modal with carousel */}
      {isModalOpen && selectedAccountStories.length > 0 && (
        <div className="fixed inset-0 z-50 flex items-center justify-center transition-all duration-300 bg-black bg-opacity-50">
          <div className="relative max-w-full p-6 bg-white rounded-lg w-80">
            {/* Close Button */}
            <button
              className="absolute text-3xl font-semibold text-black top-2 right-2"
              onClick={closeModal}
            >
              &times;
            </button>

            {/* Story Content in Modal */}
            <div className="relative">
              <img
                src={selectedAccountStories[currentStoryIndex].imageUrl}
                alt={selectedAccountStories[currentStoryIndex].title}
                className="object-cover w-full h-64 mb-4 rounded-lg"
              />
              <h3 className="text-lg font-semibold text-gray-900">{selectedAccountStories[currentStoryIndex].title}</h3>
              <p className="mt-2 text-sm text-gray-700">
                {selectedAccountStories[currentStoryIndex].description}
              </p>
            </div>

            {/* Navigation Buttons */}
            <div className="flex justify-between mt-4">
              <button
                className="px-4 py-2 text-white bg-blue-500 rounded-md disabled:bg-gray-300"
                onClick={goToPreviousStory}
                disabled={currentStoryIndex === 0}
              >
                Previous
              </button>
              <button
                className="px-4 py-2 text-white bg-blue-500 rounded-md disabled:bg-gray-300"
                onClick={goToNextStory}
                disabled={currentStoryIndex === selectedAccountStories.length - 1}
              >
                Next
              </button>
            </div>
          </div>
        </div>
      )}
    </main>
  );
};

export default StoryList;
