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
    <nav className="fixed top-0 left-0 z-50 flex items-center justify-between w-full px-10 py-4 shadow-md bg-slate-400">
      <img src={logo} alt="logo" className="w-32" />
      <button
        onClick={handleLogout}
        className="px-4 py-2 text-white transition duration-200 bg-red-500 rounded hover:bg-yellow-600"
      >
        Logout
      </button>
    </nav>
  );
};

export default Navbar;
