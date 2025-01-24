import React, { useState } from 'react';
import useCreateStory from '../../hooks/useCreateStory';
import useImageUrl from '../../hooks/useImageUrl';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';

const CreateStoryPage = () => {
    const [storyData, setStoryData] = useState({ caption: '' }); // State untuk caption
    const { isLoading, error, handleCreateStory } = useCreateStory(); // Hook untuk membuat story
    const { imageUrl, handleFileChange, clearImageUrl } = useImageUrl(); // Hook untuk mengelola file gambar

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!imageUrl) {
            alert('Please upload an image.');
            return;
        }

        await handleCreateStory(
            { imageUrl, caption: storyData.caption }, // Gunakan imageUrl dari useImageUrl
            (response) => {
                console.log('Story created successfully:', response);
                alert('Story created successfully!');
                setStoryData({ caption: '' }); // Reset caption
                clearImageUrl(); // Hapus preview gambar
            },
            (err) => {
                console.error('Failed to create story:', err);
                alert('Failed to create story. Please try again.');
            }
        );
    };

    return (
        <>
        <Navbar/>
        <div className="max-w-md p-6 mx-auto my-10 mt-32 bg-white rounded-lg shadow-lg">
            <h1 className="mb-4 text-lg font-bold">Create a New Story</h1>
            <form onSubmit={handleSubmit}>
                <div className="mb-4">
                    <label className="block mb-1 text-sm font-medium">Upload Image</label>
                    <input
                        type="file"
                        accept="image/*"
                        className="w-full"
                        onChange={(e) => handleFileChange(e.target.files[0])} // Proses file gambar
                    />
                    {imageUrl && (
                        <div className="mt-4">
                            <p className="text-sm font-medium">Preview:</p>
                            <img
                                src={imageUrl}
                                alt="Preview"
                                className="object-contain w-full h-48 mt-2 rounded-md"
                            />
                            <button
                                type="button"
                                className="px-4 py-2 mt-2 text-white bg-red-500 rounded-md hover:bg-red-600"
                                onClick={clearImageUrl}
                            >
                                Remove Image
                            </button>
                        </div>
                    )}
                </div>
                <div className="mb-4">
                    <label className="block mb-1 text-sm font-medium">Caption</label>
                    <textarea
                        className="w-full p-2 border rounded-md"
                        rows="3"
                        value={storyData.caption}
                        onChange={(e) => setStoryData({ caption: e.target.value })}
                        placeholder="Write a caption..."
                    ></textarea>
                </div>
                {error && <p className="text-sm text-red-500">Error: {error.message}</p>}
                <button
                    type="submit"
                    className={`w-full px-4 py-2 text-white rounded-md ${
                        isLoading ? 'bg-gray-400 cursor-not-allowed' : 'bg-blue-500 hover:bg-blue-600'
                    }`}
                    disabled={isLoading}
                >
                    {isLoading ? 'Creating...' : 'Create Story'}
                </button>
            </form>
        </div>
        <Footer/>
    </>
    );
};

export default CreateStoryPage;
