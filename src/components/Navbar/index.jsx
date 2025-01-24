import logo from "../../assets/logo.png";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.clear();
    setTimeout(() => {
      navigate("/");
    }, 1500);
  };

  return (
    <nav className="fixed top-0 left-0 z-50 flex items-center justify-between w-full px-6 py-4 shadow-lg bg-slate-800">
      {/* Logo */}
      <img src={logo} alt="logo" className="bg-white w-28 sm:w-32" />

      {/* Logout Button */}
      <button
        onClick={handleLogout}
        className="px-4 py-2 text-sm font-semibold text-white transition-all duration-300 rounded-md hover:bg-yellow-500"
      >
        Logout
      </button>
    </nav>
  );
};

export default Navbar;
