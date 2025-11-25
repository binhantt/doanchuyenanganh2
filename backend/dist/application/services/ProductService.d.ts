import { IProductService } from '../interfaces/IProductService';
import { IProductRepository } from '../../domain/repositories/IProductRepository';
import { CreateProductDTO, UpdateProductDTO, ProductResponseDTO } from '../dto/ProductDTO';
export declare class ProductService implements IProductService {
    private productRepository;
    constructor(productRepository: IProductRepository);
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
    private mapToDTO;
}
//# sourceMappingURL=ProductService.d.ts.map