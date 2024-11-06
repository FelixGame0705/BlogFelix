import { Layout, Row, Col, Typography, Space } from "antd";
import React from "react";
import { FacebookOutlined, GithubOutlined, LinkedinOutlined } from '@ant-design/icons';
import './Footer.css';

const { Text } = Typography;

const Footer = () => {
  return (
    <Layout.Footer className="footer">
      <Row justify="center" align="middle" className="footer-content">
        <Col>
          <Space size="large">
            <a href="https://web.facebook.com/tientran070502" target="_blank" rel="noopener noreferrer">
              <FacebookOutlined style={{ fontSize: '24px', color: '#3b5998' }} />
            </a>
            <a href="https://github.com/FelixGame0705" target="_blank" rel="noopener noreferrer">
              <GithubOutlined style={{ fontSize: '24px', color: '#333' }} />
            </a>
            <a href="https://www.linkedin.com/in/tien-tran-a01912248/" target="_blank" rel="noopener noreferrer">
              <LinkedinOutlined style={{ fontSize: '24px', color: '#0077b5' }} />
            </a>
          </Space>
        </Col>
      </Row>
      <Row justify="center" style={{ marginTop: '16px' }}>
        <Col>
          <Text type="secondary">© 2024 Tien Tran</Text>
        </Col>
      </Row>
    </Layout.Footer>
  );
};

export default Footer;
