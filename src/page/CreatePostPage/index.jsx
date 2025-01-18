// pages/CreatePostPage.js
import React from 'react';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import { useCreatePost } from '../../hooks/useCreatePost';

const CreatePostPage = () => {
    const { postData, handleCreatePost, loading, error, handleChange, success } = useCreatePost();

    const handleSubmit = (e) => {
        e.preventDefault(); // Mencegah refresh halaman
        console.log('Submitting post data:', postData); // Debugging

        handleCreatePost(); // Panggil fungsi create post
    };

    return (
        <main>
            <Navbar />
            <div className="pt-32">
                <div className="max-w-md p-4 mx-auto bg-gray-100 rounded shadow">
                    <h2 className="mb-4 text-lg font-bold">Create New Post</h2>
                    {success && <p className="text-green-500">Post created successfully!</p>}
                    {error && <p className="text-red-500">{error}</p>}
                    <form onSubmit={handleSubmit}>
                        <div className="mb-4">
                            <label className="block text-sm font-medium text-gray-700">Image URL</label>
                            <input
                                type="text"
                                name="imageUrl"
                                className="block w-full p-2 mt-1 border border-gray-300 rounded"
                                value={postData.imageUrl}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <div className="mb-4">
                            <label className="block text-sm font-medium text-gray-700">Caption</label>
                            <textarea
                                name="caption"
                                className="block w-full p-2 mt-1 border border-gray-300 rounded"
                                value={postData.caption}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <button
                            type="submit"
                            className={`w-full p-2 text-white rounded ${loading ? 'bg-gray-500' : 'bg-blue-500 hover:bg-blue-600'}`}
                            disabled={loading}
                        >
                            {loading ? 'Creating...' : 'Create Post'}
                        </button>
                    </form>
                </div>
            </div>
            <Footer />
        </main>
    );
};

export default CreatePostPage;
