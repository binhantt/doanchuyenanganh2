"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductController = void 0;
class ProductController {
    constructor(productService) {
        this.productService = productService;
        this.getAllProducts = async (req, res) => {
            try {
                const { keyword, category, isActive, isFeatured, sortBy, sortOrder } = req.query;
                const filters = {};
                if (keyword)
                    filters.keyword = keyword;
                if (category)
                    filters.category = category;
                if (isActive !== undefined)
                    filters.isActive = isActive === 'true';
                if (isFeatured !== undefined)
                    filters.isFeatured = isFeatured === 'true';
                if (sortBy)
                    filters.sortBy = sortBy;
                if (sortOrder)
                    filters.sortOrder = sortOrder;
                const products = await this.productService.getAllProducts(filters);
                res.json({
                    success: true,
                    data: products,
                });
            }
            catch (error) {
                res.status(500).json({
                    success: false,
                    message: error instanceof Error ? error.message : 'Internal server error',
                });
            }
        };
        this.getProductById = async (req, res) => {
            try {
                const { id } = req.params;
                const product = await this.productService.getProductById(id);
                res.json({
                    success: true,
                    data: product,
                });
            }
            catch (error) {
                const statusCode = error instanceof Error && error.message === 'Product not found' ? 404 : 500;
                res.status(statusCode).json({
                    success: false,
                    message: error instanceof Error ? error.message : 'Internal server error',
                });
            }
        };
        this.getProductBySlug = async (req, res) => {
            try {
                const { slug } = req.params;
                const product = await this.productService.getProductBySlug(slug);
                res.json({
                    success: true,
                    data: product,
                });
            }
            catch (error) {
                const statusCode = error instanceof Error && error.message === 'Product not found' ? 404 : 500;
                res.status(statusCode).json({
                    success: false,
                    message: error instanceof Error ? error.message : 'Internal server error',
                });
            }
        };
        // For app - Get products by category
        this.getProductsByCategory = async (req, res) => {
            try {
                const { category } = req.params;
                const { isActive, isFeatured, sortBy, sortOrder } = req.query;
                const filters = {
                    category: category,
                };
                if (isActive !== undefined)
                    filters.isActive = isActive === 'true';
                if (isFeatured !== undefined)
                    filters.isFeatured = isFeatured === 'true';
                if (sortBy)
                    filters.sortBy = sortBy;
                if (sortOrder)
                    filters.sortOrder = sortOrder;
                const products = await this.productService.getAllProducts(filters);
                res.json({
                    success: true,
                    data: products,
                    count: products.length,
                    category: category,
                });
            }
            catch (error) {
                res.status(500).json({
                    success: false,
                    message: error instanceof Error ? error.message : 'Có lỗi xảy ra',
                });
            }
        };
        this.createProduct = async (req, res) => {
            try {
                const product = await this.productService.createProduct(req.body);
                res.status(201).json({
                    success: true,
                    data: product,
                });
            }
            catch (error) {
                const statusCode = error instanceof Error && error.message.includes('already exists') ? 409 : 400;
                res.status(statusCode).json({
                    success: false,
                    message: error instanceof Error ? error.message : 'Bad request',
                });
            }
        };
        this.updateProduct = async (req, res) => {
            try {
                const { id } = req.params;
                const product = await this.productService.updateProduct(id, req.body);
                res.json({
                    success: true,
                    data: product,
                });
            }
            catch (error) {
                const statusCode = error instanceof Error && error.message === 'Product not found' ? 404 : 400;
                res.status(statusCode).json({
                    success: false,
                    message: error instanceof Error ? error.message : 'Bad request',
                });
            }
        };
        this.deleteProduct = async (req, res) => {
            try {
                const { id } = req.params;
                await this.productService.deleteProduct(id);
                res.json({
                    success: true,
                    message: 'Product deleted successfully',
                });
            }
            catch (error) {
                const statusCode = error instanceof Error && error.message === 'Product not found' ? 404 : 500;
                res.status(statusCode).json({
                    success: false,
                    message: error instanceof Error ? error.message : 'Internal server error',
                });
            }
        };
        this.getStock = async (req, res) => {
            try {
                const { id } = req.params;
                // Stock management was removed - return a message
                res.json({
                    success: true,
                    data: {
                        productId: id,
                        stockQuantity: null,
                        message: 'Stock management is not available for this product type',
                    },
                });
            }
            catch (error) {
                res.status(500).json({
                    success: false,
                    message: error instanceof Error ? error.message : 'Internal server error',
                });
            }
        };
        this.updateStock = async (req, res) => {
            try {
                const { id } = req.params;
                const { stockQuantity, quantity } = req.body;
                // Accept either stockQuantity or quantity for backwards compatibility
                const stockValue = stockQuantity !== undefined ? stockQuantity : quantity;
                if (stockValue === undefined || typeof stockValue !== 'number') {
                    res.status(400).json({
                        success: false,
                        message: 'Stock quantity is required and must be a number',
                    });
                    return;
                }
                await this.productService.updateStock(id, stockValue);
                res.json({
                    success: true,
                    message: 'Stock updated successfully (Note: Stock management is deprecated for this product type)',
                });
            }
            catch (error) {
                const statusCode = error instanceof Error && error.message === 'Product not found' ? 404 : 400;
                res.status(statusCode).json({
                    success: false,
                    message: error instanceof Error ? error.message : 'Bad request',
                });
            }
        };
    }
}
exports.ProductController = ProductController;
//# sourceMappingURL=product.controller.js.map