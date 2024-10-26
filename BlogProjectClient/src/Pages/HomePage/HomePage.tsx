import React, { useEffect, useState } from 'react';
import AppHeader from '../../Components/AppHeader/AppHeader';
import Introduction from '../../Components/Introduction/Introduction';
import BlogSection from '../../Components/BlogSection/BlogSection';
import StandardSection from '../../Components/StandardSection/StandardSection';
import Footer from '../../Components/Footer/Footer';
import { getListContentData } from '../../api';
import { BlogListContentData } from '../../data'; // Assuming you have defined types for your data

interface Props {}

const HomePage: React.FC<Props> = () => {
  const [listBlog, setListBlog] = useState<BlogListContentData[]>([]); // Use a specific type instead of 'any'
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const getContentInit = async () => {
      try {
        setLoading(true); // Start loading
        setError(null); // Reset error state
        
        const params = {
          sortBy: 'Title',      // Example sorting field
          isDescending: false,  // Ascending order
          pageNumber: 1,        // Page number
          pageSize: 5,          // Page size
        };
        
        const result = await getListContentData(params); // Fetch data
        setListBlog(result.data.data); // Assuming result.data holds the array of blog content
      } catch (err) {
        console.error('Failed to fetch content:', err);
        setError('Failed to load blog content. Please try again later.');
      } finally {
        setLoading(false); // Stop loading
      }
    };

    getContentInit();
  }, []);

  return (
    <div>
      <Introduction />
      
      {/* Conditional rendering based on loading, error, or content state */}
      {loading ? (
        <p>Loading...</p>
      ) : error ? (
        <p>{error}</p>
      ) : (
        <BlogSection listResult={listBlog} />
      )}

      <StandardSection />
    </div>
  );
};

export default HomePage;
