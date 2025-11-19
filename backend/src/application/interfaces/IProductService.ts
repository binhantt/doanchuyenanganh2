import { CreateProductDTO, UpdateProductDTO, ProductResponseDTO } from '../dto/ProductDTO';

export interface IProductService {
  getAllProducts(filters?: { 
    keyword?: string;
    category?: string; 
    isActive?: boolean; 
    isFeatured?: boolean;
    sortBy?: string;
    sortOrder?: 'asc' | 'desc';
  }): Promise<ProductResponseDTO[]>;
  getProductById(id: string): Promise<ProductResponseDTO>;
  getProductBySlug(slug: string): Promise<ProductResponseDTO>;
  createProduct(data: CreateProductDTO): Promise<ProductResponseDTO>;
  updateProduct(id: string, data: UpdateProductDTO): Promise<ProductResponseDTO>;
  deleteProduct(id: string): Promise<void>;
  updateStock(id: string, quantity: number): Promise<void>;
}
