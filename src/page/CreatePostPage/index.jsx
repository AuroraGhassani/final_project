import React, { useState, useEffect } from 'react';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import { useCreatePost } from '../../hooks/useCreatePost';

const CreatePostPage = () => {
    const { postData, loading, uploading, error, success, handleChange, handleFileChange, handleCreatePost } = useCreatePost();

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            await handleCreatePost();
        } catch (error) {
            console.error('Error creating post:', error);
        }
    };

    return (
        <main className="min-h-screen text-white bg-gray-900">
            <Navbar />
            <div className="flex items-center justify-center min-h-screen px-5 py-12">
                <div className="w-full max-w-md p-6 bg-white rounded-lg shadow-lg bg-opacity-80 md:mx-15">
                    <h1 className="mb-6 text-3xl font-extrabold text-center text-emerald-500 drop-shadow-sm">Create a New Post</h1>
                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div>
                            <label className="block text-sm font-medium text-gray-600">Upload Image</label>
                            <input
                                type="file"
                                accept="image/*"
                                className="w-full px-4 py-2 mt-1 text-gray-800 bg-gray-200 border border-gray-400 rounded-md focus:outline-none focus:ring-emerald-500 focus:border-emerald-500"
                                onChange={handleFileChange}
                                required
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-600">Caption</label>
                            <textarea
                                name="caption"
                                className="w-full px-4 py-2 mt-1 text-gray-800 bg-gray-200 border border-gray-400 rounded-lg focus:ring-emerald-500 focus:border-emerald-500"
                                rows="3"
                                value={postData.caption || ''}
                                onChange={handleChange}
                                placeholder="Write a caption for your post"
                                required
                            />
                        </div>

                        <button
                            type="submit"
                            className={`w-full px-6 py-3 text-lg font-semibold text-white rounded-lg transition duration-300 ${
                                loading || uploading ? 'bg-gray-600 cursor-not-allowed' : 'bg-emerald-500 hover:bg-emerald-600 shadow-lg hover:shadow-xl'
                            }`}
                            disabled={loading || uploading}
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
