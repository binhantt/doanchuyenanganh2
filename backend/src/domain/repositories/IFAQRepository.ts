import { FAQ } from '../entities/FAQ';

export interface IFAQRepository {
  findAll(): Promise<FAQ[]>;
  findById(id: string): Promise<FAQ | null>;
  findActive(): Promise<FAQ[]>;
  findByCategory(category: string): Promise<FAQ[]>;
  findByLanguage(language: string): Promise<FAQ[]>;
  findByCategoryAndLanguage(category: string, language: string): Promise<FAQ[]>;
  create(faq: FAQ): Promise<FAQ>;
  update(id: string, data: Partial<FAQ>): Promise<FAQ | null>;
  delete(id: string): Promise<boolean>;
}
