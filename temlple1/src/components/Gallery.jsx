import React from 'react';
import { Row, Col, Card, Typography } from 'antd';
import PropTypes from 'prop-types';

const { Title } = Typography;

/**
 * Simple responsive gallery with lazy images.
 */
function Gallery({ images }) {
  // Example fetch snippet for future API integration:
  // useEffect(() => {
  //   fetch('https://your-api.example.com/invites')
  //     .then(res => res.json())
  //     .then(data => {
  //       // map data.gallery -> images
  //     });
  // }, []);

  return (
    <section id="gallery" style={{ padding: '32px 16px', background: '#1f1f1b' }}>
      <div style={{ maxWidth: 1120, margin: '0 auto' }}>
        <Title
          level={4}
          style={{ color: '#f7f3ea', textAlign: 'center', marginBottom: 24, letterSpacing: 0.4 }}
        >
          Instagram
        </Title>
        <Row gutter={[12, 12]} justify="center">
          {images.map((src, idx) => (
            <Col xs={12} sm={8} md={6} lg={4} key={src + idx}>
              <Card
                bordered={false}
                cover={
                  <img
                    loading="lazy"
                    src={src}
                    alt={`Gallery item ${idx + 1}`}
                    style={{
                      width: '100%',
                      height: 120,
                      objectFit: 'cover',
                      borderRadius: 12,
                    }}
                  />
                }
                style={{
                  borderRadius: 14,
                  overflow: 'hidden',
                  background: '#2b2b24',
                  boxShadow: '0 6px 18px rgba(0,0,0,0.25)',
                }}
                bodyStyle={{ display: 'none', padding: 0 }}
              />
            </Col>
          ))}
        </Row>
      </div>
    </section>
  );
}

Gallery.propTypes = {
  images: PropTypes.arrayOf(PropTypes.string),
};

Gallery.defaultProps = {
  images: [
    'https://images.unsplash.com/photo-1520854221050-0f4caff449fb?auto=format&fit=crop&w=600&q=80',
    'https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?auto=format&fit=crop&w=600&q=80',
    'https://images.unsplash.com/photo-1520854221050-0f4caff449fb?auto=format&fit=crop&w=600&q=80',
    'https://images.unsplash.com/photo-1520854221050-0f4caff449fb?auto=format&fit=crop&w=600&q=80',
    'https://images.unsplash.com/photo-1520854221050-0f4caff449fb?auto=format&fit=crop&w=600&q=80',
    'https://images.unsplash.com/photo-1520854221050-0f4caff449fb?auto=format&fit=crop&w=600&q=80',
  ],
};

export default Gallery;

