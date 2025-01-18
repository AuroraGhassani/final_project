import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getPostById } from '../../api/post';
import useUpdatePost from '../../hooks/useUpdatePost';
import useDeletePost from '../../hooks/useDeletePost';
import { FaHeart, FaRegHeart, FaEllipsisH } from 'react-icons/fa';
import IconBackButton from '../../components/Button/IconBackButton';
import ConfirmModal from '../../components/Common/ConfirmModal'; // Import modal konfirmasi

const DetailPostPage = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [post, setPost] = useState(null);
    const [showOptions, setShowOptions] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false); // Tambahkan state untuk modal

    const { deletePostHandler, isDeleting } = useDeletePost();

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        return `${date.toLocaleDateString()} ${date.toLocaleTimeString()}`;
    };

    useEffect(() => {
        const fetchPost = async () => {
            try {
                const data = await getPostById(id);
                setPost(data);
            } catch (error) {
                console.error('Error fetching post details:', error);
            }
        };
        fetchPost();
    }, [id]);

    const handleDeletePost = async () => {
        try {
            await deletePostHandler(id);
            navigate('/profilepage');
        } catch (error) {
            alert('Failed to delete post.');
        }
    };

    if (!post) {
        return (
            <div className="flex items-center justify-center h-screen">
                <p className="text-lg font-semibold">Loading...</p>
            </div>
        );
    }

    return (
        <div className="max-w-2xl mx-auto my-10 overflow-hidden bg-white rounded-lg shadow-lg">
            <div className="flex">
                <IconBackButton />
                <div>
                    <h3 className="font-bold text-md">{post.user.username}'s</h3>
                    <h1 className="font-bold font-xl">POST</h1>
                </div>
            </div>

            <div className="flex items-center justify-between p-4">
                <div className="flex items-center">
                    <img
                        className="object-cover w-10 h-10 rounded-full"
                        src={post.user.profilePictureUrl}
                        alt={post.user.username}
                    />
                    <div className="ml-3">
                        <h2 className="text-sm font-semibold">{post.user.username}</h2>
                        <p className="text-xs text-gray-500">{formatDate(post.updatedAt)}</p>
                    </div>
                </div>

                <div className="relative">
                    <button
                        className="text-gray-600 hover:text-gray-900"
                        onClick={() => setShowOptions(!showOptions)}
                    >
                        <FaEllipsisH />
                    </button>
                    {showOptions && (
                        <div className="absolute right-0 z-10 w-32 py-2 mt-2 bg-white border rounded-md shadow-md">
                            <button
                                className="block w-full px-4 py-2 text-sm text-left text-gray-700 hover:bg-gray-100"
                                onClick={() => {
                                    navigate(`/edit-post/${id}`); // Navigasi ke halaman editPostPage
                                    setShowOptions(false);
                                }}
                            >
                                Edit
                            </button>
                            <button
                                className="block w-full px-4 py-2 text-sm text-left text-red-500 hover:bg-gray-100"
                                onClick={() => {
                                    setIsModalOpen(true); // Tampilkan modal
                                    setShowOptions(false);
                                }}
                                disabled={isDeleting}
                            >
                                {isDeleting ? 'Deleting...' : 'Delete'}
                            </button>
                        </div>
                    )}
                </div>
            </div>

            <div className="flex items-center justify-center w-full bg-gray-100 h-96">
                {post.imageUrl ? (
                    <img
                        className="object-cover w-full h-full"
                        src={post.imageUrl}
                        alt={post.caption}
                    />
                ) : (
                    <p className="text-gray-500">No Image</p>
                )}
            </div>

            <div className="p-4">
                <div className="flex items-center space-x-4">
                    {post.isLike ? (
                        <FaHeart className="text-2xl text-red-500 cursor-pointer" />
                    ) : (
                        <FaRegHeart className="text-2xl text-gray-600 cursor-pointer" />
                    )}
                </div>

                <p className="mt-2 text-sm font-semibold">
                    {post.totalLikes} {post.totalLikes === 1 ? 'like' : 'likes'}
                </p>

                <p className="mt-3 text-sm">
                    <span className="font-semibold">{post.user.username}</span> {post.caption}
                </p>

                <div className="mt-3">
                    <h3 className="text-sm font-semibold">Comments</h3>
                    {post.comments.map((comment, index) => (
                        <div key={index} className="flex items-start mt-2">
                            <img
                                className="object-cover w-8 h-8 rounded-full"
                                src={comment.user.profilePictureUrl}
                                alt={comment.user.username}
                            />
                            <div className="ml-3">
                                <p className="text-sm">
                                    <span className="font-semibold">{comment.user.username}</span> {comment.text}
                                </p>
                                <p className="text-xs text-gray-500">{formatDate(comment.updatedAt)}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            <ConfirmModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                onConfirm={handleDeletePost}
                message="Are you sure you want to delete this post?"
            />
        </div>
    );
};

export default DetailPostPage;
