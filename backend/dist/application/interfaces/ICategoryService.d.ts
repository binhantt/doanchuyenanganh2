import { Category } from '../../domain/entities/Category';
import { CreateCategoryDTO, UpdateCategoryDTO } from '../dto/CategoryDTO';
export interface ICategoryService {
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
//# sourceMappingURL=ICategoryService.d.ts.map