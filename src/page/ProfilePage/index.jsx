import React, { useState, useEffect } from 'react';
import { Link } from "react-router-dom";
import { useProfileUser } from '../../hooks/useProfileUser';
import usePostsUser from '../../hooks/usePostsUser';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import UserPostList from '../../components/UserPostList';
import { userID } from '../../api/api';
import Popup from '../../components/Popup'; 
import useMyFollowingFollowers from '../../hooks/useMyFollowingFollowers.jsx';

const ProfilePage = () => {
  // state user
  const { profileData, loading, error } = useProfileUser();  // data user login
  const { postCount } = usePostsUser(userID); // data post user login
  // state popup following/followes
  const [isPopupOpen, setIsPopupOpen] = useState(false); 
  const [popupTitle, setPopupTitle] = useState('');
  const [popupItems, setPopupItems] = useState([]); 
  // state jumlah & user following/followers
  const { followers, following, loading: followersLoading, error: followersError } = useMyFollowingFollowers(); 

  const handleShowPopup = (type) => {
    if (type === 'followers') {
      setPopupTitle('Followers');
      setPopupItems(followers || []); 
      
    } else if (type === 'following') {
      setPopupTitle('Following');
      setPopupItems(following || []); 
    }
    setIsPopupOpen(true); //open poppup following/followes
  };

  const handleClosePopup = () => {
    setIsPopupOpen(false); // close popup following/followers
  };

  if (loading) {
    return <p className="text-center text-white">Loading...</p>;
  }

  if (error) {
    return <p className="text-center text-red-500">Error: {error}</p>;
  }

  console.log("isi profile data", profileData); //data salah malah org lain coba check
  return (
    <main className="min-h-screen text-white bg-gray-800">
      <Navbar />
      <div className="max-w-4xl px-2 pt-20 pb-24 mx-auto bg-gray-300 md:px-6">
        {/* Profile Section */}
        <div className="flex flex-col items-center justify-center p-6 ">
          {/* Profile Image */}
          <div className="flex-shrink-0 mb-4 sm:mb-0">
            <img
              src={profileData.profilePictureUrl || 'default-avatar.png'}
              alt="Profile"
              className="object-cover w-24 h-24 border-4 rounded-full shadow-md border-emerald-500 sm:w-32 sm:h-32 md:w-28 md:h-28 lg:w-32 lg:h-32"
              onError={(e) => (e.target.src = "/fallback-avatar.png")}
            />
          </div>

          {/* Profile Details */}
          <div className="flex flex-col mt-2 text-center">
            <p className="text-2xl font-semibold text-black">{profileData.name || 'No Name'}</p>
            <p className="text-sm text-black">@{profileData.username || 'No Username'}</p>
            <p className="mt-2 text-xs text-black">{profileData.bio || 'No Bio'}</p>

            {profileData.website && profileData.website !== 'No Website' && (
              <a
                href={profileData.website}
                target="_blank"
                rel="noopener noreferrer"
                className="block mt-2 text-sm text-green-500 hover:underline"
              >
                {profileData.website}
              </a>
            )}

            {/* Follow, Followers, and Post count */}
            <div className="flex justify-center mt-4 space-x-8 sm:justify-start">
              <div className="text-center">
                <p className="text-lg font-bold text-green-500">{postCount || 0}</p>
                <p className="text-sm text-black">Posts</p>
              </div>
              <div className="text-center cursor-pointer" onClick={() => handleShowPopup('followers')}>
                <p className="text-lg font-bold text-green-500">{followers.length || 0}</p>
                <p className="text-sm text-black">Followers</p>
              </div>
              <div className="text-center cursor-pointer" onClick={() => handleShowPopup('following')}>
                <p className="text-lg font-bold text-green-500">{following.length || 0}</p>
                <p className="text-sm text-black">Following</p>
              </div>
            </div>

            {/* Edit Profile Button */}
            <Link
              to="/editprofile"
              className="px-4 py-2 mt-4 text-sm font-semibold text-white rounded-md shadow-md bg-emerald-500 hover:bg-emerals-600"
            >
              Edit Profile
            </Link>
          </div>
        </div>

        {/* User Posts */}
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
