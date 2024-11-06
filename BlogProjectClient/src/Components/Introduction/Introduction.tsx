import { Col, Layout, Row } from "antd";
import React, { useEffect } from "react";
import header from "./header.png";
import Typewriter from "typewriter-effect";
import './Introduction.css'
import styled from "styled-components";

type Props = {};


const getRandomColor = () => {
  const letters = '0123456789ABCDEF';
  let color = '#';
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
};

const ImageContent = styled.div`
  display: flex;
  justify-content: flex-end;
  max-width: 80%;
  padding-right: 20%;
  
  @media (max-width: 768px) {
    justify-content: center;
    padding-right: 0;
    max-width: 100%;
  }
`;

const TextContent = styled.div`
  display:flex;
  justify-content: flex-start;
  padding-left: 35%;
  padding-right: 5%;
  padding-right: 10%;
  max-width: 100%;
  
  @media (max-width: 768px) {
    padding-left: 0;
    padding-right: 0;
  }
`;

const Introduction = (props: Props) => {
    useEffect(() => {
    // Lấy tất cả các span và chuyển kiểu sang HTMLElement để truy cập style
    const spans = document.querySelectorAll(".pixelated-text span") as NodeListOf<HTMLElement>;
    spans.forEach(span => {
      span.style.color = getRandomColor(); // Gán màu ngẫu nhiên cho mỗi span
    });
  }, []);
  return (
    <Layout>
      <Row
        className="content-section"
        gutter={[16, 16]}
        style={{ padding: "20px", backgroundColor: "#f0f2f5" }}
      >
        {/* Phần văn bản */}
        <Col xs={24} md={12}>
          <TextContent>
            <div className="pixelated-text">
              <Typewriter
                onInit={(typewriter) => {
                  typewriter
                    .typeString(
                      "This is a personal blog where I share my thoughts on programming, game development, and more. Stay tuned for updates and new posts!"
                    )
                    .pauseFor(600)
                    .deleteAll()
                    .typeString("Welcomes You")
                    .start();
                }}
              />
            </div>
          </TextContent>
        </Col>

        {/* Phần hình ảnh */}
        <Col xs={24} md={12}>
          <ImageContent>
            <img
              src={header}
              alt="Placeholder"
              style={{
                width: "100%",
                maxWidth: "100%",
                objectFit: "cover",
                objectPosition: "center",
              }}
            />
          </ImageContent>
        </Col>
      </Row>
    </Layout>
  );
};

export default Introduction;
