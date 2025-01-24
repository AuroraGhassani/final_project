import { useState, useEffect } from 'react';
import { getExplorePosts } from '../api/post'; // assuming this function fetches posts

const useExplorePost = (page = 1, size = 10) => {
  const [data, setData] = useState({}); 
  const [loading, setLoading] = useState(false); 
  const [error, setError] = useState(null); 

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true); 
      setError(null); 

      try {
        const result = await getExplorePosts(page = 1, size = 10); 

        // console.log("Result in hooks:", result); //hasilnya sdh sama dengan api
        
        setData(result);
      } catch (err) {
        console.error('Error fetching data:', err); // Log the error
        setError('Failed to load data.'); // Set error message
      } finally {
        setLoading(false); // Set loading to false after fetching
      }
    };

    fetchData(); // Call fetchData when page or size changes
  }, [page, size]); // Re-run effect when page or size changes

  return { data, loading, error }; // Return data, loading, and error to the component
};

export default useExplorePost;
