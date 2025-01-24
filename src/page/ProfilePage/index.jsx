import React, { useState, useEffect } from 'react';
import { Link } from "react-router-dom";
import { useProfileUser } from '../../hooks/useProfileUser';
import usePostsUser from '../../hooks/usePostsUser';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import UserPostList from '../../components/UserPostList';
import { userID } from '../../api/api';
import Popup from '../../components/Popup'; // Import the Popup component
import useMyFollowingFollowers from '../../hooks/useMyFollowingFollowers';

const ProfilePage = () => {
  // state user
  const { profileData, loading, error } = useProfileUser(); 
  const { postCount } = usePostsUser(userID); 
  // state popup
  const [isPopupOpen, setIsPopupOpen] = useState(false); 
  const [popupTitle, setPopupTitle] = useState('');
  const [popupItems, setPopupItems] = useState([]);
  // state follower
  const { followers, following, loading: followersLoading, error: followersError } = useMyFollowingFollowers();
  

  const handleShowPopup = (type) => {
    if (type === 'followers') {
      setPopupTitle('Followers');
      setPopupItems(followers || []); // Assuming profileData contains the followers
      
    } else if (type === 'following') {
      setPopupTitle('Following');
      setPopupItems(following || []); // Assuming profileData contains the following
    }
    setIsPopupOpen(true); // Open popup
  };

  const handleClosePopup = () => {
    setIsPopupOpen(false); // Close popup
  };

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p className="text-red-500">Error: {error}</p>;
  }
// console.log("ini isi postcount:", postCount)
  
  return (
    <main className="bg-gray-50">
      <Navbar />
      <div className="max-w-6xl px-4 pt-20 pb-32 mx-auto bg-white rounded-lg shadow-md sm:pt-24 sm:flex-row sm:items-start sm:justify-between sm:space-x-8">
        {/* Profile Section */}
        <div className="flex flex-col items-center justify-center p-6">
          {/* Profile Image */}
          <div className="flex-shrink-0 mb-4 sm:mb-0">
            <img
              src={profileData.profilePictureUrl || 'default-avatar.png'}
              alt="Profile"
              className="object-cover w-24 h-24 border-4 border-gray-300 rounded-full shadow-md sm:w-32 sm:h-32"
            />
          </div>

          {/* Profile Details */}
          <div className="flex flex-col text-center">
            <p className="text-2xl font-semibold text-gray-800">{profileData.name || 'No Name'}</p>
            <p className="text-lg text-gray-600">@{profileData.username || 'No Username'}</p>
            <p className="mt-2 text-sm text-gray-500">{profileData.bio || 'No Bio'}</p>

            {profileData.website && profileData.website !== 'No Website' && (
              <a
                href={profileData.website}
                target="_blank"
                rel="noopener noreferrer"
                className="block mt-2 text-sm text-blue-500 hover:underline"
              >
                {profileData.website}
              </a>
            )}

            <div className="flex justify-center mt-4 space-x-8 sm:justify-start">
              <div className="text-center">
                <p className="text-lg font-bold text-gray-800">{postCount || 0}</p>
                <p className="text-sm text-gray-600">Posts</p>
              </div>
              <div className="text-center cursor-pointer" onClick={() => handleShowPopup('followers')}>
                <p className="text-lg font-bold text-gray-800">{followers.length || 0}</p>
                <p className="text-sm text-gray-600">Followers</p>
              </div>
              <div className="text-center cursor-pointer" onClick={() => handleShowPopup('following')}>
                <p className="text-lg font-bold text-gray-800">{following.length || 0}</p>
                <p className="text-sm text-gray-600">Following</p>
              </div>
            </div>

            <Link
              to="/editprofile"
              className="px-4 py-2 mt-4 text-sm font-semibold text-white bg-blue-500 rounded-md shadow-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400"
            >
              Edit Profile
            </Link>
          </div>
        </div>

        <UserPostList />
      </div>

      {isPopupOpen && (
        <Popup 
          title={popupTitle} 
          items={popupItems} 
          onClose={handleClosePopup} 
        />
      )}

      <Footer />
    </main>
  );
};

export default ProfilePage;
