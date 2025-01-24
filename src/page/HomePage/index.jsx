import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import { FaHeart, FaRegHeart } from "react-icons/fa";
import usePostManagement from "../../hooks/usePostManagement";
import usePostInteractions from "../../hooks/usePostInteraction";
import { Link } from "react-router-dom";
import StoryList from "../../components/StoryList";

const HomePage = () => {
  const { allPosts, loading, error, setAllPosts } = usePostManagement();
  const {
    isLiking,
    isCommenting,
    newComments,
    toggleLikePost,
    addCommentToPost,
    handleCommentChange,
  } = usePostInteractions(setAllPosts);

  if (loading && allPosts.length === 0) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <main>
      <Navbar />
      <div className="p-4 mt-10">
      <StoryList />
        {allPosts.map((post, index) => (
          <div
            key={`${post.id || post.username}-${index}`}
            className="max-w-3xl p-4 mx-auto mb-5 border border-gray-300 rounded-lg"
          >
            {/* Header: Profile photo and username */}
            <div className="flex items-center mb-4">
              <img
                src={post.user?.profilePictureUrl || "/default-avatar.png"}
                alt={`${post.user?.username || "Unknown"}'s profile`}
                className="w-12 h-12 mr-4 rounded-full"
                onError={(e) => (e.target.src = "/fallback-avatar.png")}
              />
              <Link
                to={`/profilepage/${post.user?.id || ""}`}
                className="text-xl font-semibold text-blue-500 hover:underline"
              >
                {post.user?.username || "Unknown"}
              </Link>
            </div>

            {/* Post Image */}
            <div className="flex items-center justify-center w-full bg-gray-100 h-96">
              {post.imageUrl ? (
                <img
                  className="object-cover w-full h-full rounded-lg"
                  src={post.imageUrl}
                  alt={post.caption || "Post image"}
                  onError={(e) => (e.target.src = "/fallback-image.png")}
                />
              ) : (
                <div className="flex items-center justify-center w-full h-full bg-gray-300 rounded-lg">
                  <p>No Image Available</p>
                </div>
              )}
            </div>

            {/* Caption */}
            <p className="mt-3 text-sm">
              <Link
                to={`/profilepage/${post.user?.id || ""}`}
                className="font-semibold text-blue-500 hover:underline"
              >
                {post.user?.username}
              </Link>{" "}
              {post.caption}
            </p>

            {/* Footer: Post Interaction Buttons */}
            <div className="flex items-center justify-between mt-4">
              <button
                onClick={() => toggleLikePost(post.id)}
                className="flex items-center text-gray-600 cursor-pointer"
                disabled={isLiking}
              >
                {post.isLike ? (
                  <FaHeart className="text-xl text-red-500" />
                ) : (
                  <FaRegHeart className="text-xl text-gray-600" />
                )}
                <span className="ml-2">
                  {post.totalLikes} {post.totalLikes === 1 ? "like" : "likes"}
                </span>
              </button>
            </div>

            {/* Comments Section */}
            <div className="mt-3">
              <h3 className="text-sm font-semibold">Comments</h3>
              {post.comments?.length > 0 ? (
                post.comments.map((comment, index) => (
                  <div key={comment.id || index} className="flex items-start mt-2">
                    <img
                      className="object-cover w-8 h-8 rounded-full"
                      src={comment.user?.profilePictureUrl || "/default-avatar.png"}
                      alt={comment.user?.username || "Unknown"}
                      onError={(e) => (e.target.src = "/fallback-avatar.png")}
                    />
                    <div className="ml-3">
                      <p className="text-sm">
                        <Link
                          to={`/profile/${comment.user?.id || ""}`}
                          className="font-semibold text-blue-500 hover:underline"
                        >
                          {comment.user?.username || "Unknown"}
                        </Link>{" "}
                        {comment.comment}
                      </p>
                    </div>
                  </div>
                ))
              ) : (
                <p className="mt-2 text-sm text-gray-500">No comments yet.</p>
              )}
            </div>

            {/* Add Comment */}
            <div className="mt-4">
              <textarea
                className="w-full p-2 border rounded-md"
                rows="2"
                placeholder="Add a comment..."
                value={newComments[post.id] || ""}
                onChange={(e) => handleCommentChange(post.id, e.target.value)}
              ></textarea>
              <button
                className="px-4 py-2 mt-2 text-white bg-blue-500 rounded-md"
                onClick={() =>
                  addCommentToPost(post.id, newComments[post.id] || "")
                }
                disabled={isCommenting}
              >
                {isCommenting ? "Adding..." : "Comment"}
              </button>
            </div>
          </div>
        ))}
        {loading && <p>Loading more posts...</p>}
      </div>
      <Footer />
    </main>
  );
};

export default HomePage;
