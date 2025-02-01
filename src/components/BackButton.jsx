import React from 'react';
import { useNavigate } from 'react-router-dom';
import { VscChevronLeft } from "react-icons/vsc";

const BackButton = ({ className = ""}) => {
    const navigate = useNavigate();

    return (
        <button
            onClick={() => navigate(-1)}
            className={`flex items-center text-3xl font-medium text-gray-600 rounded-lg hover:bg-gray-200 focus:ring-2 focus:ring-gray-300 focus:outline-none ${className}`}
        >
            <VscChevronLeft className="mr-2 text-gray-500" />
        </button>
    );
};

export default BackButton;
