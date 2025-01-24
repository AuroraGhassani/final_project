import React, { useState, useEffect } from 'react';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import { useNavigate } from 'react-router-dom';
import BackButton from '../../components/BackButton';
import useUploadImage from '../../hooks/useUploadImage';  // Import the updated hook
import useUpdateProfile from '../../hooks/useUpdateProfile';

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

    const { uploadImage, data: imageUrl, loading: uploading, error: uploadError } = useUploadImage(); // Get the hook's data
    const { updateProfile, loading: updating, error, success } = useUpdateProfile();

    const navigate = useNavigate();

    const handleChange = (e) => {
        setForm({
            ...form,
            [e.target.id]: e.target.value,
        });
    };

    const handleImageChange = (e) => {
        const selectedFile = e.target.files[0];
        if (selectedFile) {
            uploadImage(selectedFile);  // Trigger the image upload
        }
    };

    const handleUpdate = async (e) => {
        e.preventDefault();

        // Ensure to use the uploaded image URL if available
        const updatedForm = { ...form, profilePictureUrl: imageUrl || form.profilePictureUrl };

        try {
            await updateProfile(updatedForm);
            setTimeout(() => {
                navigate("/profilepage");
            }, 3000);
        } catch (err) {
            console.error(err);
        }
    };

    // Optional: Pre-fill the form if you want to load the user profile initially
    useEffect(() => {
        // Replace this with an API call to get the user profile
        const userProfile = {
            name: 'John Doe',
            username: 'johndoe',
            email: 'john@example.com',
            phoneNumber: '1234567890',
            bio: 'A short bio about John.',
            website: 'https://johndoe.com',
            profilePictureUrl: 'https://example.com/profile.jpg',
        };

        setForm(userProfile);
    }, []);

    return (
        <main>
            <Navbar />
            <div className="min-h-screen py-20 bg-gray-100">
                <div className="max-w-md p-8 mx-auto bg-white rounded-md shadow-md">
                    <div className="flex justify-center mb-6">
                        <h1 className="text-xl font-bold text-center">Edit Profile</h1>
                    </div>
                    {updating && (
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
                            Update Success!
                        </div>
                    )}

                    {/* Profile picture upload section */}
                    <div className="flex flex-col items-center mb-6">
                        <label
                            htmlFor="profilePictureUrl"
                            className="inline-block px-4 py-2 text-white bg-blue-500 rounded-md cursor-pointer hover:bg-blue-600"
                        >
                            Upload Profile Picture
                        </label>
                        <input
                            type="file"
                            id="profilePictureUrl"
                            name="profilePictureUrl"
                            className="hidden"
                            onChange={handleImageChange}  // Trigger image upload on file change
                        />
                        {imageUrl && (
                            <img 
                                src={imageUrl} 
                                alt="Profile" 
                                className="object-cover w-32 h-32 mt-4 border-2 border-gray-300 rounded-full" 
                            />
                        )}
                        {uploadError && (
                            <div className="mt-2 text-red-500">{uploadError}</div>
                        )}
                    </div>

                    {/* Back button */}
                    <BackButton />

                    {/* Profile form */}
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
                            disabled={updating || uploading}  // Disable submit when updating or uploading
                        >
                            {updating ? "Updating..." : "Submit"}
                        </button>
                    </form>
                </div>
            </div>
            <Footer />
        </main>
    );
};

export default EditProfilePage;
