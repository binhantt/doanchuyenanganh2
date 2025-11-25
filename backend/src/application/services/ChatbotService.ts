import { PackageRepository } from '../../infrastructure/repositories/PackageRepository';
import { ProductRepository } from '../../infrastructure/repositories/ProductRepository';
import { ServiceRepository } from '../../infrastructure/repositories/ServiceRepository';
import { FAQRepository } from '../../infrastructure/repositories/FAQRepository';
import { db } from '../../infrastructure/database/connection';

interface ChatMessage {
  role: 'user' | 'assistant' | 'system';
  content: string;
}

interface ChatContext {
  packages?: any[];
  products?: any[];
  services?: any[];
  faqs?: any[];
  galleryImages?: any[];
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

  // Extract product ID from message
  private extractProductId(message: string): string | null {
    // Match patterns like: "id: xxx", "id xxx", "mã xxx", "sản phẩm xxx"
    const patterns = [
      /(?:id|mã|sản phẩm|product)[\s:]*([a-f0-9-]{36})/i,
      /([a-f0-9]{8}-[a-f0-9]{4}-[a-f0-9]{4}-[a-f0-9]{4}-[a-f0-9]{12})/i
    ];
    
    for (const pattern of patterns) {
      const match = message.match(pattern);
      if (match) {
        console.log(`✅ Found product ID: ${match[1]}`);
        return match[1];
      }
    }
    
    return null;
  }

  // Find product by name in message
  private async findProductByName(message: string, allProducts: any[]): Promise<any | null> {
    const messageLower = message.toLowerCase();
    
    // Try exact match first
    for (const product of allProducts) {
      if (messageLower.includes(product.name.toLowerCase())) {
        console.log(`✅ Found product by name: ${product.name}`);
        return product;
      }
    }
    
    // Try partial match
    for (const product of allProducts) {
      const productWords = product.name.toLowerCase().split(' ');
      const matchCount = productWords.filter((word: string) => messageLower.includes(word)).length;
      
      // If more than half of product name words are in message
      if (matchCount > productWords.length / 2) {
        console.log(`✅ Found product by partial match: ${product.name}`);
        return product;
      }
    }
    
    return null;
  }

