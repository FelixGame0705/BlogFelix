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

    <Button type="primary" href="/artist/upload" style={{ marginBottom: 16 }}>
  Đăng ảnh mới
</Button>


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
