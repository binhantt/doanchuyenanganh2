import { PackageRepository } from '../../infrastructure/repositories/PackageRepository';
import { ProductRepository } from '../../infrastructure/repositories/ProductRepository';
import { ServiceRepository } from '../../infrastructure/repositories/ServiceRepository';
import { FAQRepository } from '../../infrastructure/repositories/FAQRepository';

interface ChatMessage {
  role: 'user' | 'assistant' | 'system';
  content: string;
}

interface ChatContext {
  packages?: any[];
  products?: any[];
  services?: any[];
  faqs?: any[];
}

export class ChatbotService {
  private apiKey: string;
  private apiEndpoint: string;
  private model: string;

  constructor(
    private packageRepository: PackageRepository,
    private productRepository: ProductRepository,
    private serviceRepository: ServiceRepository,
    private faqRepository: FAQRepository
  ) {
    // Hỗ trợ cả Groq và OpenAI
    const useGroq = process.env.USE_GROQ === 'true' || process.env.GROQ_API_KEY;
    
    if (useGroq) {
      this.apiKey = process.env.GROQ_API_KEY || '';
      this.apiEndpoint = 'https://api.groq.com/openai/v1/chat/completions';
      this.model = process.env.GROQ_MODEL || 'llama-3.3-70b-versatile'; // Model mới nhất
      console.log('🚀 Using Groq API (Fast & Free!)');
    } else {
      this.apiKey = process.env.OPENAI_API_KEY || '';
      this.apiEndpoint = 'https://api.openai.com/v1/chat/completions';
      this.model = process.env.OPENAI_MODEL || 'gpt-3.5-turbo';
      console.log('🤖 Using OpenAI API');
    }
    
    if (this.apiKey) {
      console.log('✅ API Key configured');
      console.log('📝 Using model:', this.model);
    } else {
      console.warn('⚠️ API Key not found in environment variables');
    }
  }

  // Check if message needs database data
  private needsDatabaseData(userMessage: string): boolean {
    const dataKeywords = [
      /gói|package|combo|trọn gói/i,
      /giá|bao nhiêu|chi phí|giá cả/i,
      /sản phẩm|thiệp|trang trí|product/i,
      /dịch vụ|service|chụp ảnh|quay phim|trang điểm|makeup/i,
      /ưu đãi|khuyến mãi|giảm giá|promotion/i,
    ];
    
    return dataKeywords.some(pattern => pattern.test(userMessage));
  }

  // Get relevant data from database
  private async getRelevantData(userMessage: string): Promise<ChatContext> {
    const context: ChatContext = {};

    try {
      // Get packages if user asks about packages/gói
      if (
        /gói|package|combo|trọn gói/i.test(userMessage) ||
        /giá|bao nhiêu|chi phí/i.test(userMessage)
      ) {
        const packages = await this.packageRepository.findAll({ isActive: true });
        context.packages = packages.slice(0, 5).map((pkg: any) => ({
          name: pkg.name,
          price: pkg.price,
          description: pkg.description,
          features: pkg.features,
        }));
      }

      // Get products if user asks about products
      if (/sản phẩm|thiệp|trang trí|product/i.test(userMessage)) {
        const products = await this.productRepository.findAll({ isActive: true });
        context.products = products.slice(0, 5).map((prod: any) => ({
          name: prod.name,
          price: prod.price,
          category: prod.category,
          description: prod.description,
        }));
      }

      // Get services
      if (/dịch vụ|service|chụp ảnh|quay phim|trang điểm/i.test(userMessage)) {
        const services = await this.serviceRepository.findAll({ isActive: true });
        context.services = services.slice(0, 5).map((svc: any) => ({
          name: svc.name,
          price: svc.price,
          description: svc.description,
        }));
      }

      // Get FAQs
      if (/hỏi|câu hỏi|thắc mắc|faq/i.test(userMessage)) {
        const faqs = await this.faqRepository.findAll({ isActive: true });
        context.faqs = faqs.slice(0, 5).map((faq: any) => ({
          question: faq.question,
          answer: faq.answer,
        }));
      }
    } catch (error) {
      console.error('Error getting relevant data:', error);
    }

    return context;
  }

