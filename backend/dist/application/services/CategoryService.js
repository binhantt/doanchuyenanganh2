"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CategoryService = void 0;
const Category_1 = require("../../domain/entities/Category");
class CategoryService {
    constructor(categoryRepository) {
        this.categoryRepository = categoryRepository;
    }
    async getAllCategories(onlyActive = false, filters) {
        let categories;
        if (onlyActive) {
            categories = await this.categoryRepository.findActive();
        }
        else {
            categories = await this.categoryRepository.findAll();
        }
        // Apply keyword filter
        if (filters?.keyword) {
            const keyword = filters.keyword.toLowerCase();
            categories = categories.filter(cat => cat.name.toLowerCase().includes(keyword) ||
                cat.slug.toLowerCase().includes(keyword) ||
                (cat.description && cat.description.toLowerCase().includes(keyword)));
        }
        // Apply sorting
        if (filters?.sortBy) {
            const sortBy = filters.sortBy;
            const sortOrder = filters.sortOrder || 'asc';
            categories.sort((a, b) => {
                const aVal = a[sortBy];
                const bVal = b[sortBy];
                if (aVal === null || aVal === undefined)
                    return 1;
                if (bVal === null || bVal === undefined)
                    return -1;
                if (typeof aVal === 'string' && typeof bVal === 'string') {
                    return sortOrder === 'asc'
                        ? aVal.localeCompare(bVal)
                        : bVal.localeCompare(aVal);
                }
                return sortOrder === 'asc'
                    ? (aVal > bVal ? 1 : -1)
                    : (bVal > aVal ? 1 : -1);
            });
        }
        return categories;
    }
    async getCategoryById(id) {
        return await this.categoryRepository.findById(id);
    }
    async getCategoryBySlug(slug) {
        return await this.categoryRepository.findBySlug(slug);
    }
    async createCategory(data) {
        // Check if slug already exists
        const existing = await this.categoryRepository.findBySlug(data.slug);
        if (existing) {
            throw new Error(`Category with slug "${data.slug}" already exists`);
        }
        const category = new Category_1.Category(0, // ID will be auto-generated
        data.name, data.slug, data.description || null, data.isActive ?? true);
        return await this.categoryRepository.create(category);
    }
    async updateCategory(id, data) {
        const existing = await this.categoryRepository.findById(id);
        if (!existing) {
            return null;
        }
        // Check if slug is being changed and if it already exists
        if (data.slug && data.slug !== existing.slug) {
            const slugExists = await this.categoryRepository.findBySlug(data.slug);
            if (slugExists) {
                throw new Error(`Category with slug "${data.slug}" already exists`);
            }
        }
        return await this.categoryRepository.update(id, data);
    }
    async deleteCategory(id) {
        const existing = await this.categoryRepository.findById(id);
        if (!existing) {
            return false;
        }
        return await this.categoryRepository.delete(id);
    }
}
exports.CategoryService = CategoryService;
//# sourceMappingURL=CategoryService.js.map