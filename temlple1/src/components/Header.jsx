import React from 'react';
import { Layout, Typography, Space, Button } from 'antd';
import PropTypes from 'prop-types';

const { Header: AntHeader } = Layout;
const { Title, Text } = Typography;

/**
 * Top navigation bar with logo + links.
 */
function Header({ title }) {
  const bg = '#f7f3ea';
  const text = '#2f3325';

  const navLink = {
    color: text,
    fontSize: 14,
    fontWeight: 500,
    textDecoration: 'none',
  };

  return (
    <AntHeader
      style={{
        background: bg,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '0 24px',
        borderBottom: '1px solid #d9d1c0',
        height: 64,
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
      <Title
          level={4}
        style={{
          margin: 0,
            color: text,
          fontWeight: 700,
          letterSpacing: 0.3,
        }}
      >
        {title}
      </Title>
        <Text aria-hidden style={{ color: '#a6a094' }}>
          •
        </Text>
        <Text style={{ color: '#a6a094', fontWeight: 600 }}>Belize</Text>
      </div>

      <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
        <Space size={16} wrap>
          <a href="#pricing" style={navLink}>
            Pricing
          </a>
          <a href="#features" style={navLink}>
            Features
          </a>
          <a href="#use-cases" style={navLink}>
            Use cases
          </a>
        </Space>
        <Button
          size="small"
          style={{
            background: '#1f1f1b',
            borderColor: '#1f1f1b',
            color: '#fff',
            borderRadius: 999,
            height: 30,
            paddingInline: 14,
          }}
          href="#contact"
        >
          Get in touch
        </Button>
      </div>
    </AntHeader>
  );
}

Header.propTypes = {
  title: PropTypes.string,
};

Header.defaultProps = {
  title: 'Wedding',
};

export default Header;

