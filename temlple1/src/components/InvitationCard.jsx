import React from 'react';
import { Typography, Divider } from 'antd';
import PropTypes from 'prop-types';

const { Title, Paragraph, Text } = Typography;

/**
 * Elegant wedding invitation card component.
 */
function InvitationCard({
  groom,
  bride,
  date,
  location,
  invitationMessage,
  coupleImage,
  guestName,
}) {
  // Example fetch snippet for future API integration:
  // useEffect(() => {
  //   fetch('https://your-api.example.com/invites')
  //     .then(res => res.json())
  //     .then(data => {
  //       // map data.groom -> groom, data.bride -> bride, data.date -> date, etc.
  //     });
  // }, []);

  const bg = '#f7f3ea';
  const textColor = '#2f3325';
  const accentColor = '#8b7355';

  return (
    <section
      id="invitation"
      style={{
        padding: '80px 16px',
        background: 'linear-gradient(135deg, #f7f3ea 0%, #e7e0d1 100%)',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Decorative elements */}
      <div
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          height: 2,
          background: `repeating-linear-gradient(90deg, ${accentColor} 0px, ${accentColor} 20px, transparent 20px, transparent 40px)`,
          opacity: 0.3,
        }}
      />
      <div
        style={{
          position: 'absolute',
          bottom: 0,
          left: 0,
          right: 0,
          height: 2,
          background: `repeating-linear-gradient(90deg, ${accentColor} 0px, ${accentColor} 20px, transparent 20px, transparent 40px)`,
          opacity: 0.3,
        }}
      />

      <div style={{ maxWidth: 800, margin: '0 auto', position: 'relative' }}>
        <div
          style={{
            background: '#fff',
            borderRadius: 24,
            padding: '64px 48px',
            boxShadow: '0 20px 60px rgba(0,0,0,0.15)',
            border: `1px solid ${accentColor}20`,
            position: 'relative',
          }}
        >
          {/* Decorative corner elements */}
          <div
            style={{
              position: 'absolute',
              top: 24,
              left: 24,
              width: 40,
              height: 40,
              borderTop: `2px solid ${accentColor}`,
              borderLeft: `2px solid ${accentColor}`,
              opacity: 0.4,
            }}
          />
          <div
            style={{
              position: 'absolute',
              top: 24,
              right: 24,
              width: 40,
              height: 40,
              borderTop: `2px solid ${accentColor}`,
              borderRight: `2px solid ${accentColor}`,
              opacity: 0.4,
            }}
          />
          <div
            style={{
              position: 'absolute',
              bottom: 24,
              left: 24,
              width: 40,
              height: 40,
              borderBottom: `2px solid ${accentColor}`,
              borderLeft: `2px solid ${accentColor}`,
              opacity: 0.4,
            }}
          />
          <div
            style={{
              position: 'absolute',
              bottom: 24,
              right: 24,
              width: 40,
              height: 40,
              borderBottom: `2px solid ${accentColor}`,
              borderRight: `2px solid ${accentColor}`,
              opacity: 0.4,
            }}
          />

          {/* Main content */}
          <div style={{ textAlign: 'center', marginBottom: 32 }}>
            {guestName ? (
              <div>
                <Text
                  style={{
                    color: accentColor,
                    fontSize: 14,
                    letterSpacing: 3,
                    textTransform: 'uppercase',
                    fontWeight: 500,
                  }}
                >
                  Kính mời
                </Text>
                <div style={{ marginTop: 20 }}>
                  <Text
                    style={{
                      color: textColor,
                      fontSize: 20,
                      fontFamily: 'serif',
                      letterSpacing: 1.5,
                      fontWeight: 400,
                    }}
                  >
                    {guestName}
                  </Text>
                </div>
              </div>
            ) : (
              <Text
                style={{
                  color: accentColor,
                  fontSize: 14,
                  letterSpacing: 3,
                  textTransform: 'uppercase',
                  fontWeight: 500,
                }}
              >
                Trân trọng kính mời
              </Text>
            )}
          </div>

          <Divider
            style={{
              borderColor: accentColor,
              opacity: 0.3,
              margin: '24px 0',
            }}
          >
            <span
              style={{
                fontSize: 24,
                color: accentColor,
                fontFamily: 'serif',
              }}
            >
              ✦
            </span>
          </Divider>

          <div style={{ textAlign: 'center', marginBottom: 32 }}>
            <Title
              level={1}
              style={{
                color: textColor,
                fontSize: 'clamp(36px, 6vw, 52px)',
                fontWeight: 300,
                lineHeight: 1.4,
                marginBottom: 8,
                fontFamily: 'serif',
                letterSpacing: 2,
              }}
            >
              {bride}
            </Title>
            <Text
              style={{
                color: accentColor,
                fontSize: 20,
                fontFamily: 'serif',
                margin: '0 16px',
              }}
            >
              &
            </Text>
            <Title
              level={1}
              style={{
                color: textColor,
                fontSize: 'clamp(36px, 6vw, 52px)',
                fontWeight: 300,
                lineHeight: 1.4,
                marginTop: 8,
                fontFamily: 'serif',
                letterSpacing: 2,
              }}
            >
              {groom}
            </Title>
          </div>

          <Divider
            style={{
              borderColor: accentColor,
              opacity: 0.3,
              margin: '24px 0',
            }}
          >
            <span
              style={{
                fontSize: 24,
                color: accentColor,
                fontFamily: 'serif',
              }}
            >
              ✦
            </span>
          </Divider>

          <div style={{ textAlign: 'center', marginBottom: 32 }}>
            <Paragraph
              style={{
                color: '#4a4a3c',
                fontSize: 16,
                lineHeight: 1.8,
                marginBottom: 24,
                fontStyle: 'italic',
              }}
            >
              {invitationMessage ||
                'Chúng tôi vui mừng được chia sẻ niềm hạnh phúc trong ngày trọng đại của cuộc đời mình. Sự có mặt của bạn sẽ làm cho ngày cưới của chúng tôi trở nên ý nghĩa và trọn vẹn hơn.'}
            </Paragraph>
          </div>

          <Divider
            style={{
              borderColor: accentColor,
              opacity: 0.3,
              margin: '24px 0',
            }}
          >
            <span
              style={{
                fontSize: 24,
                color: accentColor,
                fontFamily: 'serif',
              }}
            >
              ✦
            </span>
          </Divider>

          <div
            style={{
              display: 'grid',
              gap: 24,
              gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
              marginTop: 32,
            }}
          >
            <div>
              <Text
                style={{
                  color: accentColor,
                  fontSize: 12,
                  letterSpacing: 1.5,
                  textTransform: 'uppercase',
                  fontWeight: 600,
                }}
              >
                Ngày cưới
              </Text>
              <Paragraph
                style={{
                  color: textColor,
                  fontSize: 18,
                  marginTop: 8,
                  marginBottom: 0,
                  fontFamily: 'serif',
                }}
              >
                {date}
              </Paragraph>
            </div>
            <div>
              <Text
                style={{
                  color: accentColor,
                  fontSize: 12,
                  letterSpacing: 1.5,
                  textTransform: 'uppercase',
                  fontWeight: 600,
                }}
              >
                Địa điểm
              </Text>
              <Paragraph
                style={{
                  color: textColor,
                  fontSize: 18,
                  marginTop: 8,
                  marginBottom: 0,
                  fontFamily: 'serif',
                }}
              >
                {location}
              </Paragraph>
            </div>
          </div>

          <div style={{ textAlign: 'center', marginTop: 40 }}>
            <Text
              style={{
                color: accentColor,
                fontSize: 14,
                letterSpacing: 2,
                fontStyle: 'italic',
              }}
            >
              {guestName ? `Rất mong được đón tiếp ${guestName}` : 'Rất mong được đón tiếp bạn'}
            </Text>
          </div>
        </div>
      </div>
    </section>
  );
}

InvitationCard.propTypes = {
  groom: PropTypes.string,
  bride: PropTypes.string,
  date: PropTypes.string,
  location: PropTypes.string,
  invitationMessage: PropTypes.string,
  coupleImage: PropTypes.string,
  guestName: PropTypes.string,
};

InvitationCard.defaultProps = {
  groom: 'James',
  bride: 'Anna',
  date: '24 tháng 5, 2025',
  location: 'The Rose Garden, London',
  invitationMessage: '',
  coupleImage: '',
  guestName: '',
};

export default InvitationCard;

