import React, { useState } from 'react';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import UploadImage from '../../components/UploadImage';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { baseUrl } from '../../api/api';
import { apiKey, jwtToken } from '../../api/api';
import BackButton from '../../components/BackButton';

const EditProfilePage = () => {
    
    const [form, setForm] = useState({
        name: '',
        username: '',
        email: '',
        profilePictureUrl: '',
        phoneNumber: '',
        bio: '',
        website: '',
    });

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");
    const [isPasswordVisible, setIsPasswordVisible] = useState(false);

    const navigate = useNavigate();

    const handleChange = (e) => {
        setForm({
            ...form,
            [e.target.id]: e.target.value,
        });
    };

    const handleUpdate = async (e) => {
        e.preventDefault();
        setLoading(true);
        setSuccess("");
        setError("");

        const config = {
            headers: {
                apiKey: `${apiKey}`,
                Authorization: `Bearer ${jwtToken}`,
            },
        };

        
        try {
            const res = await axios.post(`${baseUrl}/api/v1/update-profile`, form, config);
            console.log(res); 

            setSuccess("Update Success!");

            setTimeout(() => {
                navigate("/profilepage");
            }, 3000);
            
        } catch (error) {
            console.error(error.response);
                setError(error.response);
        } finally {
            setLoading(false);
        }  
    };

    return (
        <main>
            <Navbar />
            <div className="min-h-screen py-20 bg-gray-100">
                <div className="max-w-md p-8 mx-auto bg-white rounded-md shadow-md">
                    <div className="flex justify-center mb-6">
                        <h1 className="text-xl font-bold text-center">Edit Profile</h1>
                    </div>
                    {loading && (
                        <div className="mb-4 text-center text-blue-500">
                            Updating profile, please wait...
                        </div>
                    )}
                    {error && (
                        <div className="mb-4 text-center text-red-500">
                            {error.message || "An error occurred while updating your profile."}
                        </div>
                    )}
                    {success && (
                        <div className="mb-4 text-center text-green-500">
                            {success}
                        </div>
                    )}
                    <div className="flex justify-center mb-6">
                        <div className="relative">
                            <UploadImage />
                            <input
                                type="file"
                                id="profilePictureUrl"
                                name="profilePictureUrl"
                                className="hidden"
                                onChange={(e) =>
                                    setForm({
                                        ...form,
                                        profilePictureUrl: URL.createObjectURL(e.target.files[0]),
                                    })
                                }
                            />
                        </div>
                    </div>
                    <BackButton />
                    <form onSubmit={handleUpdate} className="space-y-4">
                        <div>
                            <label
                                htmlFor="name"
                                className="block text-sm font-medium text-gray-700"
                            >
                                Name
                            </label>
                            <input
                                type="text"
                                id="name"
                                name="name"
                                value={form.name}
                                onChange={handleChange}
                                placeholder="Your name"
                                className="block w-full px-4 py-2 mt-1 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                            />
                        </div>
                        <div>
                            <label
                                htmlFor="username"
                                className="block text-sm font-medium text-gray-700"
                            >
                                Username
                            </label>
                            <input
                                type="text"
                                id="username"
                                name="username"
                                value={form.username}
                                onChange={handleChange}
                                placeholder="Your username"
                                className="block w-full px-4 py-2 mt-1 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                            />
                        </div>
                        <div>
                            <label
                                htmlFor="email"
                                className="block text-sm font-medium text-gray-700"
                            >
                                Email
                            </label>
                            <input
                                type="email"
                                id="email"
                                name="email"
                                value={form.email}
                                onChange={handleChange}
                                placeholder="Your email"
                                className="block w-full px-4 py-2 mt-1 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                            />
                        </div>
                        <div>
                            <label
                                htmlFor="phoneNumber"
                                className="block text-sm font-medium text-gray-700"
                            >
                                Phone Number
                            </label>
                            <input
                                type="text"
                                id="phoneNumber"
                                name="phoneNumber"
                                value={form.phoneNumber}
                                onChange={handleChange}
                                placeholder="Your phone number"
                                className="block w-full px-4 py-2 mt-1 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                            />
                        </div>
                        <div>
                            <label
                                htmlFor="bio"
                                className="block text-sm font-medium text-gray-700"
                            >
                                Bio
                            </label>
                            <textarea
                                id="bio"
                                name="bio"
                                value={form.bio}
                                onChange={handleChange}
                                placeholder="Your bio"
                                rows="3"
                                className="block w-full px-4 py-2 mt-1 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                            ></textarea>
                        </div>
                        <div>
                            <label
                                htmlFor="website"
                                className="block text-sm font-medium text-gray-700"
                            >
                                Website
                            </label>
                            <input
                                type="text"
                                id="website"
                                name="website"
                                value={form.website}
                                onChange={handleChange}
                                placeholder="Your website"
                                className="block w-full px-4 py-2 mt-1 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                            />
                        </div>
                        <button
                            type="submit"
                            className="w-full px-4 py-2 text-white bg-blue-500 rounded-md hover:bg-blue-600"
                            disabled={loading}
                        >
                            {loading ? "Updating..." : "Submit"}
                        </button>
                    </form>
                </div>
            </div>
            <Footer />
        </main>
    );
    
};

export default EditProfilePage;
