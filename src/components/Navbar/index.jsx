import { FaSignOutAlt } from "react-icons/fa";  // Import logout icon from react-icons
import { useNavigate } from "react-router-dom";
import logo from "../../assets/logo.png";

const Navbar = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.clear();
    setTimeout(() => {
      navigate("/");
    }, 1500);
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between w-full max-w-4xl px-6 py-3 mx-auto bg-white bg-opacity-50 shadow-lg backdrop-blur-lg rounded-b-3xl">
      {/* Logo */}
      <img src={logo} alt="logo" className="bg-white w-28 sm:w-32" />

      {/* Logout Icon */}
      <button
        onClick={handleLogout}
        className="px-4 py-2 text-black transition-all duration-300 transform rounded-md hover:bg-emerald-500 hover:scale-110 active:scale-95"
      >
        <FaSignOutAlt className="text-xl" />
      </button>
    </nav>
  );
};

export default Navbar;
