import { IFAQService } from '../interfaces/IFAQService';
import { IFAQRepository } from '../../domain/repositories/IFAQRepository';
import { FAQ } from '../../domain/entities/FAQ';
export declare class FAQService implements IFAQService {
    private readonly faqRepository;
    constructor(faqRepository: IFAQRepository);
    getAllFAQs(filters?: any): Promise<FAQ[]>;
    getFAQById(id: string): Promise<FAQ | null>;
    getActiveFAQs(): Promise<FAQ[]>;
    getFAQsByCategory(category: string): Promise<FAQ[]>;
    getFAQsByLanguage(language: string): Promise<FAQ[]>;
    getFAQsByCategoryAndLanguage(category: string, language: string): Promise<FAQ[]>;
    createFAQ(data: {
        question: string;
        answer: string;
        category: string;
        language: string;
        displayOrder: number;
        isActive?: boolean;
    }): Promise<FAQ>;
    updateFAQ(id: string, data: Partial<FAQ>): Promise<FAQ | null>;
    deleteFAQ(id: string): Promise<boolean>;
}
//# sourceMappingURL=FAQService.d.ts.map