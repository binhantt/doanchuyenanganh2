"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CategoryRepository = void 0;
const Category_1 = require("../../domain/entities/Category");
const connection_1 = require("../database/connection");
class CategoryRepository {
    constructor() {
        this.tableName = 'categories';
    }
    mapRowToEntity(row) {
        return new Category_1.Category(row.id, row.name, row.slug, row.description, Boolean(row.is_active), new Date(row.created_at), new Date(row.updated_at));
    }
    async findAll() {
        const rows = await (0, connection_1.db)(this.tableName).select('*').orderBy('name', 'asc');
        return rows.map((row) => this.mapRowToEntity(row));
    }
    async findById(id) {
        const row = await (0, connection_1.db)(this.tableName).where({ id }).first();
        return row ? this.mapRowToEntity(row) : null;
    }
    async findBySlug(slug) {
        const row = await (0, connection_1.db)(this.tableName).where({ slug }).first();
        return row ? this.mapRowToEntity(row) : null;
    }
    async findActive() {
        const rows = await (0, connection_1.db)(this.tableName)
            .where({ is_active: true })
            .orderBy('name', 'asc')
            .select('*');
        return rows.map((row) => this.mapRowToEntity(row));
    }
    async create(category) {
        const [id] = await (0, connection_1.db)(this.tableName).insert({
            name: category.name,
            slug: category.slug,
            description: category.description,
            is_active: category.isActive,
        });
        const created = await this.findById(id);
        return created;
    }
    async update(id, data) {
        const updateData = {};
        if (data.name)
            updateData.name = data.name;
        if (data.slug)
            updateData.slug = data.slug;
        if (data.description !== undefined)
            updateData.description = data.description;
        if (data.isActive !== undefined)
            updateData.is_active = data.isActive;
        updateData.updated_at = connection_1.db.fn.now();
        const updated = await (0, connection_1.db)(this.tableName).where({ id }).update(updateData);
        if (updated === 0) {
            return null;
        }
        return this.findById(id);
    }
    async delete(id) {
        const deleted = await (0, connection_1.db)(this.tableName).where({ id }).del();
        return deleted > 0;
    }
}
exports.CategoryRepository = CategoryRepository;
//# sourceMappingURL=CategoryRepository.js.map