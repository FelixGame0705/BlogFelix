import React, { useCallback, useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button, Divider, Input, InputRef, Layout, notification, Select, Space } from "antd";
import CreateBlogEditor from "../../../Components/CreateBlogEditor/CreateBlogEditor";
import AppHeader from "../../../Components/AppHeader/AppHeader";
import Footer from "../../../Components/Footer/Footer";
import "./CreateBlogPage.css"; // CSS file for styling
import { createBlogContentData, getCategories } from "../../../api";
import { PlusOutlined } from "@ant-design/icons";

const CreateBlogPage = () => {

  const navigate = useNavigate();

  // Hàm này sẽ xử lý việc tạo blog
  const handleBlogCreate = useCallback(
    async (blog: { title: string; content: string, category:string }) => {
      try {
        // Gọi API để tạo blog
        const response = await createBlogContentData(blog.title, blog.content, blog.category);
        setTimeout(() => {
          if (response?.status) {
            notification.success({
              message: "Success",
              description: "Blog created successfully.",
            });
          }
        }, 3000);
        if (!response?.status) {
          throw new Error("Failed to create blog.");
        }

        // Điều hướng người dùng đến trang blog sau khi tạo xong
        navigate("/blogs");
        return response;
      } catch (error) {
        notification.error({
          message: "Error",
          description:
            error instanceof Error
              ? error.message
              : "An unknown error occurred.",
        });
      }
    },
    [navigate]
  );




  

  return (
    <div className="page-wrapper">
      <Layout>
        <Layout.Content className="page-content">
          <h1 style={{ textAlign: "center", marginBottom: "20px" }}>
            Create New Blog
          </h1>
          <CreateBlogEditor
            userRole="AppUser"
            onBlogCreate={handleBlogCreate}
          />
          
        </Layout.Content>
      </Layout>
    </div>
  );
};

export default CreateBlogPage;
