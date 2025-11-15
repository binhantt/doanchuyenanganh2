import { Product } from '../entities/Product';

export interface IProductRepository {
  findAll(filters?: { category?: string; isActive?: boolean; isFeatured?: boolean }): Promise<Product[]>;
  findById(id: string): Promise<Product | null>;
  findBySlug(slug: string): Promise<Product | null>;
  create(product: Omit<Product, 'id' | 'createdAt' | 'updatedAt'>): Promise<Product>;
  update(id: string, product: Partial<Product>): Promise<Product | null>;
  delete(id: string): Promise<boolean>;
  updateStock(id: string, quantity: number): Promise<boolean>;
}
