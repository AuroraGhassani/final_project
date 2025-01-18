import React from 'react';
import { useNavigate } from 'react-router-dom';

const CancelButton = ({ className = '' }) => {
    const navigate = useNavigate();

    const handleBack = () => {
        navigate(-1); // Navigasi kembali ke halaman sebelumnya
    };

    return (
        <button
            onClick={handleBack}
            className={`bg-blue-500 text-white px-2 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400 text-xs h-6`}
        >
            Back
        </button>
    );
};

export default CancelButton;
