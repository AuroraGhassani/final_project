import { useState } from "react";
import axios from "axios";
import { baseUrl, apiKey, jwtToken } from "../api/api";

const useUploadImage = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [data, setData] = useState(null);

  const uploadImage = async (imageFile) => {
    const formData = new FormData();
    formData.append("image", imageFile);

    try {
        setLoading(true);
        setError(null);
        const response = await axios.post(`${baseUrl}/api/v1/upload-image`, formData, {
            headers: {
                apiKey: `${apiKey}`,
                Authorization: `Bearer ${jwtToken}`,
            },
        });
        // console.log('Response dari API upload:', response.data.url);
        setData(response.data.url); 
    } catch (err) {
        setError(err.response ? err.response.data : err.message);
    } finally {
        setLoading(false);
    }
};
  return { uploadImage, data, loading, error };
};

export default useUploadImage;
