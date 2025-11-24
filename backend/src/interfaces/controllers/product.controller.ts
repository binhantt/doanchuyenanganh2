import { Request, Response } from 'express';
import { IProductService } from '../../application/interfaces/IProductService';

export class ProductController {
  constructor(private productService: IProductService) {}

  getAllProducts = async (req: Request, res: Response): Promise<void> => {
    try {
      const { keyword, category, isActive, isFeatured, sortBy, sortOrder } = req.query;
      
      const filters: any = {};
      if (keyword) filters.keyword = keyword as string;
      if (category) filters.category = category as string;
      if (isActive !== undefined) filters.isActive = isActive === 'true';
      if (isFeatured !== undefined) filters.isFeatured = isFeatured === 'true';
      if (sortBy) filters.sortBy = sortBy as string;
      if (sortOrder) filters.sortOrder = sortOrder as 'asc' | 'desc';

      const products = await this.productService.getAllProducts(filters);
      res.json({
        success: true,
        data: products,
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: error instanceof Error ? error.message : 'Internal server error',
      });
    }
  };

  getProductById = async (req: Request, res: Response): Promise<void> => {
    try {
      const { id } = req.params;
      const product = await this.productService.getProductById(id);
      res.json({
        success: true,
        data: product,
      });
    } catch (error) {
      const statusCode = error instanceof Error && error.message === 'Product not found' ? 404 : 500;
      res.status(statusCode).json({
        success: false,
        message: error instanceof Error ? error.message : 'Internal server error',
      });
    }
  };

  getProductBySlug = async (req: Request, res: Response): Promise<void> => {
    try {
      const { slug } = req.params;
      const product = await this.productService.getProductBySlug(slug);
      res.json({
        success: true,
        data: product,
      });
    } catch (error) {
      const statusCode = error instanceof Error && error.message === 'Product not found' ? 404 : 500;
      res.status(statusCode).json({
        success: false,
        message: error instanceof Error ? error.message : 'Internal server error',
      });
    }
  };

  // For app - Get products by category
  getProductsByCategory = async (req: Request, res: Response): Promise<void> => {
    try {
      const { category } = req.params;
      const { isActive, isFeatured, sortBy, sortOrder } = req.query;
      
      const filters: any = {
        category: category,
      };
      
      if (isActive !== undefined) filters.isActive = isActive === 'true';
      if (isFeatured !== undefined) filters.isFeatured = isFeatured === 'true';
      if (sortBy) filters.sortBy = sortBy as string;
      if (sortOrder) filters.sortOrder = sortOrder as 'asc' | 'desc';

      const products = await this.productService.getAllProducts(filters);
      
      res.json({
        success: true,
        data: products,
        count: products.length,
        category: category,
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: error instanceof Error ? error.message : 'Có lỗi xảy ra',
      });
    }
  };

  createProduct = async (req: Request, res: Response): Promise<void> => {
    try {
      const product = await this.productService.createProduct(req.body);
      res.status(201).json({
        success: true,
        data: product,
      });
    } catch (error) {
      const statusCode = error instanceof Error && error.message.includes('already exists') ? 409 : 400;
      res.status(statusCode).json({
        success: false,
        message: error instanceof Error ? error.message : 'Bad request',
      });
    }
  };

  updateProduct = async (req: Request, res: Response): Promise<void> => {
    try {
      const { id } = req.params;
      const product = await this.productService.updateProduct(id, req.body);
      res.json({
        success: true,
        data: product,
      });
    } catch (error) {
      const statusCode = error instanceof Error && error.message === 'Product not found' ? 404 : 400;
      res.status(statusCode).json({
        success: false,
        message: error instanceof Error ? error.message : 'Bad request',
      });
    }
  };

  deleteProduct = async (req: Request, res: Response): Promise<void> => {
    try {
      const { id } = req.params;
      await this.productService.deleteProduct(id);
      res.json({
        success: true,
        message: 'Product deleted successfully',
      });
    } catch (error) {
      const statusCode = error instanceof Error && error.message === 'Product not found' ? 404 : 500;
      res.status(statusCode).json({
        success: false,
        message: error instanceof Error ? error.message : 'Internal server error',
      });
    }
  };

  getStock = async (req: Request, res: Response): Promise<void> => {
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
    } catch (error) {
      res.status(500).json({
        success: false,
        message: error instanceof Error ? error.message : 'Internal server error',
      });
    }
  };

  updateStock = async (req: Request, res: Response): Promise<void> => {
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
    } catch (error) {
      const statusCode = error instanceof Error && error.message === 'Product not found' ? 404 : 400;
      res.status(statusCode).json({
        success: false,
        message: error instanceof Error ? error.message : 'Bad request',
      });
    }
  };
}
