import { Request, Response } from 'express';
import { ChatbotService } from '../../application/services/ChatbotService';

interface ChatMessage {
  role: 'user' | 'assistant';
  content: string;
}

export class ChatbotController {
  constructor(private chatbotService: ChatbotService) {}

  // Send message to chatbot
  async sendMessage(req: Request, res: Response): Promise<void> {
    try {
      const { message, conversationHistory } = req.body;

      if (!message || typeof message !== 'string') {
        res.status(400).json({
          success: false,
          message: 'Tin nhắn là bắt buộc',
        });
        return;
      }

      // Validate conversation history
      const history: ChatMessage[] = Array.isArray(conversationHistory)
        ? conversationHistory.filter(
            (msg: any) =>
              msg.role &&
              ['user', 'assistant'].includes(msg.role) &&
              typeof msg.content === 'string'
          )
        : [];

      // Get response from chatbot
      const response = await this.chatbotService.chat(message, history);

      res.json({
        success: true,
        data: {
          message: response.message,
          images: response.images,
          products: response.products,
          action: response.action,
          timestamp: new Date(),
        },
      });
    } catch (error) {
      console.error('Chatbot controller error:', error);
      res.status(500).json({
        success: false,
        message: 'Có lỗi xảy ra. Vui lòng thử lại.',
      });
    }
  }

  // Create order from chatbot
  async createOrder(req: Request, res: Response): Promise<void> {
    try {
      const {
        productId,
        productType,
        clientName,
        clientPhone,
        clientEmail,
        weddingDate,
        venue,
        guestCount,
        notes,
      } = req.body;

      // Validate required fields
      if (!productId || !productType || !clientName || !clientPhone || !weddingDate || !venue) {
        res.status(400).json({
          success: false,
          message: 'Thiếu thông tin bắt buộc',
        });
        return;
      }

      // Validate product type
      if (!['package', 'product', 'service'].includes(productType)) {
        res.status(400).json({
          success: false,
          message: 'Loại sản phẩm không hợp lệ',
        });
        return;
      }

      // Create order
      const result = await this.chatbotService.createOrderFromChat({
        productId,
        productType,
        clientName,
        clientPhone,
        clientEmail,
        weddingDate: new Date(weddingDate),
        venue,
        guestCount,
        notes,
      });

      if (result.success) {
        res.json({
          success: true,
          data: {
            orderId: result.orderId,
            message: result.message,
          },
        });
      } else {
        res.status(400).json({
          success: false,
          message: result.message,
        });
      }
    } catch (error) {
      console.error('Create order error:', error);
      res.status(500).json({
        success: false,
        message: 'Có lỗi xảy ra khi tạo đơn hàng',
      });
    }
  }

  // Get quick replies
  async getQuickReplies(req: Request, res: Response): Promise<void> {
    try {
      const quickReplies = this.chatbotService.getQuickReplies();

      res.json({
        success: true,
        data: quickReplies,
      });
    } catch (error) {
      console.error('Get quick replies error:', error);
      res.status(500).json({
        success: false,
        message: 'Có lỗi xảy ra',
      });
    }
  }

  // Get chatbot info
  async getInfo(req: Request, res: Response): Promise<void> {
    try {
      res.json({
        success: true,
        data: {
          name: 'Wedding AI Assistant',
          description: 'Trợ lý AI tư vấn dịch vụ cưới hỏi',
          capabilities: [
            'Tư vấn gói dịch vụ',
            'Giới thiệu sản phẩm',
            'Trả lời câu hỏi thường gặp',
            'Hỗ trợ đặt hàng',
          ],
          version: '1.0.0',
        },
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: 'Có lỗi xảy ra',
      });
    }
  }
}
