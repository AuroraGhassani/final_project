import { BiHome, BiImageAdd, BiUser } from "react-icons/bi";
import { MdOutlineExplore } from "react-icons/md";
import React from "react";
import { useNavigate } from "react-router-dom";

const Footer = () => {
  const navigate = useNavigate();

  return (
    <footer className="fixed bottom-0 left-0 right-0 flex items-center justify-around w-full max-w-4xl px-6 py-3 mx-auto text-black bg-white bg-opacity-50 shadow-lg backdrop-blur-lg rounded-t-3xl">
      {/* Home Button */}
      <button
        onClick={() => navigate('/homepage')}
        className="flex flex-col items-center justify-center p-2 space-y-1 transition rounded-lg hover:bg-emerald-500 hover:scale-110 active:scale-95"
      >
        <BiHome className="text-2xl sm:text-3xl" />
      </button>
      
      {/* Explore Button */}
      <button
        onClick={() => navigate('/explore')}
        className="flex flex-col items-center justify-center p-2 space-y-1 transition rounded-lg hover:bg-emerald-500 hover:scale-110 active:scale-95"
      >
        <MdOutlineExplore className="text-2xl sm:text-3xl" />
      </button>

      {/*  Add Story Button */}
      <button
        onClick={() => navigate('/createstory')}
        className="flex flex-col items-center justify-center p-2 space-y-1 transition rounded-lg hover:bg-emerald-500 hover:scale-110 active:scale-95"
      >
        <MdOutlineExplore className="text-2xl sm:text-3xl" />
      </button>
    
      {/* Add Post Button */}
      <button
        onClick={() => navigate('/createpost')}
        className="flex flex-col items-center justify-center p-2 space-y-1 transition rounded-lg hover:bg-emerald-500 hover:scale-110 active:scale-95"
      >
        <BiImageAdd className="text-2xl sm:text-3xl" />
      </button>

      {/* Profile Button */}
      <button
        onClick={() => navigate('/profilepage')}
        className="flex flex-col items-center justify-center p-2 space-y-1 transition rounded-lg hover:bg-emerald-500 hover:scale-110 active:scale-95"
      >
        <BiUser className="text-2xl sm:text-3xl" />
      </button>
    </footer>
  );
};

export default Footer;
