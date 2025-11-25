"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CategoryController = void 0;
class CategoryController {
    constructor(categoryService) {
        this.categoryService = categoryService;
    }
    async list(req, res) {
        try {
            const { keyword, isActive, sortBy, sortOrder } = req.query;
            const categories = await this.categoryService.getAllCategories(isActive === 'true', {
                keyword: keyword,
                sortBy: sortBy,
                sortOrder: sortOrder,
            });
            return res.status(200).json({
                success: true,
                data: categories,
                count: categories.length,
            });
        }
        catch (error) {
            return res.status(500).json({
                success: false,
                message: error instanceof Error ? error.message : 'Internal server error',
            });
        }
    }
    async getById(req, res) {
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
        }
        catch (error) {
            return res.status(500).json({
                success: false,
                message: error instanceof Error ? error.message : 'Internal server error',
            });
        }
    }
    async getBySlug(req, res) {
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
        }
        catch (error) {
            return res.status(500).json({
                success: false,
                message: error instanceof Error ? error.message : 'Internal server error',
            });
        }
    }
    async create(req, res) {
        try {
            const input = req.body;
            const category = await this.categoryService.createCategory(input);
            return res.status(201).json({
                success: true,
                data: category,
                message: 'Category created successfully',
            });
        }
        catch (error) {
            return res.status(400).json({
                success: false,
                message: error instanceof Error ? error.message : 'Failed to create category',
            });
        }
    }
    async update(req, res) {
        try {
            const id = parseInt(req.params.id);
            const input = req.body;
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
        }
        catch (error) {
            return res.status(400).json({
                success: false,
                message: error instanceof Error ? error.message : 'Failed to update category',
            });
        }
    }
    async delete(req, res) {
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
        }
        catch (error) {
            return res.status(500).json({
                success: false,
                message: error instanceof Error ? error.message : 'Internal server error',
            });
        }
    }
}
exports.CategoryController = CategoryController;
//# sourceMappingURL=category.controller.js.map