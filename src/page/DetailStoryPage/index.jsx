import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getStoryById } from '../../api/story'; // Import API untuk mendapatkan story berdasarkan ID

const StoryDetailPage = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [story, setStory] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchStory = async () => {
            try {
                const data = await getStoryById(id);
                setStory(data); // Simpan story yang didapat
            } catch (error) {
                console.error('Error fetching story details:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchStory();
    }, [id]);

    if (loading) {
        return (
            <div className="flex items-center justify-center h-screen">
                <p className="text-lg font-semibold">Loading story...</p>
            </div>
        );
    }

    return (
        <div className="flex flex-col items-center justify-center h-screen text-white bg-black">
            <button
                className="absolute px-4 py-2 text-lg font-bold text-white bg-gray-800 rounded-lg top-4 left-4"
                onClick={() => navigate(-1)} // Kembali ke halaman sebelumnya
            >
                Back
            </button>
            <img
                src={story.imageUrl || '/default-story.jpg'}
                alt={story.caption}
                className="object-contain w-full max-w-md h-3/4"
            />
            <p className="mt-4 text-sm">{story.caption}</p>
        </div>
    );
};

export default StoryDetailPage;
