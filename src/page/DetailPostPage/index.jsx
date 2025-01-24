import React, { useEffect, useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { getPostById, deletePost } from '../../api/post'; 
import { FaHeart, FaRegHeart } from 'react-icons/fa';
import useAddComment from '../../hooks/useAddComment'; 
import useDeleteComment from '../../hooks/useDeleteComment'; 
import useToggleLike from '../../hooks/useToogleLike'; 
import ConfirmModal from '../../components/Common/ConfirmModal'; 
import { useProfileUser } from '../../hooks/useProfileUser'; 
import NoImage from '../../components/Common/NoImage';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import IconBackButton from '../../components/Button/IconBackButton';



const DetailPostPage = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [post, setPost] = useState(null);
    const [newComment, setNewComment] = useState('');
    const [isModalOpen, setIsModalOpen] = useState(false); 

    const { profileData, loading, error } = useProfileUser();
    const { isCommenting, handleAddComment } = useAddComment(id, setPost); 
    const { isDeleting, handleDeleteComment } = useDeleteComment(setPost); 
    const { isLiking, handleToggleLike } = useToggleLike(post, setPost); 

  

    
    // ambil data potingan berdasarkan id
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
            await deletePost(id);
            navigate(-1); 
        } catch (error) {
            console.error('Error deleting post:', error);
        }
    };

    const handleEditPost = () => {
        navigate(`/editPost/${id}`); 
    };

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        return isNaN(date) ? "Invalid Date" : date.toLocaleString();
    };

    if (loading || !post) {
        return (
            <div className="flex items-center justify-center h-screen">
                <p className="text-lg font-semibold">Loading...</p>
            </div>
        );
    }

   // function to render username links
    const renderUsernameLink = (id, username) => (
        <Link to={`/profilepage/${id}`} className="text-sm font-semibold text-blue-500 hover:underline">
            {username}
        </Link>
    );

    const isPostOwner = profileData.id === post.userId;
    
    
    return (
        <div className="max-w-2xl mx-auto my-20 overflow-hidden bg-white rounded-lg shadow-lg">
            <Navbar />
            <div className="flex items-center justify-between p-4">
                <div className="flex items-center">

                    {!isPostOwner && <IconBackButton />}
                
                    <div>
                        <h3 className="font-bold text-md">{post.user.username}'s</h3>
                        <h1 className="font-bold font-xl">POST</h1>
                    </div>
                </div>

                {/* Show edit/delete buttons only if the current user is the post owner */}
                {isPostOwner && (
                    <div className="flex space-x-2">
                        <button
                            className="px-2 py-1 text-sm text-white bg-blue-400 rounded hover:bg-blue-600"
                            onClick={handleEditPost}
                        >
                            Edit
                        </button>
                        <button
                            className="px-2 py-1 text-sm text-white bg-red-400 rounded hover:bg-red-600"
                            onClick={() => setIsModalOpen(true)}
                        >
                            Delete
                        </button>
                    </div>
                )}
            </div>

            <div className="flex items-center justify-between p-4">
                <div className="flex items-center">
                    <img
                        className="object-cover w-10 h-10 rounded-full"
                        src={post.user.profilePictureUrl}
                        alt={post.user.username}
                    />
                    <div className="ml-3">
                        {/* Render username as clickable link */}
                        {renderUsernameLink(post.user.id, post.user.username)}
                        <p className="text-xs text-gray-500">{formatDate(post.updatedAt)}</p>
                    </div>
                </div>
            </div>

            {/* images */}
            <div className="flex items-center justify-center w-full bg-gray-100 h-96">
                {post.imageUrl ? (
                    <img
                        className="object-cover w-full h-96"
                        src={post.imageUrl}
                        alt={post.caption}
                    />
                ) : (
                    <NoImage /> 
                )}
            </div>

            <div className="p-4">
                {/* fitur like */}
                <div className="flex items-center space-x-4">
                    {post.isLike ? (
                        <FaHeart
                            className={`text-2xl cursor-pointer ${isLiking ? 'text-gray-400' : 'text-red-500'}`}
                            onClick={handleToggleLike}
                        />
                    ) : (
                        <FaRegHeart
                            className={`text-2xl cursor-pointer ${isLiking ? 'text-gray-400' : 'text-gray-600'}`}
                            onClick={handleToggleLike}
                        />
                    )}
                </div>
                <p className="mt-2 text-sm font-semibold">
                    {post.totalLikes} {post.totalLikes === 1 ? 'like' : 'likes'}
                </p>

                {/* fitur caption */}
                <p className="mt-3 text-sm">
                    <span className="font-semibold">{post.user.username}</span> {post.caption}
                </p>

                {/* fitur comments */}
                <div className="mt-3">
                    <h3 className="text-sm font-semibold">Comments</h3>
                    {post.comments.length > 0 ? (
                        post.comments.map((comment, index) => (
                            <div key={comment.id || index} className="flex items-start mt-2">
                                <img
                                    className="object-cover w-8 h-8 rounded-full"
                                    src={comment.user?.profilePictureUrl || '/default-avatar.png'}
                                    alt={comment.user?.username || 'Unknown'}
                                />
                                
                                <div className="ml-3">
                                    <p className="text-sm">
                                        {/* Render commenter's username as clickable link */}
                                        {renderUsernameLink(comment.user?.id, comment.user?.username || 'Unknown')}
                                        {` ${comment.comment}`}
                                    </p>
                                    
                                    {/* memunculkan delete button */}
                                    {comment.user?.id === profileData.id && (
                                        <button
                                            className="text-xs text-red-500 hover:underline"
                                            onClick={() => handleDeleteComment(comment.id)}
                                            disabled={isDeleting}
                                        >
                                            Delete
                                        </button>
                                    )}
                                </div>
                            </div>
                        ))
                    ) : (
                        <p className="mt-2 text-sm text-gray-500">Belum ada komentar.</p>
                    )}
                </div>


                {/* button add comment */}
                <div className="mt-4">
                    <textarea
                        className="w-full p-2 border rounded-md"
                        rows="2"
                        placeholder="Add a comment..."
                        value={newComment}
                        onChange={(e) => setNewComment(e.target.value)}
                    ></textarea>
                    <button
                        className="px-4 py-2 mt-2 text-white bg-blue-500 rounded-md"
                        onClick={() => handleAddComment(newComment)}
                        disabled={isCommenting}
                    >
                        {isCommenting ? 'Adding...' : 'Comment'}
                    </button>
                </div>
            </div>

            {/* Confirm Modal */}
            <ConfirmModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                onConfirm={handleDeletePost}
                message="Are you sure you want to delete this post?"
            />
            <Footer />
        </div>
    );
};

export default DetailPostPage;
