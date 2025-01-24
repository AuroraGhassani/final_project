import { useState, useCallback } from "react";
import { updateProfile } from "../api/user"; // Impor API yang sudah ada

const useUpdateProfile = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(false);

    const updateProfileHandler = useCallback(
        async (profileData) => {
            setLoading(true);
            setError(null);
            setSuccess(false);

            try {
                const result = await updateProfile(profileData);
                setSuccess(true);
                return result; // Mengembalikan data dari API
            } catch (err) {
                setError(err.response?.data || err.message);
                throw err; // Melempar error untuk penanganan lebih lanjut
            } finally {
                setLoading(false);
            }
        },
        []
    );

    return { updateProfile: updateProfileHandler, loading, error, success };
};

export default useUpdateProfile;
