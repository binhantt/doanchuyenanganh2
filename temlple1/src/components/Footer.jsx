import React from 'react';
import { Typography } from 'antd';

const { Text } = Typography;

/**
 * Minimal footer.
 */
function Footer() {
  return (
    <footer
      style={{
        padding: '16px 24px',
        textAlign: 'center',
        background: '#f0ede3',
        color: '#4a4a3c',
        fontSize: 13,
      }}
    >
      <Text>© 2025 Wedding Blog — Made with Love</Text>
    </footer>
  );
}

export default Footer;

