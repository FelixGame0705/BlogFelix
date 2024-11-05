import React, {
  useState,
  useCallback,
  useRef,
  useEffect,
  createRef,
} from "react";
import ReactQuill from "react-quill";
import { Input, Button, notification, Divider, Space, Select, InputRef } from "antd";
import "react-quill/dist/quill.snow.css";
import "./CreateBlogEditor.css"; // Thêm file CSS cho CreateBlogEditor
import { PlusOutlined } from "@ant-design/icons";
import { createBlogContentData, createPostAuthorData, getCategories } from "../../api";
import { useAuth } from "../../Context/useAuth";

type Props = {
  userRole: string;
  onBlogCreate: (blog: {
    title: string;
    content: string;
    category: string;
  }) => any;
};

const CreateBlogEditor = ({ userRole, onBlogCreate }: Props) => {
  
  const [items, setItems] = useState<any>(['jack', 'lucy']);
  const [name, setName] = useState('');
  const inputRef = useRef<InputRef>(null);

  const {user, decodedToken} = useAuth();
  let index = 0;

  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("");
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(false);
  const quillRef = useRef<ReactQuill>(null);
  const handleContentChange = useCallback((value: string) => {
    setContent(value);
  }, []);

  const handleSave = useCallback(async () => {
    setLoading(true);
    try {
      const result = await onBlogCreate({title, content, category});
      console.log("dsdsd"+result?.status);
      if(result?.status === 201){
        await createPostAuthorData(result?.data?.postID, decodedToken?.nameid)
      }
      
    } catch (error) {
      notification.error({
        message: "Error",
        description:
          error instanceof Error ? error.message : "An unknown error occurred.",
      });
    } finally {
      setLoading(false);
    }
  }, [onBlogCreate, title, content, category]);

  useEffect(() => {
    const fetchBlogContent = async () => {
      const result = await getCategories();
      setItems(result?.data);
    }
    fetchBlogContent();
  },[])
  

  const addItem = (e: React.MouseEvent<HTMLButtonElement | HTMLAnchorElement>) => {
    e.preventDefault();
    setItems([...items, name || `New item ${index++}`]);
    setName('');
    setTimeout(() => {
      inputRef.current?.focus();
    }, 0);
  };
  const onNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setName(event.target.value);
    
  };

  const handleSelectChange = (value: string) => {
    setCategory(value); // Cập nhật giá trị đã chọn
    console.log("Selected Item:", value); // Hiển thị giá trị đã chọn
  };
  return (
    <div className="editor-container">
      <Input
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        // size="large"
        style={{
          textAlign: "center",
          fontSize: "18px",
          padding: "10px",
          marginBottom: "20px",
        }}
        placeholder="Enter blog title"
      />
      <ReactQuill
        ref={quillRef}
        value={content}
        onChange={handleContentChange}
        style={{ minHeight: "500px" }} // Điều chỉnh chiều cao của editor
        theme="snow"
      />
      <Button
        type="primary"
        onClick={handleSave}
        loading={loading}
        style={{ marginTop: "16px" }}
      >
        Save
      </Button>

      <Select
        style={{ width: 300, margin: "5% 5%" }}
        placeholder="Require category"
        onChange={handleSelectChange}
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
              <Button type="text" icon={<PlusOutlined />} onClick={addItem}>
                Add item
              </Button>
            </Space>
          </>
        )}
        options={items?.map((item: any) => ({ label: item, value: item }))}
      />
    </div>
  );
};

export default CreateBlogEditor;
