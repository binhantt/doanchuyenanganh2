export const QUICK_REPLIES = [
  '👋 Chào bạn, mình cần tư vấn',
  '💰 Gói dịch vụ nào phù hợp?',
  '💍 Có những sản phẩm gì?',
  '🎁 Có ưu đãi không?',
  '📅 Thời gian chuẩn bị?',
  '📞 Làm sao đặt hàng?',
];

export const INITIAL_MESSAGE = {
  role: 'assistant' as const,
  content: 'Xin chào! Mình là Linh - tư vấn viên cưới hỏi. Mình có thể giúp gì cho bạn? 💕',
  timestamp: new Date(),
};

export const API_ENDPOINT = 'http://localhost:4000/api/user/chatbot/chat';
