import React, { useState } from "react";
import { Col, Layout, Menu, Row, Drawer, Button, Image } from "antd";
import { Link } from "react-router-dom";
import Icon, { MenuOutlined } from "@ant-design/icons"; // Biểu tượng menu hamburger
import "./AppHeader.css"; // Nhập CSS tùy chỉnh
import { useAuth } from "../../Context/useAuth";

const { Header } = Layout;

const AppHeader = () => {
  const [drawerVisible, setDrawerVisible] = useState(false);
  const {decodedToken, isLoggedIn, userGoogle} = useAuth();

  // Xử lý đóng/mở drawer
  const toggleDrawer = () => {
    setDrawerVisible(!drawerVisible);
  };

  return (
    <Layout className="layout" >
      <Header
        className="custom-header"
        style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}
      >
        {isLoggedIn() &&<p className="welcome">Welcome, {decodedToken?.given_name||userGoogle?.fullName}</p>}
        {/* Logo */}
        <div className="custom-logo">
          <Link to="/" style={{ color: "white", fontSize: "20px" }}><Image width={100} src="https://res.cloudinary.com/dno1kjdkk/image/upload/v1729951724/iwbk1duxpnforsopvqdx.png" preview={false}/></Link>
        </div>

        {/* Menu ngang cho desktop */}
        <Menu
          className="custom-menu"
          theme="dark"
          mode="horizontal"
        >
          <Menu.Item key="1" style={{border: "2px gray"}}>
            <Link to="/blogs">Blog</Link>
          </Menu.Item>
          <Menu.Item key="2">
            <Link to="/game">Game</Link>
          </Menu.Item>
          <Menu.Item key="3">
            <Link to="/project">Project</Link>
          </Menu.Item>
          <Menu.Item key="4">
            <Link to="/about">About</Link>
          </Menu.Item>
        </Menu>

        {/* Nút menu hamburger cho di động */}
        <Button
          className="menu-button"
          type="primary"
          icon={<MenuOutlined />}
          onClick={toggleDrawer}
           // Chỉ hiện trên màn hình nhỏ
        />

        {/* Drawer cho di động */}
        <Drawer
          title="Menu"
          placement="right"
          closable={true}
          onClose={toggleDrawer}
          visible={drawerVisible}
        >
          <Menu mode="inline" theme="dark" >
            <Menu.Item key="1" onClick={toggleDrawer}>
              <Link to="/blogs">Blog</Link>
            </Menu.Item>
            <Menu.Item key="2" onClick={toggleDrawer}>
              <Link to="/game">Game</Link>
            </Menu.Item>
            <Menu.Item key="3" onClick={toggleDrawer}>
              <Link to="/project">Project</Link>
            </Menu.Item>
            <Menu.Item key="4" onClick={toggleDrawer}>
              <Link to="/about">About</Link>
            </Menu.Item>
          </Menu>
        </Drawer>
      </Header>
      
    </Layout>
  );
};

export default AppHeader;
