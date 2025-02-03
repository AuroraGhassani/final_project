import axios from 'axios';
import { baseUrl, apiKey, jwtToken } from './api';

// Upload Image
export const uploadImage = async (imageFile) => {
    let jwtToken = localStorage.getItem("jwtToken");
    const formData = new FormData();
    formData.append('image', imageFile);

    try {
        setLoading(true);
        setError(null);

        const config = {
            headers: {
                apiKey: `${apiKey}`,
                Authorization: `Bearer ${jwtToken}`,
            },
        };
        const response = await axios.post(`${baseUrl}/api/v1/upload-image`, formData, config);
        console.log("Uploaded data:", response.data); 
        setData(response.data);
    } catch (err) {
        setError(err.response ? err.response.data : err.message);
      } finally {
        setLoading(false);
      }
    };
