import { useState, useEffect } from 'react';
import { getLoggedUser } from '../api/user'; // Import fungsi API dari file API terpisah

export const useProfileUser = () => {
    const [profileData, setProfileData] = useState({
        id: '',
        username: 'No Username',
        name: 'No Name',
        email: 'No Email',
        profilePictureUrl: 'default-avatar.png',
        phoneNumber: '-',
        bio: 'No Bio',
        website: 'No Website',
        totalFollowing: 0,
        totalFollowers: 0,
    });
    const [loading, setLoading] = useState(true); // Tambahkan status loading
    const [error, setError] = useState(''); // Tambahkan status error

    useEffect(() => {
        const fetchProfileData = async () => {
            
            try {
                const userData = await getLoggedUser(); // Panggil fungsi API
                setProfileData({
                    id: userData.id || '',
                    username: userData.username || 'No Username',
                    name: userData.name || 'No Name',
                    email: userData.email || 'No Email',
                    profilePictureUrl: userData.profilePictureUrl || 'default-avatar.png',
                    phoneNumber: userData.phoneNumber || '-',
                    bio: userData.bio || 'No Bio',
                    website: userData.website || 'No Website',
                    totalFollowing: userData.totalFollowing || 0,
                    totalFollowers: userData.totalFollowers || 0,
                });
            } catch (err) {
                console.error('Error fetching user profile:', err);
                setError('Failed to fetch user profile.');
            } finally {
                setLoading(false); // Set loading selesai
            }
        };

        fetchProfileData();
    }, []); // Dipanggil hanya sekali saat komponen di-mount

    return { profileData, loading, error }; // Kembalikan profileData, loading, dan error
};
