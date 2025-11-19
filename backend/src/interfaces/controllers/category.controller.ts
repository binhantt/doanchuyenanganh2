import { Request, Response } from 'express';
import { ICategoryService } from '../../application/interfaces/ICategoryService';
import { CreateCategoryDTO, UpdateCategoryDTO } from '../../application/dto/CategoryDTO';

export class CategoryController {
  constructor(private readonly categoryService: ICategoryService) {}

  async list(req: Request, res: Response): Promise<Response> {
    try {
      const { 
        keyword,
        isActive,
        sortBy,
        sortOrder 
      } = req.query;

      const categories = await this.categoryService.getAllCategories(
        isActive === 'true',
        {
          keyword: keyword as string,
          sortBy: sortBy as string,
          sortOrder: sortOrder as 'asc' | 'desc',
        }
      );

      return res.status(200).json({
        success: true,
        data: categories,
        count: categories.length,
      });
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: error instanceof Error ? error.message : 'Internal server error',
      });
    }
  }

  async getById(req: Request, res: Response): Promise<Response> {
    try {
      const id = parseInt(req.params.id);
      const category = await this.categoryService.getCategoryById(id);

      if (!category) {
        return res.status(404).json({
          success: false,
          message: 'Category not found',
        });
      }

      return res.status(200).json({
        success: true,
        data: category,
      });
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: error instanceof Error ? error.message : 'Internal server error',
      });
    }
  }

  async getBySlug(req: Request, res: Response): Promise<Response> {
    try {
      const { slug } = req.params;
      const category = await this.categoryService.getCategoryBySlug(slug);

      if (!category) {
        return res.status(404).json({
          success: false,
          message: 'Category not found',
        });
      }

      return res.status(200).json({
        success: true,
        data: category,
      });
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: error instanceof Error ? error.message : 'Internal server error',
      });
    }
  }

  async create(req: Request, res: Response): Promise<Response> {
    try {
      const input: CreateCategoryDTO = req.body;
      const category = await this.categoryService.createCategory(input);

      return res.status(201).json({
        success: true,
        data: category,
        message: 'Category created successfully',
      });
    } catch (error) {
      return res.status(400).json({
        success: false,
        message: error instanceof Error ? error.message : 'Failed to create category',
      });
    }
  }

  async update(req: Request, res: Response): Promise<Response> {
    try {
      const id = parseInt(req.params.id);
      const input: UpdateCategoryDTO = req.body;
      const category = await this.categoryService.updateCategory(id, input);

      if (!category) {
        return res.status(404).json({
          success: false,
          message: 'Category not found',
        });
      }

      return res.status(200).json({
        success: true,
        data: category,
        message: 'Category updated successfully',
      });
    } catch (error) {
      return res.status(400).json({
        success: false,
        message: error instanceof Error ? error.message : 'Failed to update category',
      });
    }
  }

  async delete(req: Request, res: Response): Promise<Response> {
    try {
      const id = parseInt(req.params.id);
      const deleted = await this.categoryService.deleteCategory(id);

      if (!deleted) {
        return res.status(404).json({
          success: false,
          message: 'Category not found',
        });
      }

      return res.status(200).json({
        success: true,
        message: 'Category deleted successfully',
      });
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: error instanceof Error ? error.message : 'Internal server error',
      });
    }
  }
}
