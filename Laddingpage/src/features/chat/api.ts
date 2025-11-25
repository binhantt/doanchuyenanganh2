import { Message, ChatResponse, OrderAction, OrderFormData } from './types';
import { API_ENDPOINT } from './constants';

export async function sendChatMessage(
  message: string,
  conversationHistory: Message[]
): Promise<{
  message: string;
  images?: Array<{ url: string; alt: string; productName?: string }>;
  products?: Array<{ id: string; name: string; price: number }>;
  action?: OrderAction;
}> {
  try {
    const response = await fetch(API_ENDPOINT, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        message,
        conversationHistory: conversationHistory.slice(-6).map((m) => ({
          role: m.role,
          content: m.content,
        })),
      }),
    });

    if (!response.ok) {
      throw new Error('Failed to get response');
    }

    const data: ChatResponse = await response.json();
    return {
      message: data.data?.message || data.message || 'Xin lỗi, mình không thể trả lời lúc này.',
      images: data.data?.images,
      products: data.data?.products,
      action: data.data?.action,
    };
  } catch (error) {
    console.error('Chat API error:', error);
    throw new Error('Xin lỗi, đã có lỗi xảy ra. Vui lòng thử lại sau! 😊');
  }
}

export async function createOrder(orderData: OrderFormData): Promise<{
  success: boolean;
  orderId?: string;
  message: string;
}> {
  try {
    const response = await fetch(`${API_ENDPOINT.replace('/chat', '/order')}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(orderData),
    });

    if (!response.ok) {
      throw new Error('Failed to create order');
    }

    const data = await response.json();
    
    if (data.success) {
      return {
        success: true,
        orderId: data.data?.orderId,
        message: data.data?.message || 'Đơn hàng đã được tạo thành công!',
      };
    } else {
      return {
        success: false,
        message: data.message || 'Không thể tạo đơn hàng',
      };
    }
  } catch (error) {
    console.error('Create order error:', error);
    return {
      success: false,
      message: 'Đã có lỗi xảy ra khi tạo đơn hàng',
    };
  }
}
