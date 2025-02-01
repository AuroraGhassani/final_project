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
import { VscChevronLeft } from "react-icons/vsc";



const DetailPostPage = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [post, setPost] = useState(null);
    const [newComment, setNewComment] = useState('');
    const [isModalOpen, setIsModalOpen] = useState(false); 

    // users data
    const { profileData, loading, error } = useProfileUser();
    
    // comments & like
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
            navigate(`/profilepage`); 
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
        <Link to={`/profilepage/${id}`} className="text-sm font-semibold text-emerald-500 hover:underline">
            {username}
        </Link>
    );

    const isPostOwner = profileData.id === post.userId;

    console.log("isi post", post);
    
    
    return (
        <main className="max-w-2xl mx-auto my-20 overflow-hidden bg-white rounded-lg shadow-lg opacity-80">
            <Navbar />
            <div className="flex items-center justify-between p-4 ">
                <div className="flex items-center">

                {isPostOwner ? (
                    <button
                        className="flex items-center text-2xl font-medium text-black rounded-lg hover:bg-gray-200 focus:ring-2 focus:ring-gray-300 focus:outline-none"
                        onClick={() => navigate(`/profilepage`)}
                    >
                      <VscChevronLeft className="mr-2 text-gray-500" />
                    </button>
                ) : (
                    <IconBackButton />
                )}

                
                    <div className='pl-5'>
                        <h3 className="font-bold text-gray-800 text-md">{post.user.username}'s Post</h3>
                    </div>
                </div>

                {/* Show edit/delete buttons only if the current user is the post owner */}
                {isPostOwner && (
                    <div className="flex space-x-2">
                        <button
                            className="px-2 py-1 text-sm text-white bg-gray-400 rounded hover:bg-emerald-600"
                            onClick={handleEditPost}
                        >
                            Edit
                        </button>
                        <button
                            className="px-2 py-1 text-sm text-white bg-gray-400 rounded hover:bg-emerald-600"
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
                        className="object-cover w-10 h-10 border-2 rounded-full border-emerald-500"
                        src={post.user.profilePictureUrl}
                        alt={post.user.username}
                        onError={(e) => (e.target.src = "/fallback-avatar.png")}    
                    />
                    <div className="ml-3">
                        {/* Render username as clickable link */}
                        {renderUsernameLink(post.user.id, post.user.username)}
                        <p className="text-xs text-gray-500">{formatDate(post.updatedAt)}</p>
                    </div>
                </div>
            </div>

            {/* images */}
            <div className="flex items-center justify-center w-full bg-gray-100 border border-gray-800 h-96">
                {post.imageUrl ? (
                    <img
                        className="object-cover w-full h-96"
                        src={post.imageUrl}
                        alt={post.caption}
                        onError={(e) => (e.target.src = "/fallback-image.png")}
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
                <p className="mt-2 text-sm font-semibold text-black">
                    {post.totalLikes} {post.totalLikes === 1 ? 'like' : 'likes'}
                </p>

                {/* fitur caption */}
                <p className="mt-3 text-sm text-black">
                    <span className="font-semibold text-emerald-500">{post.user.username}</span> {post.caption}
                </p>

                {/* fitur comments */}
                <div className="mt-3">
                    <h3 className="text-sm font-semibold text-black">Comments</h3>
                    {post.comments.length > 0 ? (
                        post.comments.map((comment, index) => (
                            <div key={comment.id || index} className="flex items-start mt-2">
                                <img
                                    className="object-cover w-8 h-8 rounded-full"
                                    src={comment.user?.profilePictureUrl || '/default-avatar.png'}
                                    alt={comment.user?.username || 'Unknown'}
                                    onError={(e) => (e.target.src = '/fallback-avatar.png')}
                                />
                                
                                <div className="ml-3">
                                    <p className="text-sm text-black">
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
                        <p className="mt-2 text-sm text-gray-400">Belum ada komentar.</p>
                    )}
                </div>


                {/* button add comment */}
                <div className="mt-4">
                    <textarea
                        className="w-full p-2 text-black bg-white border rounded-md"
                        rows="2"
                        placeholder="Add a comment..."
                        value={newComment}
                        onChange={(e) => setNewComment(e.target.value)}
                    ></textarea>
                    <button
                        className="px-4 py-2 mt-2 text-white rounded-md bg-emerald-500"
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
        </main>
    );
};

export default DetailPostPage;
