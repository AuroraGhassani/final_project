import React, { useState, useEffect } from 'react';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import { useCreatePost } from '../../hooks/useCreatePost';
import  useUploadImage from '../../hooks/useUploadImage'; // Import the useUploadImage hook

const CreatePostPage = () => {
    const { postData, loading, uploading, error, success, handleChange, handleFileChange, handleCreatePost } = useCreatePost();

    const [file, setFile] = useState(null);

// butuh handle file change, uploading, loading
    const handleSubmit = async (event) => {
        event.preventDefault();
        
        try {
            await handleCreatePost();
        } catch (error) {
            console.error('Error creating post:', error);
        }
    };

  

    return (
        <main>
            <Navbar />
            <div className="flex flex-col items-center pt-32 pb-20">
                <div className="w-full max-w-lg p-6 bg-white rounded-lg shadow-lg">
                    <h1 className="mb-4 text-xl font-bold text-center">Create New Post</h1>
                    <form onSubmit={handleSubmit}>
                        <div className="mb-4">
                            <label className="block mb-1 text-sm font-medium text-gray-700">Upload Image</label>
                            <input
                                type="file"
                                accept="image/*"
                                className="w-full p-2 border rounded-md"
                                onChange={handleFileChange}
                                required
                            />
                        </div>

                        <div className="mb-4">
                            <label className="block mb-1 text-sm font-medium text-gray-700">Caption</label>
                            <textarea
                                name="caption"
                                className="w-full p-2 border rounded-md"
                                rows="3"
                                value={postData.caption || ''}
                                onChange={handleChange}
                                placeholder="Write a caption for your post"
                                required
                            />
                        </div>

                        <button
                            type="submit"
                            className={`w-full px-4 py-2 text-white rounded-md ${
                                loading
                                    ? 'bg-gray-400 cursor-not-allowed'
                                    : 'bg-blue-500 hover:bg-blue-600'
                            }`}
                            disabled={loading || uploading} // Disable button if creating post or uploading image
                        >
                            {loading || uploading ? 'Processing...' : 'Create Post'}
                        </button>
                    </form>
                </div>
            </div>
            <Footer />
        </main>
    );
};

export default CreatePostPage;
