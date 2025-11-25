import { Category } from '../../domain/entities/Category';
import { ICategoryRepository } from '../../domain/repositories/ICategoryRepository';
import { ICategoryService } from '../interfaces/ICategoryService';
import { CreateCategoryDTO, UpdateCategoryDTO } from '../dto/CategoryDTO';
export declare class CategoryService implements ICategoryService {
    private readonly categoryRepository;
    constructor(categoryRepository: ICategoryRepository);
    getAllCategories(onlyActive?: boolean, filters?: {
        keyword?: string;
        sortBy?: string;
        sortOrder?: 'asc' | 'desc';
    }): Promise<Category[]>;
    getCategoryById(id: number): Promise<Category | null>;
    getCategoryBySlug(slug: string): Promise<Category | null>;
    createCategory(data: CreateCategoryDTO): Promise<Category>;
    updateCategory(id: number, data: UpdateCategoryDTO): Promise<Category | null>;
    deleteCategory(id: number): Promise<boolean>;
}
//# sourceMappingURL=CategoryService.d.ts.map