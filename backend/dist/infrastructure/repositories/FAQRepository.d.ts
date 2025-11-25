import { IFAQRepository } from '../../domain/repositories/IFAQRepository';
import { FAQ } from '../../domain/entities/FAQ';
export declare class FAQRepository implements IFAQRepository {
    private readonly tableName;
    private mapRowToEntity;
    findAll(filters?: {
        keyword?: string;
        category?: string;
        isActive?: boolean;
        sortBy?: string;
        sortOrder?: 'asc' | 'desc';
    }): Promise<FAQ[]>;
    findById(id: string): Promise<FAQ | null>;
    findActive(): Promise<FAQ[]>;
    findByCategory(category: string): Promise<FAQ[]>;
    findByLanguage(language: string): Promise<FAQ[]>;
    findByCategoryAndLanguage(category: string, language: string): Promise<FAQ[]>;
    create(faq: FAQ): Promise<FAQ>;
    update(id: string, data: Partial<FAQ>): Promise<FAQ | null>;
    delete(id: string): Promise<boolean>;
}
//# sourceMappingURL=FAQRepository.d.ts.map