// hooks/useLoginUser.js
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { loginUser } from "../api/auth"; // Import loginUser API

export const useLoginUser = () => {
    const [form, setForm] = useState({
        email: "",
        password: "",
    });
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState("");
    const [isPasswordVisible, setIsPasswordVisible] = useState(false);

    const navigate = useNavigate();

    // Handle form input changes
    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm({
            ...form,
            [name]: value, // Menjaga nama field tetap konsisten
        });
    };

    const handleLogin = async (e) => {
        e.preventDefault();
        setLoading(true);
        setSuccess("");
        setError(""); // Reset error dan success sebelum submit form

        // Validasi input form
        if (!form.email || !form.password) {
            setError("Please fill all fields!");
            setLoading(false);
            return;
        }

        try {
            // Panggil API login
            const response = await loginUser(form); 
            // console.log("apakah ini token?", response); 
            localStorage.setItem("jwtToken", response);

            setSuccess("Login Successful!");

            // Redirect ke halaman homepage setelah login sukses
            setTimeout(() => {
                navigate("/homepage");
            }, 3000);
        } catch (err) {
            // Menangani error dengan baik dan menampilkan pesan error yang lebih jelas
            const errorMessage = err?.response?.data || "Login failed! Please try again."; // Periksa error response dengan aman
            setError(errorMessage); // Pastikan error di-set dengan benar
            console.error("Login failed:", errorMessage); // Debugging: lihat error yang terjadi
        } finally {
            setLoading(false); // Pastikan loading selesai
        }
    };

    return {
        form,
        error,
        loading,
        success,
        isPasswordVisible,
        setIsPasswordVisible,
        handleChange,
        handleLogin,
    };
};
