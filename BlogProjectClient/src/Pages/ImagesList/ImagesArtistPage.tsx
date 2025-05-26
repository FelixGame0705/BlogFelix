import React, { useEffect, useState } from 'react';
import {
  Button, message, Row, Col, Image, Typography
} from 'antd';
import { getImagesArtist } from '../../api';
import { useAuth } from '../../Context/useAuth';

const { Title } = Typography;

const ImagesArtistPage = () => {
  const { isLoggedIn } = useAuth();
  const [images, setImages] = useState<any[]>([]);

  const fetchImages = async () => {
    try {
      const res = await getImagesArtist("");
      if (res?.data) setImages(res.data);
    } catch (error) {
      message.error('Lỗi khi tải danh sách ảnh');
    }
  };

  const handleDelete = async (id: number) => {
    try {
      const res = await fetch(`http://localhost:5000/api/deleteImages/${id}`, {
        method: 'DELETE',
      });

      if (res.ok) {
        message.success('Xoá ảnh thành công');
        fetchImages();
      } else {
        message.error('Xoá ảnh thất bại');
      }
    } catch (error) {
      message.error('Đã xảy ra lỗi khi xoá ảnh');
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
              style={{ width: '100%', height: '20vh', objectFit: 'cover', borderRadius: 8 }}
            />
            <div style={{ marginTop: 8, fontWeight: 'bold' }}>{img.name}</div>

            {isLoggedIn() && (
              <Button
                danger
                type="primary"
                size="small"
                style={{ marginTop: 8 }}
                onClick={() => handleDelete(img.imageID)}
              >
                Xoá
              </Button>
            )}
          </Col>
        ))}
      </Row>
    </div>
  );
};

export default ImagesArtistPage;
