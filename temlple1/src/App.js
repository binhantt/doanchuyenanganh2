/**
 * README (quick start)
 * - Install: npm install
 * - Run dev: npm start
 * - Tech: React 18, Ant Design (reset.css)
 * - Where to hook API:
 *   - Each component has a commented useEffect snippet to fetch from https://your-api.example.com/invites
 *   - Map fields: title/names -> Hero, date/location/message -> InfoSection, coverImage/gallery -> Hero/Gallery
 * - Replace placeholder images with real URLs from your API when ready.
 */
import React from 'react';
import 'antd/dist/reset.css';
import { ConfigProvider } from 'antd';
import WeddingPage from './pages/WeddingPage';

function App() {
  return (
    <ConfigProvider
      theme={{
        token: {
          colorPrimary: '#1f1f1b',
          colorLink: '#1f1f1b',
          colorInfo: '#1f1f1b',
          fontFamily:
            "'Inter', system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
        },
      }}
    >
      <WeddingPage />
    </ConfigProvider>
  );
}

export default App;

