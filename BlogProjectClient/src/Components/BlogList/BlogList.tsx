import React, {  useEffect, useState } from "react";
import { Card, Checkbox, Typography, Row, Col, Tag } from "antd";
import { WindowsOutlined } from "@ant-design/icons";
import "./BlogList.css";
import {
  formatContent,
  getFirstImage,
  stripHtmlTags,
} from "../../Helpers/FormatContent";
import { BlogListContentData } from "../../data";
import { Link } from "react-router-dom";
import Paginate from "../Paginate/Paginate";
import parse from "html-react-parser";
import { Content } from "antd/es/layout/layout";
import { htmlToText } from "html-to-text";
import AddBlog from "./AddBlog/AddBlog";
import { get } from "http";
import { getCategories, getListContentData } from "../../api";
import { useAuth } from "../../Context/useAuth";

const { Meta } = Card;
const { Title } = Typography;

const blogs = [
  {
    id: 1,
    title: "Nest.js Basics",
    description:
      "Một nghiên cứu kéo dài ba tháng cho thấy những phụ nữ bị PCOS uống một muỗng canh (15ml) giấm táo với 100 ml hoặc khoảng 150ml nước ngay sau bữa ăn tối đã cải thiện nồng độ hormone và bắt đầu xuất hiện chu kì kinh nguyệt đều đặn hơn.Trong khi nghiên cứu thêm là cần thiết để xác nhận những kết quả này, một muỗng canh (15ml) mỗi ngày dường như là một liều hiệu quả để cải thiện các triệu chứng PCOS.Thường xuyên uống một muỗng canh (15ml) giấm táo với 100 ml sau bữa ăn tối có thể cải thiện các triệu chứng của PCOS. Adsadashhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhh dhs dashd hasd hasd hsahdashhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhsadsa" +
      "d",
    image: "https://via.placeholder.com/100x100",
    tags: ["nestjs"],
  },
  {
    id: 2,
    title: "Getting Started with Unity",
    description: "Learn the basics of Unity.",
    image: "https://via.placeholder.com/100x100",
    tags: ["unity"],
  },
  {
    id: 3,
    title: "ASP.NET Core Tutorial",
    description: "A complete guide to ASP.NET Core.",
    image: "https://via.placeholder.com/100x100",
    tags: ["aspnet"],
  },
  {
    id: 4,
    title: "Advanced Nest.js",
    description: "Deep dive into Nest.js.",
    image: "https://via.placeholder.com/100x100",
    tags: ["nestjs"],
  },
];
type Props = {
  // listResult: BlogListContentData[];
  setListBlogs: (listBlogs: BlogListContentData[]) => void;
};
const BlogList: React.FC<Props> = ({ setListBlogs }: Props) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(7);
  const [totalBlogs, setTotalBlogs] = useState(0);


  const [selectedCategories, setSelectedCategories] = useState<any>(undefined);
  const [categories, setCategories] = useState<string[]>([]);
  const [listBlog, setListBlog] = useState<BlogListContentData[]>([]); // Use a specific type instead of 'any'
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const { isLoggedIn, user, decodedToken } = useAuth(); // Lấy hàm isLoggedIn và user từ context
  const [loggedIn, setLoggedIn] = useState(isLoggedIn());

  // Cập nhật trạng thái đăng nhập khi có thay đổi
  useEffect(() => {
      setLoggedIn(isLoggedIn());
  }, [user]); // Chạy lại effect khi user thay đổi

  const handleCategoryChange = (checkedValues: any) => {
    setSelectedCategories(checkedValues);
  };

  const onBlogListChange = async (blogs: BlogListContentData[]) => {
    // setListBlogs(blogs);
    setListBlog(blogs);
  };

  // const filteredBlogs = blogs.filter(
  //   (blog) =>
  //     selectedCategories.length === 0 ||
  //     selectedCategories.every((tag) => blog.tags.includes(tag))
  // );

  const setBlogsData = (page: number, pageSize: number) =>{
    setCurrentPage(page);
    setPageSize(pageSize);
  }

  const setBlogs = async () => {
    try {
      setLoading(true); // Bắt đầu loading
      const _params : any = {
       
        sortBy: "UpdateTime", // Ví dụ trường sắp xếp
        isDescending: false, // Sắp xếp tăng dần
        pageNumber: currentPage, // Số trang
        pageSize: pageSize, // Kích thước trang
      };
      if (selectedCategories && selectedCategories.length > 0) {
        _params.categories = selectedCategories; // Chỉ thêm categories nếu nó không rỗng hoặc null
      }
      console.log("Params: " + _params.categories)
      const result = await getListContentData(_params); // Fetch data từ API
      setListBlog(result?.data.data);
      setTotalBlogs(result?.data.totalBlogs);
    } catch (err) {
      console.error("Failed to fetch content:", err);
      setError("Failed to load blog content. Please try again later.");
    } finally {
      setLoading(false); // Dừng loading
    }
  };
  useEffect(() => {
    const getCategoriesData = async () => {
      try {
        const result = await getCategories(); // Fetch data
        setCategories(result?.data || []);
      } catch (err) {
        console.error("Failed to fetch content:", err);
        setError("Failed to load blog content. Please try again later.");
      }
    };
    getCategoriesData();
  }, []);

  useEffect(()=>{
    const getData = async ()=>{
      await setBlogs();
    }
    getData();
  },[currentPage]);

  useEffect(()=>{
    setCurrentPage(1);
  },[selectedCategories])
  useEffect(() => {
    const getData = async () => {
      await setBlogs();
    };
    
    getData();
  }, [selectedCategories]);

  // useEffect(() => {
  //   const getContentInit = async () => {
  //     try {
  //       setLoading(true); // Start loading
  //       setError(null); // Reset error state

  //       const params = {
  //         sortBy: "UpdateTime", // Example sorting field
  //         isDescending: false, // Ascending order
  //         pageNumber: 1, // Page number
  //         pageSize: 5, // Page size
  //       };

  //       const result = await getListContentData(params); // Fetch data
  //       setListBlog(result.data.data); // Assuming result.data holds the array of blog content
  //     } catch (err) {
  //       console.error("Failed to fetch content:", err);
  //       setError("Failed to load blog content. Please try again later.");
  //     } finally {
  //       setLoading(false); // Stop loading
  //     }
  //   };

  //   getContentInit();
  // }, []);
  return (
    <div className="blog-list">
       { loggedIn && decodedToken?.role === "AppUser" ? (<AddBlog />):(<></>)}
      <div className="header-container">
        <Title level={2} className="header-title">
          Blogs
        </Title>
        <Checkbox.Group
          onChange={handleCategoryChange}
          className="filter-group"
        >
          <Row gutter={[8, 8]} justify="center">
            {categories.map((x) => (
              <Col>
                <Checkbox value={x}>
                  {/* <NestjsOutlined style={{ fontSize: '20px', marginRight: '8px' }} /> */}
                  {x}
                </Checkbox>
              </Col>
            ))}
          </Row>
        </Checkbox.Group>
      </div>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <Row gutter={[8, 8]} className="rowBlog">
          {listBlog.map((blog) => (
            <Col span={24} key={blog.postID}>
              <Link to={`/blogs/${blog.postID}`}>
                <Card
                  hoverable
                  className="blog-card"
                  content={blog.content}
                  style={{
                    display: "-webkit-box",
                    WebkitLineClamp: 3, // Số dòng hiển thị tối đa (ở đây là 3)
                    WebkitBoxOrient: "vertical", // Cắt ngắn theo chiều dọc
                    overflow: "hidden", // Ẩn phần nội dung tràn
                    textOverflow: "ellipsis", // Hiển thị dấu '...' nếu tràn
                  }}
                >
                  <div className="blog-card-content">
                    <img
                      alt={blog.title}
                      src={getFirstImage(blog.content) || undefined}
                      className="blog-image"
                    />
                    <div className="blog-details">
                      <Meta
                        title={formatContent(blog.title, 100)}
                        // text-overflow="ellipsis"
                        description={
                          // <div className="card-description">
                          stripHtmlTags(formatContent(blog.content, 300))
                        }
                      />
                      <div className="blog-tags">
                        {/* {blog.tags.map(tag => (
              <Tag key={tag}>{tag}</Tag>
            ))} */}
                      </div>
                    </div>
                  </div>
                </Card>
              </Link>
            </Col>
          ))}
        </Row>
      )}
      <Paginate
        setListBlogs={onBlogListChange}
        selectedCategories={selectedCategories} setBlogs={setBlogsData} numberBlogs={totalBlogs}      />
    </div>
  );
};

export default BlogList;
