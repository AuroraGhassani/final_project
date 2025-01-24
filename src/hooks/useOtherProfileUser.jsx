import { useState, useEffect } from 'react';
import { getUserById } from '../api/user'; // Import fungsi API dari file API terpisah
import { useParams } from 'react-router-dom';

export const useOtherProfileUser = () => {
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
    const {id} = useParams();

    useEffect(() => {
        const fetchProfileData = async () => {
            
            try {
                const userData = await getUserById(id); 
                setProfileData({
                    id: userData.data.id || '',
                    username: userData.data.username || 'No Username',
                    name: userData.data.name || 'No Name',
                    email: userData.data.email || 'No Email',
                    profilePictureUrl: userData.data.profilePictureUrl || 'default-avatar.png',
                    phoneNumber: userData.data.phoneNumber || '-',
                    bio: userData.data.bio || 'No Bio',
                    website: userData.website || 'No Website',
                    totalFollowing: userData.data.totalFollowing || 0,
                    totalFollowers: userData.data.totalFollowers || 0,
                });
                // console.log("User Data di hooks:", userData);
            } catch (err) {
                console.error('Error fetching user profile:', err);
                setError('Failed to fetch user profile.');
            } finally {
                setLoading(false); // Set loading selesai
            }
        };

        fetchProfileData();
    }, [id]); // Dipanggil hanya sekali saat komponen di-mount

    return { profileData, loading, error }; // Kembalikan profileData, loading, dan error
};
