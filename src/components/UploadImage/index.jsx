import React, { useState } from 'react';
import axios from 'axios';
import { baseUrl, jwtToken, apiKey } from '../../api/api';

const UploadImage = () => {
  const [image, setImage] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [imageUrl, setImageUrl] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  // Handle image selection
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(file);
      setErrorMessage(''); // Clear error if any
    }
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!image) {
      setErrorMessage('Please select an image to upload.');
      return;
    }

    const formData = new FormData();
    formData.append('file', image);

    const config = {
      headers: {
        apiKey: apiKey,
        Authorization: `Bearer ${jwtToken}`,
        'Content-Type': 'multipart/form-data', // Ensure the correct content type
      },
    };

    try {
      setUploading(true);
      setErrorMessage('');

      const response = await axios.post(`${baseUrl}/api/v1/upload-image`, formData, config);

      if (response?.data?.url) {
        setImageUrl(response.data.url); // Set the uploaded image URL
        alert('Image uploaded successfully!');
      } else {
        setErrorMessage('Failed to upload image. Please try again.');
      }
    } catch (error) {
      console.error('Error uploading image:', error);
      setErrorMessage(
        error.response?.data?.message || 'An error occurred while uploading. Please try again.'
      );
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="py-20 upload-container">
      <h2 className="text-xl font-semibold">Upload Image and Get URL</h2>
      <form onSubmit={handleSubmit} className="mt-4">
        <div className="mb-4">
          <input
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            className="p-2 border border-gray-300 rounded"
          />
        </div>
        <button
          type="submit"
          className="px-4 py-2 text-white bg-blue-500 rounded hover:bg-blue-600 disabled:bg-gray-300 disabled:cursor-not-allowed"
          disabled={uploading}
        >
          {uploading ? 'Uploading...' : 'Upload Image'}
        </button>
      </form>

      {errorMessage && (
        <p className="mt-4 text-red-500">
          <strong>Error:</strong> {errorMessage}
        </p>
      )}

      {imageUrl && (
        <div className="mt-6">
          <h3 className="text-lg font-semibold">Uploaded Image URL:</h3>
          <p className="text-gray-500">{imageUrl}</p>
          <img
            src={imageUrl}
            alt="Uploaded"
            className="mt-4 border border-gray-300 rounded"
            style={{ maxWidth: '100%', height: 'auto' }}
          />
        </div>
      )}
    </div>
  );
};

export default UploadImage;
