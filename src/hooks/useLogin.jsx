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
        setError(""); // Reset error and success before submitting the form
    
        // Validate input fields
        if (!form.email || !form.password) {
            setError("Please fill all fields!");
            setLoading(false);
            return;
        }
    
        try {
            // Call the login API
            const response = await loginUser(form);
            localStorage.setItem("jwtToken", response);
    
            setSuccess("Login Successful!");
            setTimeout(() => {
                navigate("/homepage");
            }, 3000);
    
        } catch (err) {
            // Extract the error message from the response
            const errorMessage = err.response?.data?.message || "Login failed, please try again!";
            setError(errorMessage); // Set the error message correctly
            console.error("Login failed:", errorMessage); // Debugging: check the error
        } finally {
            setLoading(false); // Ensure loading is finished
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
