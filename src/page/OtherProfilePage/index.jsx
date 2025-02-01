import React, { useState, useEffect } from 'react';
import { useOtherProfileUser } from '../../hooks/useOtherProfileUser';
import usePosts from '../../hooks/usePosts';
import useFollowingAndFollowers from '../../hooks/useGetFollowingFollowers';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import PostList from '../../components/PostList';
import FollowButton from '../../components/Common/FollowButton';
import Popup from '../../components/Popup'; 
import useMyFollowingAndFollowers from '../../hooks/useMyFollowingFollowers';
import BackButton from '../../components/BackButton';

const OtherProfilePage = () => {
  const { profileData, loading, error } = useOtherProfileUser();
  const id = profileData?.id;
  const { postCount } = usePosts(id);
  const { followers, following, loading: followersLoading, error: followersError } = useFollowingAndFollowers();
  const { followers: myFollowers, following: myFollowing } = useMyFollowingAndFollowers();
  const [isFollowing, setIsFollowing] = useState(false);
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [popupTitle, setPopupTitle] = useState('');
  const [popupItems, setPopupItems] = useState([]);
  const [followersCount, setFollowersCount] = useState(0);
  const [followingCount, setFollowingCount] = useState(0);

  useEffect(() => {
    if (myFollowing && id) {
      setIsFollowing(myFollowing.some(user => user.id === id));
    }
  }, [myFollowing, id]);

  useEffect(() => {
    setFollowersCount(followers?.length || 0);
  }, [followers]);

  useEffect(() => {
    setFollowingCount(following?.length || 0);
  }, [following]);

  const handleFollowChange = (newFollowStatus) => {
    setIsFollowing(newFollowStatus);
    setFollowersCount((prev) => (newFollowStatus ? prev + 1 : prev > 0 ? prev - 1 : 0));
  };

  const handleShowPopup = (type) => {
    setPopupTitle(type === 'followers' ? 'Followers' : 'Following');
    setPopupItems(type === 'followers' ? followers : following);
    setIsPopupOpen(true);
  };

  const handleClosePopup = () => setIsPopupOpen(false);

  if (loading || followersLoading) return <p className="text-center text-white">Loading...</p>;
  if (error || followersError) return <p className="text-center text-red-500">Error loading profile or followers data.</p>;

  return (
    <main className="min-h-screen text-white bg-gray-900">
      <Navbar />
      
      <div className="max-w-4xl px-6 pt-20 pb-24 mx-auto bg-gray-800 rounded-lg shadow-lg">
        <div className='pt-5 pl-5'><BackButton/></div>
        {/* Profile Section */}
        <div className="flex flex-col items-center justify-center pb-5">
          <img
            src={profileData?.profilePictureUrl || 'default-avatar.png'}
            alt="Profile"
            className="object-cover w-24 h-24 border-4 border-green-500 rounded-full shadow-md sm:w-32 sm:h-32"
          />
          <div className="flex flex-col mt-2 text-center">
            <p className="text-2xl font-semibold text-white">{profileData?.name || 'No Name'}</p>
            <p className="text-sm text-white">@{profileData?.username || 'No Username'}</p>
            <p className="mt-2 text-xs text-white">{profileData?.bio || 'No Bio'}</p>
            {profileData?.website && (
              <a href={profileData.website} target="_blank" rel="noopener noreferrer" className="block mt-2 text-sm text-green-500 hover:underline">
                {profileData.website}
              </a>
            )}
            <div className="flex justify-center mt-4 space-x-8">
              <div className="text-center">
                <p className="text-lg font-bold text-green-500">{postCount || 0}</p>
                <p className="text-sm text-white">Posts</p>
              </div>
              <div className="text-center cursor-pointer" onClick={() => handleShowPopup('followers')}>
                <p className="text-lg font-bold text-green-500">{followersCount}</p>
                <p className="text-sm text-white">Followers</p>
              </div>
              <div className="text-center cursor-pointer" onClick={() => handleShowPopup('following')}>
                <p className="text-lg font-bold text-green-500">{followingCount}</p>
                <p className="text-sm text-white">Following</p>
              </div>
            </div>
            <FollowButton userId={id} isFollowing={isFollowing} onFollowChange={handleFollowChange} />
          </div>
        </div>
        <PostList userId={id} />
      </div>
      {isPopupOpen && <Popup title={popupTitle} items={popupItems} onClose={handleClosePopup} />}
      <Footer />
    </main>
  );
};

export default OtherProfilePage;
