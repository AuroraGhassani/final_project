import { BiHome, BiImageAdd, BiCamera, BiUser } from "react-icons/bi";
import React from "react";
import { useNavigate } from "react-router-dom";

const Footer = () => {
  const navigate = useNavigate();

  return (
    <footer className="fixed bottom-0 left-0 flex items-center justify-around w-full p-4 text-white shadow-md bg-slate-800">
      {/* Home Button */}
      <button
        onClick={() => navigate('/homepage')}
        className="flex flex-col items-center justify-center p-2 space-y-1 transition rounded-lg hover:bg-slate-700"
      >
        <BiHome className="text-2xl" />
        <span className="text-xs">Home</span>
      </button>

      {/* Create Post Button */}
      <button
        onClick={() => navigate('/createpost')}
        className="flex flex-col items-center justify-center p-2 space-y-1 transition rounded-lg hover:bg-slate-700"
      >
        <BiImageAdd className="text-2xl" />
        <span className="text-xs">Create Post</span>
      </button>

      {/* Create Story Button */}
      <button
        onClick={() => navigate('/createstory')}
        className="flex flex-col items-center justify-center p-2 space-y-1 transition rounded-lg hover:bg-slate-700"
      >
        <BiCamera className="text-2xl" />
        <span className="text-xs">Create Story</span>
      </button>

      {/* Create my following story Button */}
      <button
        onClick={() => navigate('/explore')}
        className="flex flex-col items-center justify-center p-2 space-y-1 transition rounded-lg hover:bg-slate-700"
      >
        <BiCamera className="text-2xl" />
        <span className="text-xs">explore</span>
      </button>

      {/* Profile Button */}
      <button
        onClick={() => navigate('/profilepage')}
        className="flex flex-col items-center justify-center p-2 space-y-1 transition rounded-lg hover:bg-slate-700"
      >
        <BiUser className="text-2xl" />
        <span className="text-xs">Profile</span>
      </button>
    </footer>
  );
};

export default Footer;
