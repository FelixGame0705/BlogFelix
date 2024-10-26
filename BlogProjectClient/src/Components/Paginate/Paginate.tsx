import { Pagination } from "antd";
import React, { useContext, useEffect, useState } from "react";
import { getListContentData } from "../../api";
import { BlogListContentData } from "../../data";

type Props = {
  selectedCategories: string[];
  setListBlogs: (blogs: BlogListContentData[]) => void;
  setBlogs:(currentPage:number, pageSize:number)=>void;
  numberBlogs: number;
};

const Paginate = (props: Props) => {
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalBlogs, setTotalBlogs] = useState(0);
  const [categoriesSelected, setCategoriesSelected] = useState<string[]>();

  useEffect(() => {
    const getContentInit = async () => {
      try {
        setLoading(true); // Start loading
        setError(null); // Reset error state
        const params = {
          categories: undefined,
          sortBy: "UpdateTime", // Example sorting field
          isDescending: false, // Ascending order
          pageNumber: 1, // Page number
          pageSize: 7, // Page size
        };
        const result = await getListContentData(params); // Fetch data
        props.setListBlogs(result.data.data);
        // setTotalBlogs(result.data.totalBlogs);
        setCategoriesSelected(props.selectedCategories);
      } catch (err) {
        console.error("Failed to fetch content:", err);
        setError("Failed to load blog content. Please try again later.");
      } finally {
        setLoading(false); // Stop loading
      }
    };
    getContentInit();
  }, []);

  // Hàm xử lý khi thay đổi trang
  const handlePageChange = async (page: number, pageSize: number) => {
    console.log("Current Page:", page);
    console.log("Page Size:", pageSize);

    setCurrentPage(page); // Cập nhật state với trang hiện tại
    props.setBlogs(page,pageSize);
    // Gọi API với các tham số trang và kích thước mới
    //await getContentInit(page, pageSize);
  };

  // Hàm gọi API để lấy dữ liệu blog
  const getContentInit = async (page: number, pageSize: number) => {
    try {
      setLoading(true); // Bắt đầu loading
      const _params = {
        categories: categoriesSelected,
        sortBy: "UpdateTime", // Ví dụ trường sắp xếp
        isDescending: false, // Sắp xếp tăng dần
        pageNumber: page, // Số trang
        pageSize: pageSize, // Kích thước trang
      };

      const result = await getListContentData(_params); // Fetch data từ API
      props.setListBlogs(result.data.data);
      setTotalBlogs(result.data.totalBlogs);
    } catch (err) {
      console.error("Failed to fetch content:", err);
      setError("Failed to load blog content. Please try again later.");
    } finally {
      setLoading(false); // Dừng loading
    }
  };

  return (
    <>
      <Pagination
        current={currentPage}
        onChange={handlePageChange}
        total={props.numberBlogs}
        defaultPageSize={7}
        style={{
          padding: "20px",
          justifyContent: "center",
        }}
      />
    </>
  );
};

export default Paginate;
