import { BiCamera } from "react-icons/bi";
import React from "react";
import { useNavigate } from "react-router-dom";

const Footer = () => {
  const navigate = useNavigate();

  return (
    <footer className="fixed bottom-0 left-0 flex items-center justify-around w-full p-4 shadow-md bg-slate-400">
      <button onClick={() => navigate('/homepage')} className="text-xl">
        <BiCamera />
      </button>
      <button onClick={() => navigate('/createpost')} className="text-xl">
        <BiCamera />
      </button>
      <button onClick={() => navigate('/profilepage')} className="text-xl">
        <BiCamera />
      </button>
    </footer>
  );
};

export default Footer;
