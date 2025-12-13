import React from 'react';
import { Card, Typography } from 'antd';
import PropTypes from 'prop-types';

const { Title, Paragraph } = Typography;

/**
 * Wedding details section with date, location, message, and map placeholder.
 */
function InfoSection({ date, location, message, mapSrc, locationImage, organization }) {
  // Example fetch snippet for future API integration:
  // useEffect(() => {
  //   fetch('https://your-api.example.com/invites')
  //     .then(res => res.json())
  //     .then(data => {
  //       // map data.date -> date, data.location -> location, data.custom_text -> message
  //     });
  // }, []);

  const bg = '#f0ede3';
  const text = '#2f3325';

  return (
    <section id="wedding-details" style={{ padding: '48px 16px', background: bg }}>
      <div style={{ maxWidth: 1120, margin: '0 auto' }}>
        <Card
          bordered={false}
          style={{
            borderRadius: 18,
            boxShadow: '0 10px 28px rgba(0,0,0,0.08)',
            background: '#fff',
            padding: 24,
          }}
        >
          <Title
            level={3}
            style={{ color: text, marginBottom: 12, textAlign: 'center', letterSpacing: 0.4 }}
          >
            From event planning to design and production
          </Title>
          <Paragraph style={{ textAlign: 'center', color: '#4a4a3c', marginBottom: 20 }}>
            Every detail curated with care. Below is a snapshot of the key information for our
            celebration day.
          </Paragraph>
          <div
            style={{
              display: 'grid',
              gap: 16,
              gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
              marginBottom: 16,
            }}
          >
            <Card
              size="small"
              bordered={false}
              style={{ background: bg, borderRadius: 12, boxShadow: 'none' }}
            >
              <Paragraph style={{ marginBottom: 6, color: text, fontWeight: 600 }}>Date</Paragraph>
              <Paragraph style={{ marginBottom: 0 }}>{date}</Paragraph>
            </Card>
            <Card
              size="small"
              bordered={false}
              style={{ background: bg, borderRadius: 12, boxShadow: 'none' }}
            >
              <Paragraph style={{ marginBottom: 6, color: text, fontWeight: 600 }}>
                Location
          </Paragraph>
              <Paragraph style={{ marginBottom: 0 }}>{location}</Paragraph>
            </Card>
            <Card
              size="small"
              bordered={false}
              style={{ background: bg, borderRadius: 12, boxShadow: 'none' }}
            >
              <Paragraph style={{ marginBottom: 6, color: text, fontWeight: 600 }}>
                Message
          </Paragraph>
              <Paragraph style={{ marginBottom: 0 }}>{message}</Paragraph>
            </Card>
            {organization && (
              <Card
                size="small"
                bordered={false}
                style={{ background: bg, borderRadius: 12, boxShadow: 'none' }}
              >
                <Paragraph style={{ marginBottom: 6, color: text, fontWeight: 600 }}>
                  Tổ chức
          </Paragraph>
                <Paragraph style={{ marginBottom: 0 }}>{organization}</Paragraph>
              </Card>
            )}
          </div>
          <div
            aria-label="Map"
            style={{
              borderRadius: 14,
              overflow: 'hidden',
              border: '1px solid #e6e0d4',
              background: '#f5f5f0',
              position: 'relative',
              minHeight: 300,
            }}
          >
            {locationImage ? (
              <div style={{ position: 'relative', width: '100%', height: '100%' }}>
                <img
                  src={locationImage}
                  alt={location}
                  style={{
                    width: '100%',
                    height: 300,
                    objectFit: 'cover',
                    display: 'block',
                  }}
                  loading="lazy"
                />
                <div
                  style={{
                    position: 'absolute',
                    bottom: 0,
                    left: 0,
                    right: 0,
                    background: 'linear-gradient(to top, rgba(0,0,0,0.6), transparent)',
                    padding: '20px',
                    color: '#fff',
                  }}
                >
                  <Paragraph
                    style={{
                      color: '#fff',
                      marginBottom: 8,
                      fontSize: 16,
                      fontWeight: 600,
                    }}
                  >
                    📍 {location}
                  </Paragraph>
                  {mapSrc && mapSrc.includes('google.com/maps') ? (
                    <a
                      href={mapSrc}
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{
                        color: '#fff',
                        textDecoration: 'underline',
                        fontSize: 14,
            }}
          >
                      Xem trên Google Maps →
                    </a>
                  ) : (
                    <a
                      href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(location)}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{
                        color: '#fff',
                        textDecoration: 'underline',
                        fontSize: 14,
                      }}
                    >
                      Xem trên Google Maps →
                    </a>
                  )}
                </div>
              </div>
            ) : mapSrc && mapSrc.includes('google.com/maps') ? (
            <iframe
              title="Map"
              src={mapSrc}
                style={{ width: '100%', height: 300, border: 0 }}
              loading="lazy"
              allowFullScreen
                referrerPolicy="no-referrer-when-downgrade"
              />
            ) : (
              <div style={{ padding: '40px 20px', textAlign: 'center' }}>
                <Paragraph style={{ color: '#6b6b5c', marginBottom: 16 }}>
                  📍 {location}
                </Paragraph>
                {mapSrc ? (
                  <a
                    href={mapSrc}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{
                      color: '#8b7355',
                      textDecoration: 'underline',
                      fontSize: 14,
                    }}
                  >
                    Xem trên Google Maps
                  </a>
                ) : (
                  <a
                    href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(location)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{
                      color: '#8b7355',
                      textDecoration: 'underline',
                      fontSize: 14,
                    }}
                  >
                    Xem trên Google Maps
                  </a>
                )}
              </div>
            )}
          </div>
        </Card>
      </div>
    </section>
  );
}

InfoSection.propTypes = {
  date: PropTypes.string,
  location: PropTypes.string,
  message: PropTypes.string,
  mapSrc: PropTypes.string,
  locationImage: PropTypes.string,
  organization: PropTypes.string,
};

InfoSection.defaultProps = {
  date: 'May 24, 2025',
  location: 'The Rose Garden, London',
  message: 'We are excited to celebrate with you. Your presence means the world to us.',
  mapSrc: null, // Set to null to use Google Maps search link instead
  locationImage:
    'https://images.unsplash.com/photo-1519167758481-83f550bb49b3?auto=format&fit=crop&w=1200&q=80',
};

export default InfoSection;

