import React, { useState, useEffect } from 'react';
import { useOtherProfileUser } from '../../hooks/useOtherProfileUser';
import usePosts from '../../hooks/usePosts';
import useFollowingAndFollowers from '../../hooks/useGetFollowingFollowers';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import PostList from '../../components/PostList';
import FollowButton from '../../components/Common/FollowButton';
import Popup from '../../components/Popup'; 

import { userID } from '../../api/api'; 

const OtherProfilePage = () => {
  // state user
  const { profileData, loading, error } = useOtherProfileUser();
  const id = profileData?.id;
  const { postCount } = usePosts(id);
  // state following
  const { followers, following, loading: followersLoading, error: followersError } = useFollowingAndFollowers(id);
  const [isFollowing, setIsFollowing] = useState(false);

  // state popup
  const [isPopupOpen, setIsPopupOpen] = useState(false); 
  const [popupTitle, setPopupTitle] = useState('');
  const [popupItems, setPopupItems] = useState([]);

  // Pastikan profileData dan following sudah ada sebelum mengecek isFollowing
  useEffect(() => {
    if (profileData && following && userID) {
      const isCurrentlyFollowing = following.some(user => user.id === userID);
      // console.log('isCurrentlyFollowing:', isCurrentlyFollowing);
      setIsFollowing(isCurrentlyFollowing);
    }
  }, [following, profileData, userID]);

  const handleFollowChange = () => {
    try {
      setIsFollowing(prevIsFollowing => !prevIsFollowing);
    } catch (error) {
      console.log(error);
    }
  };

  const handleShowPopup = (type) => {
    if (type === 'followers') {
      setPopupTitle('Followers');
      setPopupItems(followers);
    } else {
      setPopupTitle('Following');
      setPopupItems(following);
    }
    setIsPopupOpen(true);
  };

  const handleClosePopup = () => {
    setIsPopupOpen(false);
  };

  const followersCount = followers?.length || 0;
  const followingCount = following?.length || 0;

  if (loading || followersLoading) {
    return <div>Loading...</div>;
  }

  if (error || followersError) {
    return <div>Error loading profile or followers data.</div>;
  }

  return (
    <main className="px-10 py-10 bg-gray-50">
      <Navbar />
      <div className="max-w-6xl px-4 pb-32 mx-auto bg-white rounded-lg shadow-md sm:pt-24 sm:flex-row sm:items-start sm:justify-between sm:space-x-8">
    
        {/* Profile Section */}
        <div className="flex flex-col items-center justify-center p-6">
          <div className="flex-shrink-0 mb-4 sm:mb-0">
            <img
              src={profileData?.profilePictureUrl || 'default-avatar.png'}
              alt="Profile"
              onError={(e) => (e.target.src = "/fallback-avatar.png")}
              className="object-cover w-24 h-24 border-4 border-gray-300 rounded-full shadow-md sm:w-32 sm:h-32"
            />
          </div>

          <div className="flex flex-col text-center">
            <p className="text-2xl font-semibold text-gray-800">{profileData?.name || 'No Name'}</p>
            <p className="text-lg text-gray-600">@{profileData?.username || 'No Username'}</p>
            <p className="mt-2 text-sm text-gray-500">{profileData?.bio || 'No Bio'}</p>
            
            {profileData?.website && profileData.website !== 'No Website' && (
              <a
                href={profileData.website}
                target="_blank"
                rel="noopener noreferrer"
                className="block mt-2 text-sm text-blue-500 hover:underline"
              >
                {profileData.website}
              </a>
            )}

            <div className="mt-4">
              <FollowButton 
                userId={profileData?.id} // Lempar id ke follow button
                isFollowing={isFollowing} 
                onFollowChange={handleFollowChange} 
              />
            </div>

            <div className="flex justify-center mt-4 space-x-8 sm:justify-start">
              <div className="text-center cursor-pointer">
                <p className="text-lg font-bold text-gray-800">{postCount || 0}</p>
                <p className="text-sm text-gray-600">Posts</p>
              </div>
              <div className="text-center cursor-pointer" onClick={() => handleShowPopup('followers')}>
                <p className="text-lg font-bold text-gray-800">{followersCount}</p>
                <p className="text-sm text-gray-600">Followers</p>
              </div>
              <div className="text-center cursor-pointer" onClick={() => handleShowPopup('following')}>
                <p className="text-lg font-bold text-gray-800">{followingCount}</p>
                <p className="text-sm text-gray-600">Following</p>
              </div>
            </div>
          </div>
        </div>

        {/* Post List Component */}
        <PostList userId={id} />
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

export default OtherProfilePage;