  // Get relevant data from database
  private async getRelevantData(userMessage: string): Promise<ChatContext> {
    const context: ChatContext = {};

    try {
      // Check if user is asking for gallery/images
      if (/thư viện|gallery|ảnh|hình ảnh|xem ảnh/i.test(userMessage)) {
        console.log('🖼️ User is asking for gallery images');
        const galleryImages = await db('images')
          .select('*')
          .orderBy('created_at', 'desc');
        
        console.log(`📸 Found ${galleryImages.length} images in gallery`);
        context.galleryImages = galleryImages;
        
        // Return early with just gallery images
        return context;
      }
      
      // Step 1: Check if user is asking for specific product by ID
      const productId = this.extractProductId(userMessage);
      
      if (productId) {
        console.log(`🔍 Fetching specific product with ID: ${productId}`);
        const product = await this.productRepository.findById(productId);
        
        if (product) {
          console.log(`✅ Found product: ${product.name}`);
          const images: Array<{ url: string; isPrimary: boolean; alt: string }> = [];
          
          if (product.images && product.images.length > 0) {
            product.images.forEach((url: string, index: number) => {
              images.push({
                url: url,
                isPrimary: index === 0,
                alt: product.name
              });
            });
          }
          
          context.products = [{
            id: product.id,
            name: product.name,
            price: product.price,
            category: product.category || 'Chưa phân loại',
            description: product.description,
            features: product.features || [],
            images: images,
            imageCount: images.length
          }];
          
          // Return early with just this product
          return context;
        } else {
          console.log(`❌ Product not found with ID: ${productId}`);
        }
      }
      
      // Step 2: Fetch all packages and products to search by name
      console.log('🔍 Fetching ALL packages and products to search by name...');
      const allPackages = await this.packageRepository.findAll({ isActive: true });
      const allProducts = await this.productRepository.findAll();
      console.log(`📦 Found ${allPackages.length} packages and ${allProducts.length} products`);
      
      // Step 3: Try to find package by name first (packages are more important)
      const foundPackage = await this.findProductByName(userMessage, allPackages);
      
      if (foundPackage) {
        console.log(`✅ User is asking about specific package: ${foundPackage.name}`);
        const images: Array<{ url: string; isPrimary: boolean; alt: string }> = [];
        
        if (foundPackage.images && foundPackage.images.length > 0) {
          foundPackage.images.forEach((url: string, index: number) => {
            images.push({
              url: url,
              isPrimary: index === 0,
              alt: foundPackage.name
            });
          });
        }
        
        context.packages = [{
          id: foundPackage.id,
          name: foundPackage.name,
          price: foundPackage.price,
          description: foundPackage.description,
          features: foundPackage.features,
          images: images,
          imageCount: images.length
        }];
        
        // Return early with just this package
        return context;
      }
      
      // Step 4: Try to find product by name
      const foundProduct = await this.findProductByName(userMessage, allProducts);
      
      if (foundProduct) {
        console.log(`✅ User is asking about specific product: ${foundProduct.name}`);
        const images: Array<{ url: string; isPrimary: boolean; alt: string }> = [];
        
        if (foundProduct.images && foundProduct.images.length > 0) {
          foundProduct.images.forEach((url: string, index: number) => {
            images.push({
              url: url,
              isPrimary: index === 0,
              alt: foundProduct.name
            });
          });
        }
        
        context.products = [{
          id: foundProduct.id,
          name: foundProduct.name,
          price: foundProduct.price,
          category: foundProduct.category || 'Chưa phân loại',
          description: foundProduct.description,
          features: foundProduct.features || [],
          images: images,
          imageCount: images.length
        }];
        
        // Return early with just this product
        return context;
      }
      
      // Step 5: If no specific item found, return all data for general context
      console.log('🔍 No specific item found, returning all data...');
      
      const packagesWithDetails = allPackages.map((pkg: any) => {
        const images: Array<{ url: string; isPrimary: boolean; alt: string }> = [];
        
        if (pkg.images && pkg.images.length > 0) {
          pkg.images.forEach((url: string, index: number) => {
            images.push({
              url: url,
              isPrimary: index === 0,
              alt: pkg.name
            });
          });
        }
        
        return {
          id: pkg.id,
          name: pkg.name,
          price: pkg.price,
          description: pkg.description,
          features: pkg.features,
          images: images,
          imageCount: images.length
        };
      });
      
      context.packages = packagesWithDetails;

      // Use allProducts we already fetched
      const productsWithDetails = allProducts.map((prod: any) => {
        // ProductRepository already loads images from images table
        const images: Array<{ url: string; isPrimary: boolean; alt: string }> = [];
        
        if (prod.images && prod.images.length > 0) {
          console.log(`✅ Product ${prod.name} has ${prod.images.length} images`);
          prod.images.forEach((url: string, index: number) => {
            images.push({
              url: url,
              isPrimary: index === 0,
              alt: prod.name
            });
          });
        } else {
          console.log(`⚠️ Product ${prod.name} has no images`);
        } 

        return {
          id: prod.id,
          name: prod.name,
          price: prod.price,
          category: prod.category || 'Chưa phân loại',
          description: prod.description,
          features: prod.features || [],
          images: images,
          imageCount: images.length
        };
      });
      
      context.products = productsWithDetails;

      // Fetch services
      console.log('🔍 Fetching ALL services...');
      const services = await this.serviceRepository.findAll();
      console.log(`💼 Found ${services.length} services`);
      
      const servicesWithDetails = services.map((svc: any) => {
        const images: Array<{ url: string; isPrimary: boolean; alt: string }> = [];
        
        if (svc.images && svc.images.length > 0) {
          console.log(`✅ Service ${svc.name} has ${svc.images.length} images`);
          svc.images.forEach((url: string, index: number) => {
            images.push({
              url: url,
              isPrimary: index === 0,
              alt: svc.name
            });
          });
        } else {
          console.log(`⚠️ Service ${svc.name} has no images`);
        }

        return {
          id: svc.id,
          name: svc.name,
          price: svc.price,
          description: svc.description,
          features: svc.features || [],
          images: images,
          imageCount: images.length
        };
      });
      
      context.services = servicesWithDetails;

      // Fetch FAQs only when needed (to reduce prompt size)
      if (/hỏi|câu hỏi|thắc mắc|faq/i.test(userMessage)) {
        console.log('🔍 Fetching ALL FAQs...');
        const faqs = await this.faqRepository.findAll({ isActive: true });
        console.log(`❓ Found ${faqs.length} FAQs`);
        if (faqs.length > 0) {
          context.faqs = faqs.map((faq: any) => ({
            question: faq.question,
            answer: faq.answer,
          }));
        }
      }
    } catch (error) {
      console.error('Error getting relevant data:', error);
    }

    return context;
  }