  // Build system prompt with context
  private buildSystemPrompt(context: ChatContext): string {
    let prompt = `Bạn là Linh - tư vấn viên cưới hỏi thân thiện, nhiệt tình và am hiểu.

PHONG CÁCH GIAO TIẾP:
- Nói chuyện tự nhiên như bạn bè, không cứng nhắc
- Dùng emoji phù hợp để thân thiện hơn 😍💕✨🥰💖🌸💍🎉🎊😊💐💌🌟🍀💝
- Gọi khách hàng là "bạn" hoặc "anh/chị"
- Nhiệt tình nhưng không quá áp đặt
- Chia sẻ kinh nghiệm, tips hữu ích
- Trả lời mượt mà các câu chào hỏi, cảm ơn, xã giao thông thường

VAI TRÒ:
- Tư vấn dịch vụ cưới hỏi một cách chân thành
- Giúp khách hàng chọn gói phù hợp với ngân sách
- Trả lời thắc mắc về sản phẩm, dịch vụ
- Hỗ trợ đặt hàng và giải đáp
- Trò chuyện thân thiện, tạo cảm giác thoải mái

THÔNG TIN CƠ BẢN:
- Tên: Linh
- Công ty: Dịch vụ cưới hỏi trọn gói
- Hotline: 1900-xxxx
- Giờ làm việc: 8h-20h hàng ngày
- Địa chỉ: Có thể tư vấn online hoặc gặp trực tiếp

QUY TẮC:
- Trả lời ngắn gọn 2-3 câu, dễ hiểu
- Với câu hỏi chào hỏi, xã giao → Trả lời tự nhiên, không cần dữ liệu
- Với câu hỏi về giá, sản phẩm → Dùng thông tin có trong dữ liệu
- Nếu không chắc, gợi ý liên hệ để được tư vấn kỹ hơn
- Không bịa giá hoặc cam kết không có cơ sở

`;

    // Add packages info
    if (context.packages && context.packages.length > 0) {
      prompt += '\n📦 GÓI DỊCH VỤ HIỆN CÓ:\n';
      context.packages.forEach((pkg) => {
        prompt += `- ${pkg.name}: ${pkg.price?.toLocaleString('vi-VN')}đ\n`;
        if (pkg.description) prompt += `  ${pkg.description}\n`;
      });
    }

    // Add products info
    if (context.products && context.products.length > 0) {
      prompt += '\n🎁 SẢN PHẨM:\n';
      context.products.forEach((prod) => {
        prompt += `- ${prod.name} (${prod.category}): ${prod.price?.toLocaleString('vi-VN')}đ\n`;
      });
    }

    // Add services info
    if (context.services && context.services.length > 0) {
      prompt += '\n💼 DỊCH VỤ:\n';
      context.services.forEach((svc) => {
        prompt += `- ${svc.name}: ${svc.price?.toLocaleString('vi-VN')}đ\n`;
      });
    }

    // Add FAQs
    if (context.faqs && context.faqs.length > 0) {
      prompt += '\n❓ CÂU HỎI THƯỜNG GẶP:\n';
      context.faqs.forEach((faq) => {
        prompt += `Q: ${faq.question}\nA: ${faq.answer}\n\n`;
      });
    }

    prompt += '\n\nHãy trả lời tự nhiên, thân thiện như đang tư vấn trực tiếp. Nếu khách hỏi ngoài phạm vi, lịch sự giải thích và đề xuất liên hệ để được hỗ trợ tốt hơn nhé! 😊';

    return prompt;
  }

  // Call AI API (Groq or OpenAI)
  private async callAI(messages: ChatMessage[]): Promise<string> {
    try {
      const response = await fetch(this.apiEndpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${this.apiKey}`,
        },
        body: JSON.stringify({
          model: this.model,
          messages: messages,
          temperature: 0.7,
          max_tokens: 500,
          top_p: 1,
          frequency_penalty: 0.5,
          presence_penalty: 0.5,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        console.error('AI API error details:', errorData);
        throw new Error(`AI API error: ${response.status} - ${JSON.stringify(errorData)}`);
      }

      const data: any = await response.json();
      return data.choices[0]?.message?.content || 'Xin lỗi, tôi không thể trả lời lúc này.';
    } catch (error) {
      console.error('AI API error:', error);
      throw new Error('Không thể kết nối với AI. Vui lòng thử lại sau.');
    }
  }

  // Main chat method
  async chat(userMessage: string, conversationHistory: ChatMessage[] = []): Promise<string> {
    try {
      // Validate API key
      if (!this.apiKey) {
        return 'Chatbot chưa được cấu hình. Vui lòng liên hệ quản trị viên.';
      }

      // Get relevant data from database
      const context = await this.getRelevantData(userMessage);

      // Build system prompt with context
      const systemPrompt = this.buildSystemPrompt(context);

      // Build messages array
      const messages: ChatMessage[] = [
        { role: 'system', content: systemPrompt },
        ...conversationHistory.slice(-6), // Keep last 6 messages for context
        { role: 'user', content: userMessage },
      ];

      // Call AI
      const response = await this.callAI(messages);

      return response;
    } catch (error) {
      console.error('Chatbot error:', error);
      return 'Xin lỗi, đã có lỗi xảy ra. Vui lòng thử lại hoặc liên hệ hotline: 1900-xxxx';
    }
  }

  // Quick replies for common questions
  getQuickReplies(): string[] {
    return [
      '👋 Chào bạn, mình cần tư vấn',
      '💰 Gói dịch vụ nào phù hợp với mình?',
      '💍 Có những sản phẩm gì?',
      '🎁 Có ưu đãi gì không?',
      '📅 Thời gian chuẩn bị mất bao lâu?',
      '📞 Làm sao để đặt hàng?',
    ];
  }
}
