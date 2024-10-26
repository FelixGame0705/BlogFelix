import { Col, Layout, Row } from "antd";
import React from "react";
import header from "./header.png";
type Props = {};

const Introduction = (props: Props) => {
  return (
    <Layout>
    <Row
      className="content-section"
      gutter={[16, 16]}
      style={{ padding: "20px", backgroundColor: "#f0f2f5" }}
    >
      {/* Phần văn bản */}
      <Col
        xs={24}
        md={12}
        className="text-content"
        style={{
          paddingLeft: "20%", // Căn lề trái vào 20%
          paddingRight: "10%", // Căn lề phải vào 20%
          maxWidth: "100%", // Chiều rộng tối đa bằng 60% của container
        }}
      >
        <h2>Welcome to My Blog</h2>
        <p>
          This is a personal blog where I share my thoughts on programming,
          game development, and more. Stay tuned for updates and new posts!
        </p>
      </Col>

      {/* Phần hình ảnh */}
      <Col
        xs={24}
        md={12}
        className="image-content"
        style={{
          display: "flex",
          justifyContent: "flex-end", // Căn lề phải vào 20%
          paddingRight: "20%",
          maxWidth: "60%", // Chiều rộng tối đa bằng 60% của container
        }}
      >
        <img
          src={header}
          alt="Placeholder"
          style={{
            width: "100%",
            maxWidth: "100%", // Đảm bảo hình ảnh không vượt quá chiều rộng container
            objectFit: "cover", // Giữ tỷ lệ và cắt hình ảnh nếu cần
          }}
        />
      </Col>
    </Row>
  </Layout>
  );
};

export default Introduction;
