import React, { useEffect, useState } from 'react';
import {
  Form, Input, Button, DatePicker, Select, message,
  Row, Col, Image, Upload,
  Typography
} from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import dayjs from 'dayjs';
import { createImagesArtist, getImagesArtist } from '../../api'; // Giả định đã có API này
import { useAuth } from '../../Context/useAuth';
import FormItem from 'antd/es/form/FormItem';

const { TextArea } = Input;
const { Option } = Select;

type ImageArtist = {
  ImageID: number;
  ImageUrl: string;
  Name: string;
  Description: string;
  UploadDate: Date;
  TypeImage: string;
};



const uploadToCloudinary = async (file: File): Promise<string> => {

  const formData = new FormData();
  formData.append("file", file);
  formData.append("upload_preset", "yc5t1mwl");

  const res = await fetch(`https://api.cloudinary.com/v1_1/dno1kjdkk/upload`, {
    method: "POST",
    body: formData
  });

  const data = await res.json();
  return data.secure_url; // ưu tiên secure_url
};

const ImagesArtistPage = () => {
  const { Title } = Typography;

    const {decodedToken, isLoggedIn, userGoogle} = useAuth();
  const [images, setImages] = useState<any>([]);
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [uploading, setUploading] = useState(false);

  const [form] = Form.useForm();

  const fetchImages = async () => {
    try {
      const res = await getImagesArtist("");
      console.log("Danh sách ảnh:", res?.data); 
      if (res?.data) setImages(res?.data);
    } catch (error) {
      message.error('Lỗi khi tải danh sách ảnh');
    }
  };

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
        fetchImages();
      }
    } catch (error) {
      message.error('Lỗi khi tạo ảnh');
    }
  };

  useEffect(() => {
    fetchImages();
  }, []);

  return (
  <div style={{ padding: 24, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
    <Title level={2} className="header-title" style={{ textAlign: 'center' }}>
      Arts
    </Title>

    {isLoggedIn() && (
      <Form
        form={form}
        layout="vertical"
        onFinish={handleCreate}
        style={{ width: '100%', maxWidth: 600, marginBottom: 32 }}
      >
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
                style={{
                  marginTop: 12,
                  width: 200,
                  height: 150,
                  objectFit: 'cover',
                  display: 'inline-block',
                }}
              />
            </div>
          )}
        </Form.Item>
        <FormItem name="Name" label="Tên ảnh">
          <TextArea rows={3} />
        </FormItem>

        <Form.Item name="Description" label="Mô tả">
          <TextArea rows={3} />
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
    )}

    <Row gutter={[16, 16]} justify="center">
      {images.map((img: any) => (
        <Col key={img.imageID} xs={24} sm={12} md={8} lg={6} style={{ textAlign: 'center' }}>
          <Image
            src={img.imageUrl}
            alt={img.description}
            style={{ width: '100%', height: 250, objectFit: 'cover', borderRadius: 8 }}
          />
          <div style={{ marginTop: 8 }}>{img.name}</div>
        </Col>
      ))}
    </Row>
  </div>
);

};

export default ImagesArtistPage;
