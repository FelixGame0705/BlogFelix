// src/pages/UploadImageArtistPage.tsx

import React, { useState } from 'react';
import {
  Form, Input, Button, DatePicker, Select, message, Image, Upload, Typography
} from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import dayjs from 'dayjs';
import { createImagesArtist } from '../../../api';
import { useAuth } from '../../../Context/useAuth';

const { TextArea } = Input;
const { Option } = Select;
const { Title } = Typography;

const uploadToCloudinary = async (file: File): Promise<string> => {
  const formData = new FormData();
  formData.append("file", file);
  formData.append("upload_preset", "yc5t1mwl");

  const res = await fetch(`https://api.cloudinary.com/v1_1/dno1kjdkk/upload`, {
    method: "POST",
    body: formData
  });

  const data = await res.json();
  return data.secure_url;
};

const CreateImagesArtistPage = () => {
  const { isLoggedIn, decodedToken } = useAuth();
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [uploading, setUploading] = useState(false);
  const [form] = Form.useForm();

  const handleCreate = async (values: any) => {
    if (!imageUrl) {
      return message.warning('Vui lòng upload ảnh trước khi tạo');
    }

    try {
      const res = await createImagesArtist(
        values.ImageID || 0,
        values.Name,
        imageUrl,
        values.Description,
        values.UploadDate.toDate(),
        values.TypeImage
      );
      if (res?.data) {
        message.success('Tạo ảnh thành công');
        setImageUrl(null);
        form.resetFields();
      }
    } catch (error) {
      message.error('Lỗi khi tạo ảnh');
    }
  };

  if (!isLoggedIn() && decodedToken?.role == 'Admin') return <div style={{ padding: 24 }}>Bạn cần đăng nhập để đăng ảnh.</div>;

  return (
    <div style={{ padding: 24, maxWidth: 600, margin: '0 auto' }}>
      <Title level={3}>Upload ảnh</Title>
      <Form form={form} layout="vertical" onFinish={handleCreate}>
        <Form.Item label="Upload ảnh">
          <Upload
            customRequest={async ({ file, onSuccess, onError }) => {
              setUploading(true);
              try {
                const url = await uploadToCloudinary(file as File);
                setImageUrl(url);
                onSuccess?.({}, new XMLHttpRequest());
                message.success("Upload thành công");
              } catch (err) {
                onError?.(new Error("Upload thất bại"));
                message.error("Upload thất bại");
              } finally {
                setUploading(false);
              }
            }}
            showUploadList={false}
          >
            <Button icon={<UploadOutlined />} loading={uploading}>
              Chọn ảnh để upload
            </Button>
          </Upload>
          {imageUrl && (
            <div style={{ textAlign: 'center' }}>
              <Image
                src={imageUrl}
                alt="Preview"
                style={{ marginTop: 12, width: 200, height: 150, objectFit: 'cover' }}
              />
            </div>
          )}
        </Form.Item>

        <Form.Item name="Name" label="Tên ảnh">
          <TextArea rows={2} />
        </Form.Item>

        <Form.Item name="Description" label="Mô tả">
          <TextArea rows={2} />
        </Form.Item>

        <Form.Item
          name="UploadDate"
          label="Ngày tải lên"
          rules={[{ required: true, message: 'Chọn ngày' }]}
        >
          <DatePicker defaultValue={dayjs()} style={{ width: '100%' }} />
        </Form.Item>

        <Form.Item
          name="TypeImage"
          label="Loại ảnh"
          rules={[{ required: true, message: 'Chọn loại ảnh' }]}
        >
          <Select placeholder="Chọn loại">
            <Option value="Pixels">Pixels</Option>
            <Option value="2d">2D</Option>
            <Option value="max">Max</Option>
          </Select>
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit" disabled={!imageUrl}>
            Tạo ảnh
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default CreateImagesArtistPage;
