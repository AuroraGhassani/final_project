import React, { useState, useEffect } from "react";
import axios from "axios";
import { baseUrl } from "../../api/api";

const StoryList = () => {
  const [stories, setStories] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch stories from API
    const fetchStories = async () => {
      try {
        const response = await axios.get(
          `${baseUrl}/api/v1/following-story?size=10&page=1`,
          {
            headers: {
              apiKey: "c7b411cc-0e7c-4ad1-aa3f-822b00e7734b", // Replace with your actual API key
              Authorization: "Bearer YOUR_JWT_TOKEN", // Replace with your actual JWT token
            },
          }
        );
        setStories(response.data); // Adjust based on API response structure
        setLoading(false);
      } catch (error) {
        console.error("Failed to fetch stories:", error);
        setLoading(false);
      }
    };

    fetchStories();
  }, []);

  if (loading) {
    return <p className="text-center text-gray-500">Loading stories...</p>;
  }

  return (
    <div className="flex gap-4 p-4 overflow-x-scroll bg-yellow-300">
      {stories.length > 0 ? (
        stories.map((story, index) => (
          <button
            key={index}
            className="flex-shrink-0 bg-transparent border-none"
          >
            <img
              src={story.imageUrl}
              alt={story.caption || "Story"}
              className="w-16 h-16 transition-transform duration-200 border-2 border-blue-500 rounded-full hover:scale-110"
            />
          </button>
        ))
      ) : (
        <p className="text-gray-500">No stories available</p>
      )}
    </div>
  );
};

export default StoryList;
