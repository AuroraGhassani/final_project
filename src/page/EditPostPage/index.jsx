import React, { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import useUpdatePost from '../../hooks/useUpdatePost';
import { getPostById } from '../../api/post';
import CancelButton from '../../components/Button/CancelButton';

const EditPostPage = () => {
    const { id } = useParams(); // Ambil ID dari URL
    const navigate = useNavigate();
    const { postData, setPostData, updatePostHandler, handleChange, isUpdating } = useUpdatePost();

    useEffect(() => {
        // Fetch data postingan berdasarkan ID
        const fetchPost = async () => {
            try {
                const post = await getPostById(id);
                setPostData({ imageUrl: post.imageUrl, caption: post.caption }); // Isi form dengan data postingan
            } catch (err) {
                console.error('Error fetching post:', err);
            }
        };

        fetchPost();
    }, [id, setPostData]);

    const handleSubmit = async (e) => {
        e.preventDefault(); // Mencegah refresh halaman
        try {
            await updatePostHandler(id); // Panggil fungsi update post
            navigate(-1); // Redirect ke halaman profil setelah sukses
        } catch (err) {
            console.error('Failed to update post:', err);
        }
    };

    return (
        <main>
            <Navbar />
            <div className="pt-32">
                <div className="max-w-md p-4 mx-auto bg-gray-100 rounded shadow">
                    <div className='flex justify-between'>
                        <h2 className="mb-4 text-lg font-bold">Edit Post</h2>
                        <CancelButton /> 
                    </div>
                    
                    <form onSubmit={handleSubmit}>
                        <div className="mb-4">
                            <label className="block text-sm font-medium text-gray-700">Image URL</label>
                            <input
                                type="text"
                                name="imageUrl"
                                className="block w-full p-2 mt-1 border border-gray-300 rounded"
                                value={postData.imageUrl} // Menggunakan `postData.imageUrl`
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <div className="mb-4">
                            <label className="block text-sm font-medium text-gray-700">Caption</label>
                            <textarea
                                name="caption"
                                className="block w-full p-2 mt-1 border border-gray-300 rounded"
                                value={postData.caption} // Menggunakan `postData.caption`
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <button
                            type="submit"
                            className={`w-full p-2 text-white rounded ${isUpdating ? 'bg-gray-500' : 'bg-blue-500 hover:bg-blue-600'}`}
                            disabled={isUpdating}
                        >
                            {isUpdating ? 'Updating...' : 'Update Post'}
                        </button>
                    </form>
                </div>
            </div>
            <Footer />
        </main>
    );
};

export default EditPostPage;
