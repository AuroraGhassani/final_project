import React from 'react';
import { useNavigate } from 'react-router-dom';

const Popup = ({ title, items, onClose }) => {
  const navigate = useNavigate();

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center px-4 bg-black bg-opacity-50">
      <div className="w-full max-w-md p-6 bg-gray-800 rounded-lg shadow-lg">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold text-green-400">{title}</h2>
          <button
            className="text-gray-400 hover:text-gray-100"
            onClick={onClose}
          >
            ✕
          </button>
        </div>

        {items.length === 0 ? (
          <p className="text-center text-gray-600">No {title.toLowerCase()}</p>
        ) : (
          <ul className="space-y-2">
            {items.map((item) => (
              <li key={item.id} className="flex items-center justify-between space-x-4">
                <div className="flex items-center space-x-4">
                  <img
                    src={item.profilePictureUrl || 'default-avatar.png'}
                    alt={item.name}
                    className="w-10 h-10 border-2 rounded-full border-emerald-500"
                    onError={(e) => (e.target.src = '/fallback-avatar.png')}
                  />
                  <div>
                    <p className="font-semibold text-gray-300">{item.name}</p>
                    <p
                      className="text-sm text-green-400 cursor-pointer hover:underline"
                      onClick={() => navigate(`/profilepage/${item.id}`)}
                    >
                      @{item.username}
                    </p>
                  
                  </div>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default Popup;
