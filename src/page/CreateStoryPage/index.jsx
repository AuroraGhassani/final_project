import React, { useState } from "react";
import useCreateStory from "../../hooks/useCreateStory";
import useImageUrl from "../../hooks/useImageUrl";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import { useNavigate } from "react-router-dom";

const CreateStoryPage = () => {
  const [storyData, setStoryData] = useState({ caption: "" });
  const [successMessage, setSuccessMessage] = useState(""); // State untuk pesan sukses
  const { isLoading, error, handleCreateStory } = useCreateStory();
  const { imageUrl, handleFileChange, clearImageUrl } = useImageUrl();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!imageUrl) {
      alert("Please upload an image.");
      return;
    }

    await handleCreateStory(
      { imageUrl, caption: storyData.caption },
      (response) => {
        console.log("Story created successfully:", response);
        setSuccessMessage("Story created successfully!");

        setTimeout(() => {
          setStoryData({ caption: "" });
          setSuccessMessage(""); 
          navigate("/homepage");
        }, 2000); 
      },
      (err) => {
        console.error("Failed to create story:", err);
        alert("Failed to create story. Please try again.");
      }
    );
  };

  return (
    <main className="min-h-screen text-white bg-gray-900">
      <Navbar />
      <div className="flex items-center justify-center min-h-screen px-5 py-12">
        <div className="w-full max-w-md p-6 bg-white rounded-lg shadow-lg bg-opacity-80 md:mx-15">
          <h1 className="mb-6 text-3xl font-extrabold text-center text-emerald-500 drop-shadow-sm">
            Create a New Story
          </h1>
          
          {successMessage && (
            <div className="p-1 mb-4 text-center text-green-800 bg-green-200 rounded-2xl">
              {successMessage}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Upload Image */}
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-600">
                Upload Image
              </label>
              <input
                type="file"
                accept="image/*"
                className="w-full px-4 py-2 mt-1 text-gray-800 bg-gray-200 border border-gray-400 rounded-md focus:outline-none focus:ring-emerald-500 focus:border-emerald-500"
                onChange={(e) => handleFileChange(e.target.files[0])}
                required
              />
              {imageUrl && (
                <div className="mt-4">
                  <p className="text-sm font-medium text-gray-700">Preview:</p>
                  <img
                    src={imageUrl}
                    alt="Preview"
                    className="object-cover w-full h-64 mt-2 rounded-md"
                  />
                  <button
                    type="button"
                    className="px-4 py-2 mt-4 text-sm text-white bg-red-500 rounded-md hover:bg-red-600"
                    onClick={clearImageUrl}
                  >
                    Remove Image
                  </button>
                </div>
              )}
            </div>

            {/* Error Message */}
            {error && (
              <p className="mb-4 text-sm text-red-500">Error: {error.message}</p>
            )}

            {/* Submit Button */}
            <button
              type="submit"
              className={`w-full px-6 py-3 text-lg font-semibold text-white rounded-lg transition duration-300 ${
                isLoading
                  ? "bg-gray-600 cursor-not-allowed"
                  : "bg-emerald-500 hover:bg-emerald-600 shadow-lg hover:shadow-xl"
              }`}
              disabled={isLoading}
            >
              {isLoading ? "Processing..." : "Create Story"}
            </button>
          </form>
        </div>
      </div>
      <Footer />
    </main>
  );
};

export default CreateStoryPage;
