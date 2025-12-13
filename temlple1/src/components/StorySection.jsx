import React from 'react';
import { Typography, Row, Col, Card } from 'antd';
import PropTypes from 'prop-types';

const { Title, Paragraph } = Typography;

/**
 * Story section displaying the couple's love story with images.
 */
function StorySection({ story, storyImages }) {
  const bg = '#fff';
  const textColor = '#2f3325';
  const accentBg = '#f7f3ea';

  // Filter out empty strings and null values
  const validImages = storyImages && Array.isArray(storyImages) 
    ? storyImages.filter(img => img && img.trim() !== '')
    : [];

  return (
    <section id="our-story" style={{ padding: '64px 16px', background: bg }}>
      <div style={{ maxWidth: 1120, margin: '0 auto' }}>
        <Title
          level={2}
          style={{
            color: textColor,
            textAlign: 'center',
            marginBottom: 16,
            letterSpacing: 0.5,
            fontWeight: 400,
          }}
        >
          Our Love Story
        </Title>
        <Paragraph
          style={{
            textAlign: 'center',
            color: '#6b6b5c',
            marginBottom: 48,
            fontSize: 16,
            maxWidth: 600,
            margin: '0 auto 48px',
          }}
        >
          {story || 'Every love story is beautiful, but ours is our favorite.'}
        </Paragraph>

        {validImages.length > 0 && (
          <Row gutter={[24, 24]} justify="center">
            {validImages.map((image, idx) => (
              <Col xs={24} sm={12} md={8} key={image + idx}>
                <Card
                  bordered={false}
                  cover={
                    <div
                      style={{
                        position: 'relative',
                        paddingTop: '100%',
                        overflow: 'hidden',
                        borderRadius: 16,
                        background: accentBg,
                      }}
                    >
                      <img
                        src={image}
                        alt={`Our story ${idx + 1}`}
                        loading="lazy"
                        onError={(e) => {
                          console.error('Failed to load image:', image);
                          e.target.style.display = 'none';
                        }}
                        style={{
                          position: 'absolute',
                          top: 0,
                          left: 0,
                          width: '100%',
                          height: '100%',
                          objectFit: 'cover',
                        }}
                      />
                    </div>
                  }
                  style={{
                    borderRadius: 18,
                    overflow: 'hidden',
                    boxShadow: '0 8px 24px rgba(0,0,0,0.08)',
                    background: 'transparent',
                  }}
                  bodyStyle={{ display: 'none', padding: 0 }}
                />
              </Col>
            ))}
          </Row>
        )}

        {validImages.length === 0 && (
          <div style={{ textAlign: 'center', padding: '40px 20px', color: '#6b6b5c' }}>
            <Paragraph style={{ fontSize: 16, marginBottom: 0 }}>
              {story ? 'Chúng tôi sẽ cập nhật ảnh kỷ niệm sớm nhất có thể.' : 'Chưa có ảnh kỷ niệm.'}
            </Paragraph>
          </div>
        )}
      </div>
    </section>
  );
}

StorySection.propTypes = {
  story: PropTypes.string,
  storyImages: PropTypes.arrayOf(PropTypes.string),
};

StorySection.defaultProps = {
  story:
    'We met on a beautiful spring day and instantly knew we were meant to be. Through laughter, adventures, and countless memories, our love has grown stronger each day. Today, we are excited to share our special day with you.',
  storyImages: [],
};

export default StorySection;

