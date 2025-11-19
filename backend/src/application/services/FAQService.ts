import { IFAQService } from '../interfaces/IFAQService';
import { IFAQRepository } from '../../domain/repositories/IFAQRepository';
import { FAQ } from '../../domain/entities/FAQ';
import { v4 as uuidv4 } from 'uuid';

export class FAQService implements IFAQService {
  constructor(private readonly faqRepository: IFAQRepository) {}

  async getAllFAQs(filters?: any): Promise<FAQ[]> {
    return this.faqRepository.findAll(filters);
  }

  async getFAQById(id: string): Promise<FAQ | null> {
    return this.faqRepository.findById(id);
  }

  async getActiveFAQs(): Promise<FAQ[]> {
    return this.faqRepository.findActive();
  }

  async getFAQsByCategory(category: string): Promise<FAQ[]> {
    return this.faqRepository.findByCategory(category);
  }

  async getFAQsByLanguage(language: string): Promise<FAQ[]> {
    return this.faqRepository.findByLanguage(language);
  }

  async getFAQsByCategoryAndLanguage(category: string, language: string): Promise<FAQ[]> {
    return this.faqRepository.findByCategoryAndLanguage(category, language);
  }

  async createFAQ(data: {
    question: string;
    answer: string;
    category: string;
    language: string;
    displayOrder: number;
    isActive?: boolean;
  }): Promise<FAQ> {
    if (!data.question || !data.answer || !data.category || !data.language) {
      throw new Error('Missing required fields');
    }

    const faq = new FAQ(
      uuidv4(),
      data.question,
      data.answer,
      data.category,
      data.language,
      data.displayOrder,
      data.isActive !== undefined ? data.isActive : true
    );

    return this.faqRepository.create(faq);
  }

  async updateFAQ(id: string, data: Partial<FAQ>): Promise<FAQ | null> {
    return this.faqRepository.update(id, data);
  }

  async deleteFAQ(id: string): Promise<boolean> {
    return this.faqRepository.delete(id);
  }
}
