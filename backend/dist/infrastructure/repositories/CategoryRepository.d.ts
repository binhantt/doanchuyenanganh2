import { ICategoryRepository } from '../../domain/repositories/ICategoryRepository';
import { Category } from '../../domain/entities/Category';
export declare class CategoryRepository implements ICategoryRepository {
    private readonly tableName;
    private mapRowToEntity;
    findAll(): Promise<Category[]>;
    findById(id: number): Promise<Category | null>;
    findBySlug(slug: string): Promise<Category | null>;
    findActive(): Promise<Category[]>;
    create(category: Category): Promise<Category>;
    update(id: number, data: Partial<Category>): Promise<Category | null>;
    delete(id: number): Promise<boolean>;
}
//# sourceMappingURL=CategoryRepository.d.ts.map