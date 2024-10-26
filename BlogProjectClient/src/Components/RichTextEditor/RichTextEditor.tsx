import React, { useState, useEffect, useCallback, useRef } from "react";
import {
  Layout,
  Button,
  Input,
  notification,
  Select,
  Divider,
  Space,
  InputRef,
  Typography,
  Tag,
  Flex,
} from "antd";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import "./RichTextEditor.css";
import { PlusOutlined } from "@ant-design/icons";
import { getCategories } from "../../api";
import { BlogContentData } from "../../data";
import { UserInfo } from "../../Models/User";

type Props = {
  userRole: string | undefined;
  contentParams: BlogContentData;
  authors: UserInfo[] | undefined
  title: string;
  onCategoryChange: (category: string) => void;
  onBlogChange: (blog: any) => void;
  onTitleChange: (title: string) => void;
  onSave: () => void;
  onReset: () => void; // Thêm callback cho nút reset
  onDelete: () => void;
};

const RichTextEditor = ({
  userRole,
  contentParams,
  authors,
  onBlogChange,
  onTitleChange,
  onCategoryChange,
  onSave,
  onReset, // Nhận callback reset từ props
  onDelete,
}: Props) => {
  const [items, setItems] = useState<any>(["jack", "lucy"]);
  const [name, setName] = useState("");
  const inputRef = useRef<InputRef>(null);
  const [category, setCategory] = useState("ưadsa");

  let index = 0;

  const [blog, setBlog] = useState(contentParams);
  const [title, setTitle] = useState(contentParams.title);
  const [loading, setLoading] = useState(false);
  const quillRef = useRef<ReactQuill>(null);

  useEffect(() => {
    setBlog(contentParams);
    setCategory(contentParams.category);
    setTitle(contentParams.title);
  }, [contentParams]);

  const handleTitleChange = useCallback(
    (e: string) => {
      const newTitle = e;
      setTitle(newTitle);
      onTitleChange(newTitle);
    },

    [onTitleChange]
  );

  const handleCategoryChange = useCallback(
    (e: string) => {
      const category = e;
      setCategory(category);
      onCategoryChange(category);
    },
    [onCategoryChange]
  );

  const handleContentChange = useCallback(
    (value: string) => {
      setBlog((prevBlog: any) => ({ ...prevBlog, content: value }));
      onBlogChange({ ...blog, content: value });
    },
    [blog, onBlogChange]
  );

  const handleSave = useCallback(async () => {
    setLoading(true);
    try {
      await onSave();
      notification.success({
        message: "Success",
        description: "Blog content saved successfully.",
      });
    } catch (error) {
      notification.error({
        message: "Error",
        description:
          error instanceof Error ? error.message : "An unknown error occurred",
      });
    } finally {
      setLoading(false);
    }
  }, [onSave]);

  const handleReset = useCallback(() => {
    // Xóa localStorage và gọi hàm reset từ props
    localStorage.removeItem(`blog-content-${contentParams.postID}`);
    onReset();
  }, [contentParams.postID, onReset]);

  const handleSelectChange = (value: string) => {
    setCategory(value); // Cập nhật giá trị đã chọn
    console.log("Selected Item:", value); // Hiển thị giá trị đã chọn
  };
  const imageHandler = useCallback(() => {
    const input = document.createElement("input");
    input.setAttribute("type", "file");
    input.setAttribute("accept", "image/*");
    input.click();
    input.onchange = async () => {
      if (input !== null && input.files !== null) {
        const file = input.files[0];
        const url = await uploadToCloudinary(file);
        const quill = quillRef.current;
        if (quill) {
          const range = quill.getEditorSelection();
          range && quill.getEditor().insertEmbed(range.index, "image", url);
        }
      }
    };
  }, []);

  const uploadToCloudinary = async (file: File): Promise<string> => {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", "yc5t1mwl");
    const res = await fetch(
      `https://api.cloudinary.com/v1_1/dno1kjdkk/upload`,
      { method: "POST", body: formData }
    );
    const data = await res.json();
    return data.url;
  };

  const modules = {
    toolbar: {
      container: [
        [{ font: [] }, { size: [] }],
        ["bold", "italic", "underline", "strike"],
        [{ color: [] }, { background: [] }],
        [{ script: "super" }, { script: "sub" }],
        [{ header: "1" }, { header: "2" }, "blockquote", "code-block"],
        [
          { list: "ordered" },
          { list: "bullet" },
          { indent: "-1" },
          { indent: "+1" },
        ],
        ["direction", { align: [] }],
        ["link", "image", "video", "formula"],
        ["clean"],
      ],
      handlers: {
        image: imageHandler,
      },
    },
  };

  const modulesEmpty = {
    toolbar: false,
  };

  useEffect(() => {
    const fetchBlogContent = async () => {
      const result = await getCategories();
      setItems(result?.data);
    };
    fetchBlogContent();
  }, []);

  const addItem = (
    e: React.MouseEvent<HTMLButtonElement | HTMLAnchorElement>
  ) => {
    e.preventDefault();
    setItems([...items, name || `New item ${index++}`]);
    setName("");
    setTimeout(() => {
      inputRef.current?.focus();
    }, 0);
  };
  const onNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setName(event.target.value);
  };
  return (
    <Layout>
      <Layout.Content className="contentLayout">
        {userRole === "AppUser" || userRole === "editor" ? (
          <>
            <Typography.Title
              editable={{ onChange: handleTitleChange }}
              level={1}
              style={{
                textAlign: "center",
                padding: "10px",
                marginBottom: "20px",
              }}
            >
              {contentParams.title}
            </Typography.Title>
            {/* <Input
              value={title}
              onChange={handleTitleChange}
              size="large"
              style={{
                textAlign: "center",
                fontSize: "18px",
                padding: "10px",
                marginBottom: "20px",
              }}
              placeholder="Enter blog title"
            /> */}
            <ReactQuill
              ref={quillRef}
              value={blog.content}
              onChange={handleContentChange}
              modules={modules}
              theme="snow"
            />
            <Button
              type="primary"
              onClick={handleSave}
              loading={loading}
              style={{ marginTop: "16px", marginRight: "8px" }}
            >
              Save
            </Button>
            <Button
              type="default"
              onClick={handleReset}
              style={{ marginTop: "16px" }}
            >
              Reset
            </Button>
            <Button
              type="primary"
              danger
              onClick={onDelete} // Hàm xử lý khi nhấn nút delete
              style={{ marginTop: "16px", marginLeft: "8px" }}
            >
              Delete
            </Button>
            <Select
              style={{ width: 300, margin: "5% 5%" }}
              placeholder="Category"
              onChange={handleCategoryChange}
              value={category}
              dropdownRender={(menu) => (
                <>
                  {menu}
                  <Divider style={{ margin: "8px 0" }} />
                  <Space style={{ padding: "0 8px 4px" }}>
                    <Input
                      placeholder="Please enter item"
                      ref={inputRef}
                      value={name}
                      onChange={onNameChange}
                      onKeyDown={(e) => e.stopPropagation()}
                    />
                    <Button
                      type="text"
                      icon={<PlusOutlined />}
                      onClick={addItem}
                    >
                      Add item
                    </Button>
                  </Space>
                </>
              )}
              options={items.map((item: any) => ({ label: item, value: item }))}
            />
          </>
        ) : (
          <>
            <Flex gap="4px 0" wrap>
              {authors && authors.length > 0 ? (
                authors.map((item) => (
                  <Tag color="cyan" key={item.userName}>
                    {item.userName}
                  </Tag>
                ))
              ) : (
                <Tag color="#d9d9d9">No Authors</Tag> // Hoặc một thông báo khác nếu không có tác giả
              )}
            </Flex>

            <Typography.Title
              level={1}
              style={{
                textAlign: "center",
                padding: "10px",
                marginBottom: "20px",
              }}
            >
              {contentParams.title}
            </Typography.Title>
            <Tag style={{ marginBottom: "2%" }} color="geekblue">
              {category}
            </Tag>
            <ReactQuill
              value={blog.content}
              readOnly={true}
              theme="bubble"
              style={{
                backgroundColor: "rgba(255, 255, 255, 0.9)",
                borderRadius: "8px",
                boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
              }}
            />
          </>
        )}
      </Layout.Content>
    </Layout>
  );
};

export default RichTextEditor;
