import React from "react";
import { Breadcrumb, Form, Layout, Typography } from "antd";
import { HomeOutlined } from "@ant-design/icons";
import "./BlogContent.css"; // Thêm file CSS nếu cần
import { Link } from "react-router-dom";
import { stripHtmlTags } from "../../Helpers/FormatContent";
import parse from "html-react-parser";

const { Title, Paragraph } = Typography;
const { Content } = Layout;

type BlogContentProps = {
  title: string | undefined;
  content: string | undefined;
};

const BlogContent: React.FC<BlogContentProps> = ({ title, content }) => {
  // const cleanContent = parse(content!);
  return (
    <Layout>
      <Content className="contentLayout"
      >
        <Breadcrumb
          style={{
            margin: "16px 0",
            display: "flex",
            WebkitLineClamp: 1, // Số dòng hiển thị tối đa (ở đây là 3)
            WebkitBoxOrient: "vertical", // Cắt ngắn theo chiều dọc
            overflow: "hidden", // Ẩn phần nội dung tràn
            textOverflow: "ellipsis", // Hiển thị dấu '...' nếu tràn
          }}
        >
          <Breadcrumb.Item href="/">
            <HomeOutlined />
          </Breadcrumb.Item>
          <Breadcrumb.Item>
            <Link to={"/blogs"}>Blog</Link>
          </Breadcrumb.Item>
          <Breadcrumb.Item>{title}</Breadcrumb.Item>
        </Breadcrumb>
{/* 
        <div className="blog-content">
          <Title className="title" level={3}>
            {title}
          </Title>
        </div> */}
      </Content>
    </Layout>
  );
};

export default BlogContent;
