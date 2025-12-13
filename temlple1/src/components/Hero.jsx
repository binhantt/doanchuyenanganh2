import React from 'react';
import { Typography, Button, Space } from 'antd';
import PropTypes from 'prop-types';

const { Title, Paragraph } = Typography;

/**
 * Hero section with couple names, subtitle, and cover image placeholder.
 */
function Hero({ groom, bride, coverImage, sideImage, brideImage, groomImage, onDetailsAnchor }) {
  const names = `${bride || 'Cô Dâu'} & ${groom || 'Chú Rể'}`;
  
  console.log('Hero props:', { groom, bride, coverImage, sideImage, brideImage, groomImage });

  // Example fetch snippet for future API integration:
  // useEffect(() => {
  //   fetch('https://your-api.example.com/invites')
  //     .then(res => res.json())
  //     .then(data => {
  //       // map data.title -> names, data.coverImage -> coverImage, etc.
  //     });
  // }, []);

  const containerStyle = {
    maxWidth: 1120,
    margin: '0 auto',
    display: 'grid',
    gap: 16,
    gridTemplateColumns: '1fr',
  };

  const heroBg = '#e7e0d1';
  const textColor = '#2f3325';
  const darkButton = {
    background: '#1f1f1b',
    borderColor: '#1f1f1b',
    color: '#fff',
    borderRadius: 999,
    height: 42,
    paddingInline: 18,
  };

  return (
    <section style={{ padding: '64px 16px', background: heroBg }}>
      <div
        style={{
          ...containerStyle,
          gridTemplateColumns: '1fr',
        }}
      >
        <div
          style={{
            display: 'grid',
            gap: 32,
            gridTemplateColumns: '1fr 1fr',
            alignItems: 'center',
          }}
        >
          {/* Left: Text content */}
          <div style={{ padding: '24px 0' }}>
            <Title
              level={1}
              style={{
                color: textColor,
                fontSize: 'clamp(32px, 5vw, 56px)',
                fontWeight: 400,
                lineHeight: 1.2,
                marginBottom: 24,
                fontFamily: 'serif',
              }}
            >
              {names}
            </Title>
            <Paragraph
      style={{
                color: '#4a4a3c',
                fontSize: 18,
                lineHeight: 1.6,
                marginBottom: 32,
              }}
            >
              Chúng tôi vui mừng được chia sẻ ngày trọng đại của mình với bạn. Sự có mặt của bạn
              sẽ làm cho ngày cưới của chúng tôi trở nên ý nghĩa hơn.
        </Paragraph>
            <Space size="middle">
              <Button style={darkButton} size="large" href="#wedding-details">
                Xem chi tiết
              </Button>
              <Button
                style={{
                  ...darkButton,
                  background: 'transparent',
                  borderColor: textColor,
                  color: textColor,
                }}
                size="large"
                href="#our-story"
              >
                Câu chuyện của chúng tôi
              </Button>
            </Space>
          </div>

          {/* Right: Images */}
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: '1.2fr 1fr',
              gap: 12,
            }}
          >
            <div
          style={{
            borderRadius: 16,
            overflow: 'hidden',
                boxShadow: '0 8px 24px rgba(0,0,0,0.12)',
          }}
        >
              {coverImage ? (
          <img
            src={coverImage}
                  alt={`${names} main`}
                  loading="lazy"
                  style={{ width: '100%', height: '100%', minHeight: 400, objectFit: 'cover' }}
                />
              ) : (
                <div style={{ 
                  width: '100%', 
                  minHeight: 400, 
                  background: '#e7e0d1',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: '#4a4a3c',
                  fontSize: 18
                }}>
                  {names}
                </div>
              )}
            </div>
            <div
              style={{
                display: 'grid',
                gridTemplateRows: '1fr auto',
                gap: 12,
              }}
            >
              <div
                style={{
                  borderRadius: 16,
                  overflow: 'hidden',
                  boxShadow: '0 8px 24px rgba(0,0,0,0.12)',
                  minHeight: 200,
                }}
              >
                {sideImage ? (
                  <img
                    src={sideImage}
                    alt={`${names} detail`}
                    loading="lazy"
                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                  />
                ) : (brideImage || groomImage) ? (
                  <div style={{ 
                    display: 'grid', 
                    gridTemplateColumns: brideImage && groomImage ? '1fr 1fr' : '1fr',
                    gap: 4,
                    height: '100%'
                  }}>
                    {brideImage && (
                      <img
                        src={brideImage}
                        alt={`${bride || 'Cô Dâu'}`}
                        loading="lazy"
                        style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                      />
                    )}
                    {groomImage && (
                      <img
                        src={groomImage}
                        alt={`${groom || 'Chú Rể'}`}
            loading="lazy"
            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
          />
                    )}
                  </div>
                ) : (
                  <div style={{ 
                    width: '100%', 
                    height: '100%', 
                    background: '#e7e0d1',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: '#4a4a3c',
                    fontSize: 14
                  }}>
                    {bride || 'Cô Dâu'} & {groom || 'Chú Rể'}
                  </div>
                )}
        </div>
              <Button style={darkButton} href="#contact">
                Liên hệ
        </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

Hero.propTypes = {
  groom: PropTypes.string,
  bride: PropTypes.string,
  coverImage: PropTypes.string,
  sideImage: PropTypes.string,
  brideImage: PropTypes.string,
  groomImage: PropTypes.string,
  onDetailsAnchor: PropTypes.func,
};

Hero.defaultProps = {
  groom: 'James',
  bride: 'Anna',
  coverImage:
    'https://cdn.prod.website-files.com/64da807a9aa000087e97b92d/655632bbb3eac932338e8b2e_653fbf561772abe4696a2195_cover.png?utm_source=chatgpt.com',
  sideImage:
    'https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?auto=format&fit=crop&w=900&q=80',
  onDetailsAnchor: undefined,
};

export default Hero;

