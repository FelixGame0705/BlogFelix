import React, { useCallback, useEffect, useState } from "react";
import AppHeader from "../../Components/AppHeader/AppHeader";
import BlogList from "../../Components/BlogList/BlogList";

import { BlogListContentData } from "../../data";
import { getListContentData } from "../../api";
import Footer from "../../Components/Footer/Footer";

type Props = {};

const BlogPage = (props: Props) => {
  const [listBlog, setListBlog] = useState<BlogListContentData[]>([]); // Use a specific type instead of 'any'
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);


  const setListBlogsData = (blogs: BlogListContentData[]) =>{
    setListBlog(blogs);
  }
  // useEffect(() => {
  //   const getContentInit = async () => {
  //     try {
  //       setLoading(true); // Start loading
  //       setError(null); // Reset error state
        
  //       const params = {
  //         sortBy: 'UpdateTime',      // Example sorting field
  //         isDescending: false,  // Ascending order
  //         pageNumber: 1,        // Page number
  //         pageSize: 10,          // Page size
  //       };
        
  //       const result = await getListContentData(params); // Fetch data
  //       setListBlog(result.data); // Assuming result.data holds the array of blog content
  //     } catch (err) {
  //       console.error('Failed to fetch content:', err);
  //       setError('Failed to load blog content. Please try again later.');
  //     } finally {
  //       setLoading(false); // Stop loading
  //     }
  //   };

  //   getContentInit();
  // }, []);
  return (
    <div>
      <BlogList setListBlogs={setListBlogsData} />
    </div>
  );
};

export default BlogPage;
