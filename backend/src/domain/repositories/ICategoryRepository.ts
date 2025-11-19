import { Category } from '../entities/Category';

export interface ICategoryRepository {
  findAll(): Promise<Category[]>;
  findById(id: number): Promise<Category | null>;
  findBySlug(slug: string): Promise<Category | null>;
  findActive(): Promise<Category[]>;
  create(category: Category): Promise<Category>;
  update(id: number, data: Partial<Category>): Promise<Category | null>;
  delete(id: number): Promise<boolean>;
}