  // Build system prompt with context
  private buildSystemPrompt(context: ChatContext): string {
  let prompt = `
Bạn là **Linh** – tư vấn viên cưới hỏi thân thiện, am hiểu và luôn hỗ trợ khách hết mình.

==========================
🎀 PHONG CÁCH GIAO TIẾP
==========================
- Giọng điệu tự nhiên, mềm mại, nói chuyện như bạn bè.
- Xưng hô: “mình – bạn” hoặc “em – anh/chị” tùy ngữ cảnh.
- Gần gũi nhưng không lố, không cứng nhắc.
- Không dùng câu từ kỹ thuật như “theo dữ liệu”, “theo ngữ cảnh”.

==========================
🌸 QUY TẮC SỬ DỤNG EMOJI
==========================

✨ Emoji cảm xúc (dùng khi mở đầu, chào hỏi, cảm ơn, giao tiếp xã giao):
- 😊🙂 → thân thiện
- 🌸✨ → nhẹ nhàng, lịch sự
- 🥰😍💕💖 → vui vẻ, chủ đề cưới hỏi
- 🤣😂 → khi khách nói điều hài thật sự
-🫶 → dễ thương, chân thành
-✌️😎 → khi muốn tạo vibe thoải mái
✔ Khi muốn nhẹ nhàng “trêu yêu” theo kiểu tư vấn viên đáng yêu
😏👉👈 → e thẹn dễ thương (không lạm dụng)

😌✨ → tự tin nhẹ nhàng

💫🤍 → cute, tinh tế

✨ Emoji trong tư vấn sản phẩm:
- 💰 → Giá
- 🎁 → Sản phẩm
- 📦 → Tồn kho
- 📝 → Mô tả
- ✨ → Tính năng / điểm nổi bật
- 💼 → Dịch vụ
- 🖼️ → Hình ảnh

⚠️ Quy tắc:
- Mỗi đoạn chỉ dùng 1–2 emoji.
- Không dùng emoji khi xử lý khiếu nại hoặc thông báo nghiêm túc.
- Không spam icon.

==========================
💬 CÁCH TRẢ LỜI
==========================
1. Câu chào hỏi → tự nhiên, thân thiện, có emoji.
2. Hỏi sản phẩm/dịch vụ/giá → dùng đúng dữ liệu có sẵn.
3. Không có dữ liệu → lịch sự từ chối + mời khách liên hệ hotline.
4. Không được bịa giá hoặc cam kết.
5. Nếu câu hỏi ngoài phạm vi → giải thích nhẹ nhàng + hướng dẫn hotline.

==========================
📍 THÔNG TIN CƠ BẢN
==========================
- Tên: Linh
- Công ty: Dịch vụ cưới hỏi trọn gói
- Hotline: 1900-xxxx
- Giờ làm việc: 8h–20h mỗi ngày
- Có thể tư vấn online hoặc gặp trực tiếp

==========================
📌 MẪU TRẢ LỜI CHUẨN
==========================
- “Chào bạn nha 😊 Hôm nay mình hỗ trợ bạn chuẩn bị đám cưới thế nào nè?”
- “Gói này có giá {{price}} đ nha 💰 Nếu bạn thích phong cách nhẹ nhàng – sang, gói này hợp lắm đó ✨”
- “Sản phẩm này hiện đang hết hàng rồi bạn nha. Mình có thể gợi ý mẫu tương tự không ạ?”
- “Thông tin này mình chưa có chính xác để tư vấn ạ. Bạn giúp mình liên hệ hotline 1900-xxxx để hỗ trợ nhanh nhất nhé 🌸”

==========================
📦 DỮ LIỆU ĐỘNG
==========================
`;

  // Add packages
  if (context.packages?.length) {
    prompt += `\n📦 GÓI DỊCH VỤ CHI TIẾT:\n`;
    context.packages.forEach((pkg) => {
      prompt += `\n📌 ${pkg.name}\n`;
      prompt += `   💰 Giá: ${pkg.price?.toLocaleString('vi-VN')}đ\n`;
      if (pkg.description) prompt += `   📝 Mô tả: ${pkg.description}\n`;
      if (pkg.features?.included?.length) {
        prompt += `   ✨ Bao gồm: ${pkg.features.included.join(', ')}\n`;
      }
      if (pkg.features?.excluded?.length) {
        prompt += `   ❌ Không bao gồm: ${pkg.features.excluded.join(', ')}\n`;
      }
      if (pkg.features?.highlights?.length) {
        prompt += `   ⭐ Điểm nổi bật: ${pkg.features.highlights.join(', ')}\n`;
      }
      if (pkg.imageCount > 0) {
        prompt += `   🖼️ ${pkg.imageCount} ảnh minh họa\n`;
      }
    });
  }

  // Add products
  if (context.products?.length) {
    // Check if this is a single product query (by ID)
    const isSingleProduct = context.products.length === 1 && !context.packages && !context.services;
    
    if (isSingleProduct) {
      prompt += `\n🎁 THÔNG TIN SẢN PHẨM KHÁCH ĐANG HỎI:\n`;
      const prod = context.products[0];
      prompt += `\n📌 Tên: ${prod.name}\n`;
      prompt += `   � GiTá: ${prod.price?.toLocaleString('vi-VN')}đ\n`;
      prompt += `   📂 Danh mục: ${prod.category}\n`;
      if (prod.description) prompt += `   📝 Mô tả: ${prod.description}\n`;
      if (prod.features?.length) {
        prompt += `   ✨ Đặc điểm:\n`;
        prod.features.forEach((f: string) => {
          prompt += `      • ${f}\n`;
        });
      }
      if (prod.imageCount > 0) {
        prompt += `   🖼️ Có ${prod.imageCount} ảnh sản phẩm (sẽ hiển thị cho khách)\n`;
      }
      prompt += `\n⚠️ LƯU Ý: Đây là sản phẩm khách đang hỏi. Hãy giới thiệu chi tiết, nhiệt tình và tư vấn phù hợp!\n`;
    } else {
      prompt += `\n🎁 SẢN PHẨM CHI TIẾT:\n`;
      context.products.forEach((prod) => {
        prompt += `\n📌 ${prod.name}\n`;
        prompt += `   💰 Giá: ${prod.price?.toLocaleString('vi-VN')}đ\n`;
        prompt += `   📂 Danh mục: ${prod.category}\n`;
        if (prod.description) prompt += `   📝 Mô tả: ${prod.description}\n`;
        if (prod.stock !== undefined) {
          prompt += `   📦 Tồn kho: ${
            prod.stock > 0 ? prod.stock + ' sản phẩm' : 'Hết hàng'
          }\n`;
        }
        if (prod.imageCount > 0) {
          prompt += `   🖼️ ${prod.imageCount} ảnh sản phẩm\n`;
        }
      });
    }
  }

  // Add services
  if (context.services?.length) {
    prompt += `\n💼 DỊCH VỤ CHI TIẾT:\n`;
    context.services.forEach((svc) => {
      prompt += `\n📌 ${svc.name}\n`;
      prompt += `   💰 Giá: ${svc.price?.toLocaleString('vi-VN')}đ\n`;
      if (svc.description) prompt += `   📝 ${svc.description}\n`;
      if (svc.features?.length)
        prompt += `   ✨ Tính năng: ${svc.features.join(', ')}\n`;
      if (svc.imageCount > 0)
        prompt += `   🖼️ ${svc.imageCount} ảnh minh họa\n`;
    });
  }

  // Add FAQs
  if (context.faqs?.length) {
    prompt += `\n❓ CÂU HỎI THƯỜNG GẶP:\n`;
    context.faqs.forEach((faq) => {
      prompt += `Q: ${faq.question}\nA: ${faq.answer}\n\n`;
    });
  }

  prompt += `
==========================
🌟 LƯU Ý CUỐI
==========================
Hãy luôn trả lời tự nhiên, mượt mà, thân thiện như đang tư vấn trực tiếp.
Nếu câu hỏi nằm ngoài phạm vi → giải thích nhẹ nhàng và đề nghị khách liên hệ hotline để được hỗ trợ tốt hơn nhé 😊
`;

  return prompt;
}

