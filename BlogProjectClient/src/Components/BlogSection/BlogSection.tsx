import { Col, Layout, Row, Card, Image } from "antd";
import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { BlogContentData, BlogListContentData } from "../../data";
import {
  formatContent,
  getFirstImage,
  removeImages,
  stripHtmlTags,
} from "../../Helpers/FormatContent";
import "./BlogSection.css";
import parse from "html-react-parser";
interface Props {
  listResult: BlogListContentData[];
}

const blogPosts = [
  {
    title: "Post 1",
    description:
      "Description for Post 1 cccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc",
    image: "https://via.placeholder.com/300x200",
  },
  {
    title: "Post 2",
    description: "Description for Post 2",
    image: "https://via.placeholder.com/150",
  },
  {
    title: "Post 3",
    description: "Description for Post 3",
    image: "https://via.placeholder.com/150",
  },
  {
    title: "Post 4",
    description:
      "Description for Post 4aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
    image: "https://via.placeholder.com/150",
  },
  {
    title: "Post 5",
    description:
      "Description for Post 5sssssssssssssssssssssssssssssssssssssssssssssssssss\nssssssssssssssdsadasdsadsadasdasdjjjjjjjjjjjjjjjjj",
    image: "https://via.placeholder.com/150",
  },
];

const BlogSection: React.FC<Props> = ({ listResult }: Props) => {
  return (
    <Layout>
      {/* Phần tiêu đề */}
      <Row
        className="blog-title"
        style={{
          paddingLeft: "20%",
          paddingRight: "20%",
          marginTop: "40px",
          marginBottom: "20px",
        }}
      >
        <Col span={24}>
          <h2 style={{ textAlign: "center" }}>Blog</h2>
        </Col>
      </Row>

      {/* Phần nội dung blog */}
      <Row
        gutter={[16, 16]}
        style={{
          paddingLeft: "20%",
          paddingRight: "20%",
          marginBottom: "10px",
        }}
      >
        {/* Phần blog lớn */}
        <Col xs={24} md={12}>
          <Link to={`/blogs/${listResult[0]?.postID}`}>
            <Card
              hoverable
              cover={
                <img
                  alt={listResult[0]?.title}
                  src={getFirstImage(listResult[0]?.content) || undefined}
                />
              }
              style={{
                height: "100%",
                display: "-webkit-box",
                WebkitLineClamp: 3, // Số dòng hiển thị tối đa (ở đây là 3)
                WebkitBoxOrient: "vertical", // Cắt ngắn theo chiều dọc
                overflow: "hidden", // Ẩn phần nội dung tràn
                textOverflow: "ellipsis", // Hiển thị dấu '...' nếu tràn
              }}
            >
              <Card.Meta
                title={listResult[0]?.title}
                description={stripHtmlTags(formatContent(listResult[0]?.content, 300))}
              />
            </Card>
          </Link>
        </Col>

        {/* Phần các blog nhỏ */}
        <Col xs={24} md={12}>
          <Row gutter={[16, 16]}>
            {/* Hàng 1 */}
            {listResult?.slice(1).map((item, index) => (
              <Col key={index} xs={24} md={12} className="card-item">
                <Link to={`/blogs/${item?.postID}`}>
                  <Card
                    hoverable
                    cover={
                      <img
                        alt={item.title}
                        src={
                          getFirstImage(listResult[index+1]?.content) || undefined
                        }
                      />
                    }
                    style={{ height: "100%" }}
                  >
                    <Card.Meta
                      title={item.title}
                      description={stripHtmlTags(formatContent(item?.content, 300))}
                    />
                  </Card>
                </Link>
              </Col>
            ))}
          </Row>
        </Col>
      </Row>
    </Layout>
  );
};

export default BlogSection;
