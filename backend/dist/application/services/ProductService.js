"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductService = void 0;
class ProductService {
    constructor(productRepository) {
        this.productRepository = productRepository;
    }
    async getAllProducts(filters) {
        const products = await this.productRepository.findAll(filters);
        return products.map(this.mapToDTO);
    }
    async getProductById(id) {
        const product = await this.productRepository.findById(id);
        if (!product) {
            throw new Error('Product not found');
        }
        return this.mapToDTO(product);
    }
    async getProductBySlug(slug) {
        const product = await this.productRepository.findBySlug(slug);
        if (!product) {
            throw new Error('Product not found');
        }
        return this.mapToDTO(product);
    }
    async createProduct(data) {
        // Validate required fields
        if (!data.name || !data.slug || !data.description || !data.price) {
            throw new Error('Missing required fields');
        }
        // Check if slug already exists
        const existing = await this.productRepository.findBySlug(data.slug);
        if (existing) {
            throw new Error('Product with this slug already exists');
        }
        const product = await this.productRepository.create({
            name: data.name,
            slug: data.slug,
            description: data.description,
            price: data.price,
            category: data.category,
            material: null,
            features: data.features || [],
            images: data.images || [],
            stockQuantity: 0,
            isFeatured: false,
            isActive: data.isActive !== undefined ? data.isActive : true,
        });
        return this.mapToDTO(product);
    }
    async updateProduct(id, data) {
        const existing = await this.productRepository.findById(id);
        if (!existing) {
            throw new Error('Product not found');
        }
        // Check slug uniqueness if updating slug
        if (data.slug && data.slug !== existing.slug) {
            const slugExists = await this.productRepository.findBySlug(data.slug);
            if (slugExists) {
                throw new Error('Product with this slug already exists');
            }
        }
        const updated = await this.productRepository.update(id, data);
        if (!updated) {
            throw new Error('Failed to update product');
        }
        return this.mapToDTO(updated);
    }
    async deleteProduct(id) {
        const existing = await this.productRepository.findById(id);
        if (!existing) {
            throw new Error('Product not found');
        }
        const deleted = await this.productRepository.delete(id);
        if (!deleted) {
            throw new Error('Failed to delete product');
        }
    }
    async updateStock(id, quantity) {
        const existing = await this.productRepository.findById(id);
        if (!existing) {
            throw new Error('Product not found');
        }
        if (quantity < 0) {
            throw new Error('Stock quantity cannot be negative');
        }
        const updated = await this.productRepository.updateStock(id, quantity);
        if (!updated) {
            throw new Error('Failed to update stock');
        }
    }
    mapToDTO(product) {
        return {
            id: product.id,
            name: product.name,
            slug: product.slug,
            description: product.description,
            price: product.price,
            category: product.category,
            material: product.material,
            features: product.features,
            images: product.images,
            stockQuantity: product.stockQuantity,
            isFeatured: product.isFeatured,
            isActive: product.isActive,
            createdAt: product.createdAt,
            updatedAt: product.updatedAt,
        };
    }
}
exports.ProductService = ProductService;
//# sourceMappingURL=ProductService.js.map