  // Call AI API (Groq or OpenAI)
  private async callAI(messages: ChatMessage[]): Promise<string> {
    try {
      // Log prompt length for debugging
      const systemPrompt = messages.find(m => m.role === 'system');
      if (systemPrompt) {
        console.log(`📏 System prompt length: ${systemPrompt.content.length} characters`);
      }

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
          max_tokens: 800, // Tăng lên để có thể trả lời dài hơn
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

  // Main chat method - returns both text and images
  async chat(userMessage: string, conversationHistory: ChatMessage[] = []): Promise<{
    message: string;
    images?: Array<{ url: string; alt: string; productName?: string; productId?: string }>;
    products?: Array<{ id: string; name: string; price: number }>;
    action?: {
      type: 'order' | 'consultation';
      productId?: string;
      productName?: string;
      productType?: 'package' | 'product' | 'service';
      price?: number;
    };
  }> {
    try {
      // Validate API key
      if (!this.apiKey) {
        return {
          message: 'Chatbot chưa được cấu hình. Vui lòng liên hệ quản trị viên.',
        };
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

      // Check if user wants to order/book
      const orderKeywords = /đặt|chốt|order|book|mua|đăng ký|booking/i;
      const isOrderIntent = orderKeywords.test(userMessage);

      // Call AI
      const response = await this.callAI(messages);

      // Collect images and products
      const images: Array<{ url: string; alt: string; productName?: string; productId?: string }> = [];
      const products: Array<{ id: string; name: string; price: number }> = [];
      let orderAction: any = undefined;

      // If user is asking for gallery, return all images from images table
      if (context.galleryImages) {
        console.log(`📸 Returning ${context.galleryImages.length} gallery images`);
        context.galleryImages.forEach((img: any) => {
          images.push({
            url: img.url,
            alt: img.alt || 'Gallery Image',
            productName: undefined,
            productId: img.entity_id,
          });
        });
        
        return {
          message: response,
          images: images.length > 0 ? images : undefined,
        };
      }

      // Add package images
      if (context.packages) {
        context.packages.forEach((pkg: any) => {
          if (pkg.images && pkg.images.length > 0) {
            const primaryImage = pkg.images.find((img: any) => img.isPrimary) || pkg.images[0];
            if (primaryImage?.url) {
              images.push({
                url: primaryImage.url,
                alt: primaryImage.alt || pkg.name,
                productName: pkg.name,
                productId: pkg.id,
              });
              products.push({
                id: pkg.id,
                name: pkg.name,
                price: pkg.price,
              });
            }
          }
        });
      }
      
      // Add product images
      if (context.products) {
        context.products.forEach((prod: any) => {
          if (prod.images && prod.images.length > 0) {
            const primaryImage = prod.images.find((img: any) => img.isPrimary) || prod.images[0];
            if (primaryImage?.url) {
              images.push({
                url: primaryImage.url,
                alt: primaryImage.alt || prod.name,
                productName: prod.name,
                productId: prod.id,
              });
              products.push({
                id: prod.id,
                name: prod.name,
                price: prod.price,
              });
            }
          }
        });
      }

      // Add service images
      if (context.services) {
        context.services.forEach((svc: any) => {
          if (svc.images && svc.images.length > 0) {
            const primaryImage = svc.images.find((img: any) => img.isPrimary) || svc.images[0];
            if (primaryImage?.url) {
              images.push({
                url: primaryImage.url,
                alt: primaryImage.alt || svc.name,
                productName: svc.name,
                productId: svc.id,
              });
            }
          }
        });
      }

      // If user wants to order and we have a specific product/package
      if (isOrderIntent) {
        if (context.packages && context.packages.length === 1) {
          const pkg = context.packages[0];
          orderAction = {
            type: 'order',
            productId: pkg.id,
            productName: pkg.name,
            productType: 'package',
            price: pkg.price,
          };
          console.log('✅ Order action created for package:', pkg.name);
        } else if (context.products && context.products.length === 1) {
          const prod = context.products[0];
          orderAction = {
            type: 'order',
            productId: prod.id,
            productName: prod.name,
            productType: 'product',
            price: prod.price,
          };
          console.log('✅ Order action created for product:', prod.name);
        } else if (context.services && context.services.length === 1) {
          const svc = context.services[0];
          orderAction = {
            type: 'order',
            productId: svc.id,
            productName: svc.name,
            productType: 'service',
            price: svc.price,
          };
          console.log('✅ Order action created for service:', svc.name);
        }
      }

      return {
        message: response,
        images: images.length > 0 ? images : undefined,
        products: products.length > 0 ? products : undefined,
        action: orderAction,
      };
    } catch (error) {
      console.error('Chatbot error:', error);
      return {
        message: 'Xin lỗi, đã có lỗi xảy ra. Vui lòng thử lại hoặc liên hệ hotline: 1900-xxxx',
      };
    }
  }

  // Create order from chatbot
  async createOrderFromChat(data: {
    productId: string;
    productType: 'package' | 'product' | 'service';
    clientName: string;
    clientPhone: string;
    clientEmail?: string;
    weddingDate: Date;
    venue: string;
    guestCount?: number;
    notes?: string;
  }): Promise<{ success: boolean; orderId?: string; message: string }> {
    try {
      // Validate required fields
      if (!data.clientName || !data.clientPhone || !data.weddingDate || !data.venue) {
        return {
          success: false,
          message: 'Thiếu thông tin bắt buộc: Tên, SĐT, Ngày cưới, Địa điểm',
        };
      }

      // Get product details
      let productName = '';
      let unitPrice = 0;

      if (data.productType === 'package') {
        const pkg = await this.packageRepository.findById(data.productId);
        if (!pkg) {
          return { success: false, message: 'Không tìm thấy gói dịch vụ' };
        }
        productName = pkg.name;
        unitPrice = pkg.price;
      } else if (data.productType === 'product') {
        const prod = await this.productRepository.findById(data.productId);
        if (!prod) {
          return { success: false, message: 'Không tìm thấy sản phẩm' };
        }
        productName = prod.name;
        unitPrice = prod.price;
      } else if (data.productType === 'service') {
        const svc = await this.serviceRepository.findById(data.productId);
        if (!svc) {
          return { success: false, message: 'Không tìm thấy dịch vụ' };
        }
        productName = svc.name;
        unitPrice = svc.basePrice;
      }

      // Create order via OrderService
      const { OrderService } = await import('./OrderService');
      const { OrderRepository } = await import('../../infrastructure/repositories/OrderRepository');
      const orderRepo = new OrderRepository();
      const orderService = new OrderService(orderRepo);

      const { v4: uuidv4 } = require('uuid');
      const orderItemId = uuidv4();

      const order = await orderService.createOrder({
        clientName: data.clientName,
        clientEmail: data.clientEmail || `${data.clientPhone}@temp.com`,
        clientPhone: data.clientPhone,
        weddingDate: data.weddingDate,
        guestCount: data.guestCount || 100,
        venue: data.venue,
        notes: data.notes || `Đặt qua chatbot - ${productName}`,
        items: [
          {
            id: orderItemId,
            productId: data.productId,
            productName: productName,
            productType: data.productType,
            quantity: 1,
            unitPrice: unitPrice,
            subtotal: unitPrice,
            description: `Đặt qua chatbot`,
          },
        ],
        paymentMethod: 'bank_transfer',
      });

      console.log('✅ Order created successfully:', order.id);

      return {
        success: true,
        orderId: order.id,
        message: `Đơn hàng đã được tạo thành công! Mã đơn: ${order.id}. Chúng tôi sẽ liên hệ với bạn sớm nhất.`,
      };
    } catch (error) {
      console.error('Error creating order from chat:', error);
      return {
        success: false,
        message: 'Có lỗi xảy ra khi tạo đơn hàng. Vui lòng thử lại hoặc liên hệ hotline.',
      };
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
