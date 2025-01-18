import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { registerUser } from "../api/auth"; // Import API Register

export const useRegisterUser = () => {
  const [form, setForm] = useState({
    name: "",
    username: "",
    email: "",
    password: "",
    passwordRepeat: "",
    phoneNumber: "",
    bio: "",
    website: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null); // Perbaiki state error agar berbentuk objek
  const [success, setSuccess] = useState("");
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  const navigate = useNavigate();

  // Mengatur perubahan form input
  const handleChange = (e) => {
    const { id, value } = e.target;
    setForm({
      ...form,
      [id]: value, // Menjaga nama field tetap konsisten
    });
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    setLoading(true);
    setSuccess("");
    setError(null);

    // Validasi input form
    if (
      !form.name ||
      !form.username ||
      !form.email ||
      !form.password ||
      !form.passwordRepeat ||
      !form.phoneNumber
    ) {
      setError("Please fill all fields!");
      setLoading(false);
      return;
    }

    // Validasi kecocokan password
    if (form.password !== form.passwordRepeat) {
      setError("Passwords do not match!");
      setLoading(false);
      return;
    }

    try {
      // Call API untuk register
      const response = await registerUser(form);
      console.log(response); // Debugging: lihat hasil respons

      setSuccess("Registration successful! Redirecting to login...");

      // Redirect setelah sukses
      setTimeout(() => {
        navigate("/login");
      }, 3000);
    } catch (error) {
      setError("Registration failed. Please try again.");
      console.error(error); // Logging error
    } finally {
      setLoading(false);
    }
  };

  return {
    form,
    loading,
    success,
    error,
    isPasswordVisible,
    setIsPasswordVisible,
    handleChange,
    handleRegister,
  };
};
