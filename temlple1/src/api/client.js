import axios from 'axios';

const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:4000/api';

const apiClient = axios.create({
  baseURL: API_BASE_URL,
  timeout: 30000,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const getInvitationByShareUrl = async (shareUrl, guestName = '') => {
  try {
    console.log('Fetching invitation with shareUrl:', shareUrl, 'guestName:', guestName);
    // Encode guestName để tránh lỗi với ký tự đặc biệt
    const params = guestName ? { guestName: encodeURIComponent(guestName) } : {};
    // Sử dụng route mới với số ít /invitation/share/
    const response = await apiClient.get(`/user/invitation/share/${shareUrl}`, { params });
    console.log('API Response:', response.data);
    // Đảm bảo guestName từ URL được giữ lại trong response
    if (guestName && response.data && response.data.data) {
      response.data.data.guestName = decodeURIComponent(guestName);
    }
    return response.data;
  } catch (error) {
    console.error('Error fetching invitation:', error);
    if (error.response) {
      console.error('Error response:', error.response.data);
      // Thử với route cũ nếu route mới không hoạt động
      if (error.response.status === 404) {
        console.log('Trying fallback route /user/invitations/share/');
        const params = guestName ? { guestName: encodeURIComponent(guestName) } : {};
        const fallbackResponse = await apiClient.get(`/user/invitations/share/${shareUrl}`, { params });
        if (fallbackResponse.data && fallbackResponse.data.data && guestName) {
          fallbackResponse.data.data.guestName = decodeURIComponent(guestName);
        }
        return fallbackResponse.data;
      }
    }
    throw error;
  }
};

export const getInvitationBySlug = async (slug, guestName = '') => {
  try {
    console.log('Fetching invitation with slug:', slug, 'guestName:', guestName);
    const params = guestName ? { guestName: encodeURIComponent(guestName) } : {};
    // Sử dụng route mới với số ít /invitation/slug/
    const response = await apiClient.get(`/user/invitation/slug/${slug}`, { params });
    // Đảm bảo guestName từ URL được giữ lại trong response
    if (guestName && response.data && response.data.data) {
      response.data.data.guestName = decodeURIComponent(guestName);
    }
    return response.data;
  } catch (error) {
    console.error('Error fetching invitation:', error);
    if (error.response && error.response.status === 404) {
      // Thử với route cũ
      console.log('Trying fallback route /user/invitations/slug/');
      const params = guestName ? { guestName: encodeURIComponent(guestName) } : {};
      const fallbackResponse = await apiClient.get(`/user/invitations/slug/${slug}`, { params });
      if (fallbackResponse.data && fallbackResponse.data.data && guestName) {
        fallbackResponse.data.data.guestName = decodeURIComponent(guestName);
      }
      return fallbackResponse.data;
    }
    throw error;
  }
};

export default apiClient;
