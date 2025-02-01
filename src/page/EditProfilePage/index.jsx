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

    useEffect(() => {
        const userProfile = {
            name: '',
            username: '',
            email: '',
            phoneNumber: '',
            bio: '',
            website: '',
            profilePictureUrl: '',
        };

        setForm(userProfile);
    }, []);

    return (
        <main>
            <Navbar />
            <div className="flex items-center justify-center min-h-screen px-4 py-20 bg-gray sm:px-6 lg:px-8">
                <div className="w-full max-w-md p-8 bg-white rounded-lg shadow-lg opacity-80">
                        <BackButton />
                        <h1 className="mb-6 text-xl font-bold text-center text-emerald-500">Edit Profile</h1>
                
                    
                    {updating && (
                        <div className="mb-4 text-center text-blue-500">Updating profile, please wait...</div>
                    )}
                    {error && (
                        <div className="mb-4 text-center text-red-500">{error.message || "An error occurred while updating your profile."}</div>
                    )}
                    {success && (
                        <div className="mb-4 text-center text-green-500">Update Success!</div>
                    )}

                    <div className="flex flex-col items-center mb-6">
                        <label htmlFor="profilePictureUrl" className="inline-block px-4 py-2 text-white rounded-md cursor-pointer bg-emerald-500 hover:bg-emerald-600">Upload Profile Picture</label>
                        <input type="file" id="profilePictureUrl" className="hidden" onChange={handleImageChange} />
                        {imageUrl && (
                            <img src={imageUrl} alt="Profile" className="object-cover w-32 h-32 mt-4 border-2 border-gray-300 rounded-full" />
                        )}
                        {uploadError && <div className="mt-2 text-red-500">{uploadError}</div>}
                    </div>

                    <form onSubmit={handleUpdate} className="space-y-4">
                        {['name', 'username', 'email', 'phoneNumber', 'website'].map((field) => (
                            <div key={field}>
                                <label htmlFor={field} className="block text-sm font-medium text-black bg-white">{field.charAt(0).toUpperCase() + field.slice(1)}</label>
                                <input
                                    type="text"
                                    id={field}
                                    value={form[field]}
                                    onChange={handleChange}
                                    placeholder={`Your ${field}`}
                                    className="block w-full px-4 py-2 mt-1 border border-gray-300 rounded-md shadow-sm focus:ring-emerald-500 focus:border-emerald-500"
                                />
                            </div>
                        ))}
                        <div>
                            <label htmlFor="bio" className="block text-sm font-medium text-black bg-white">Bio</label>
                            <textarea
                                id="bio"
                                value={form.bio}
                                onChange={handleChange}
                                placeholder="Your bio"
                                rows="3"
                                className="block w-full px-4 py-2 mt-1 border border-gray-300 rounded-md shadow-sm focus:ring-emerald-500 focus:border-emerald-500"
                            ></textarea>
                        </div>
                        <button type="submit" className="w-full px-4 py-2 text-white rounded-md bg-emerald-500 hover:bg-emerald-600" disabled={updating || uploading}>{updating ? "Updating..." : "Submit"}</button>
                    </form>
                </div>
            </div>
            <Footer />
        </main>
    );
};

export default EditProfilePage;
