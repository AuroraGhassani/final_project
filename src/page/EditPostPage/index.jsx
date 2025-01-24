import React, { useEffect, useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { getPostById } from '../../api/post';
import { useProfileUser } from '../../hooks/useProfileUser';
import useUpdatePost from '../../hooks/useUpdatePost'; // Import hook baru

const EditPostPage = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [post, setPost] = useState(null);
    const { profileData, loading: profileLoading, error: profileError } = useProfileUser(); 
    const { postData, setPostData, updatePostHandler, handleChange, isUpdating, error: updateError } = useUpdatePost(); 

    useEffect(() => {
        const fetchPost = async () => {
            try {
                const data = await getPostById(id);
                setPost(data);
                setPostData((prev) => ({ ...prev, imageUrl: data.imageUrl, caption: data.caption }));
            } catch (error) {
                console.error('Error fetching post details:', error);
            }
        };
        fetchPost();
    }, [id]);

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        return isNaN(date) ? 'Invalid Date' : date.toLocaleString();
    };

    const handleSubmitCaption = async () => {
        try {
            await updatePostHandler(id);
            setTimeout(() => {
                navigate(`/post/${id}`);
            }, 3000);
        } catch (err) {
            console.error('Error updating caption:', err);
            alert('Failed to update caption.');
        }
    };

    const renderUsernameLink = (userId, username) => (
        <Link to={`/profilepage/${userId}`} className="text-sm font-semibold text-blue-500 hover:underline">
            {username}
        </Link>
    );

    if (profileLoading || !post) {
        return <p>Loading...</p>;
    }

    if (profileError) {
        return <p>Error loading profile data: {profileError}</p>;
    }

    console.log("Profile Data:", profileData);
    console.log("Post Data:", postData);


 
    return (
        <div className="max-w-2xl mx-auto my-10 overflow-hidden bg-white rounded-lg shadow-lg">
            <div className="flex items-center justify-between p-4">
                <div className="flex items-center">
                    <div>
                        <h1 className="font-bold font-xl">EDIT POST</h1>
                    </div>
                </div>
            </div>

            <div className="flex items-center justify-between p-4">
                <div className="flex items-center">
                    <img
                        className="object-cover w-10 h-10 rounded-full"
                        src={profileData.profilePictureUrl}
                        alt={profileData.username}
                        onError={(e) => (e.target.src = '/fallback-avatar.png')}
                    />
                    <div className="ml-3">
                        {renderUsernameLink(post.user.id, post.user.username)}
                    </div>
                </div>
            </div>

            {/* Image */}
            <div className="flex items-center justify-center w-full bg-gray-100 h-96">
                <img
                    className="object-cover w-full h-96"
                    src={postData.imageUrl}
                    alt={postData.caption}
                    onError={(e) => (e.target.src = '/fallback-avatar.png')}
                />
            </div>

            {/* Caption Editing */}
            <div className="p-4">
                <form className="mt-3">
                    <label htmlFor="caption" className="block text-sm font-semibold">
                        Edit Caption:
                    </label>
                    <textarea
                        id="caption"
                        name="caption"
                        className="w-full p-2 mt-1 border rounded-md"
                        rows="3"
                        value={postData.caption}
                        onChange={handleChange}
                    />
                    <button
                        type="button"
                        className={`px-4 py-2 mt-3 text-white rounded-md ${
                            isUpdating ? 'bg-gray-400' : 'bg-blue-500 hover:bg-blue-600'
                        }`}
                        onClick={handleSubmitCaption}
                        disabled={isUpdating}
                    >
                        {isUpdating ? 'Submitting...' : 'Submit'}
                    </button>
                </form>
                
            </div>
        </div>
    );
};

export default EditPostPage;
