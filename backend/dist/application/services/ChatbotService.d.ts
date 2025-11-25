import { PackageRepository } from '../../infrastructure/repositories/PackageRepository';
import { ProductRepository } from '../../infrastructure/repositories/ProductRepository';
import { ServiceRepository } from '../../infrastructure/repositories/ServiceRepository';
import { FAQRepository } from '../../infrastructure/repositories/FAQRepository';
interface ChatMessage {
    role: 'user' | 'assistant' | 'system';
    content: string;
}
export declare class ChatbotService {
    private packageRepository;
    private productRepository;
    private serviceRepository;
    private faqRepository;
    private apiKey;
    private apiEndpoint;
    private model;
    constructor(packageRepository: PackageRepository, productRepository: ProductRepository, serviceRepository: ServiceRepository, faqRepository: FAQRepository);
    private extractProductId;
    private findProductByName;
    private getRelevantData;
    private buildSystemPrompt;
    private callAI;
    chat(userMessage: string, conversationHistory?: ChatMessage[]): Promise<{
        message: string;
        images?: Array<{
            url: string;
            alt: string;
            productName?: string;
            productId?: string;
        }>;
        products?: Array<{
            id: string;
            name: string;
            price: number;
        }>;
    }>;
    getQuickReplies(): string[];
}
export {};
//# sourceMappingURL=ChatbotService.d.ts.map