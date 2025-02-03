import { BiHome, BiImageAdd, BiUser } from "react-icons/bi";
import { MdOutlineExplore } from "react-icons/md";
import { IoIosAddCircle } from "react-icons/io";
import React from "react";
import { useNavigate } from "react-router-dom";

const Footer = () => {
  const navigate = useNavigate();

  return (
    <footer className="fixed bottom-0 left-0 right-0 flex items-center justify-between w-full max-w-4xl px-6 py-2 mx-auto text-black bg-gray-200 shadow-lg backdrop-blur-lg rounded-t-3xl">
      {/* Home Button */}
      <button
        onClick={() => navigate('/homepage')}
        className="flex flex-col items-center justify-center p-2 transition rounded-lg hover:scale-110 active:scale-95"
      >
        <BiHome className="text-2xl sm:text-3xl" />
      </button>
      
      {/* Explore Button */}
      <button
        onClick={() => navigate('/explore')}
        className="flex flex-col items-center justify-center p-2 transition rounded-lg hover:scale-110 active:scale-95"
      >
        <MdOutlineExplore className="text-2xl sm:text-3xl" />
      </button>
      
      {/* Add Button (Center) */}
      <button
        onClick={() => navigate('/createstory')}
        className="flex items-center justify-center p-1 transition rounded-full shadow-lg bg-emerald-500 hover:scale-110 active:scale-95"
      >
        <IoIosAddCircle className="text-4xl text-white" />
      </button>
      
      {/* Add Post Button */}
      <button
        onClick={() => navigate('/createpost')}
        className="flex flex-col items-center justify-center p-2 transition rounded-lg hover:scale-110 active:scale-95"
      >
        <BiImageAdd className="text-2xl sm:text-3xl" />
      </button>
      
      {/* Profile Button */}
      <button
        onClick={() => navigate('/profilepage')}
        className="flex flex-col items-center justify-center p-2 transition rounded-lg hover:scale-110 active:scale-95"
      >
        <BiUser className="text-2xl sm:text-3xl" />
      </button>
    </footer>
  );
};

export default Footer;
