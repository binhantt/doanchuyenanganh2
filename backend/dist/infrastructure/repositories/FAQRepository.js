"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.FAQRepository = void 0;
const FAQ_1 = require("../../domain/entities/FAQ");
const knex_1 = __importDefault(require("knex"));
const database_1 = __importDefault(require("../config/database"));
const db = (0, knex_1.default)(database_1.default);
class FAQRepository {
    constructor() {
        this.tableName = 'faqs';
    }
    mapRowToEntity(row) {
        return new FAQ_1.FAQ(row.id, row.question, row.answer, row.category, row.language, row.display_order, Boolean(row.is_active), new Date(row.created_at), new Date(row.updated_at));
    }
    async findAll(filters) {
        let query = db(this.tableName);
        if (filters?.keyword) {
            query = query.where((builder) => {
                builder
                    .where('question', 'like', `%${filters.keyword}%`)
                    .orWhere('answer', 'like', `%${filters.keyword}%`);
            });
        }
        if (filters?.category) {
            query = query.where('category', filters.category);
        }
        if (filters?.isActive !== undefined) {
            query = query.where('is_active', filters.isActive);
        }
        // Map camelCase to snake_case for database columns
        const columnMap = {
            createdAt: 'created_at',
            updatedAt: 'updated_at',
            displayOrder: 'display_order',
            isActive: 'is_active'
        };
        const sortBy = filters?.sortBy || 'display_order';
        const sortOrder = filters?.sortOrder || 'asc';
        const dbColumn = columnMap[sortBy] || sortBy;
        const rows = await query.orderBy(dbColumn, sortOrder).select('*');
        return rows.map((row) => this.mapRowToEntity(row));
    }
    async findById(id) {
        const row = await db(this.tableName).where({ id }).first();
        return row ? this.mapRowToEntity(row) : null;
    }
    async findActive() {
        const rows = await db(this.tableName)
            .where({ is_active: true })
            .orderBy('display_order', 'asc')
            .select('*');
        return rows.map((row) => this.mapRowToEntity(row));
    }
    async findByCategory(category) {
        const rows = await db(this.tableName)
            .where({ category, is_active: true })
            .orderBy('display_order', 'asc')
            .select('*');
        return rows.map((row) => this.mapRowToEntity(row));
    }
    async findByLanguage(language) {
        const rows = await db(this.tableName)
            .where({ language, is_active: true })
            .orderBy('display_order', 'asc')
            .select('*');
        return rows.map((row) => this.mapRowToEntity(row));
    }
    async findByCategoryAndLanguage(category, language) {
        const rows = await db(this.tableName)
            .where({ category, language, is_active: true })
            .orderBy('display_order', 'asc')
            .select('*');
        return rows.map((row) => this.mapRowToEntity(row));
    }
    async create(faq) {
        await db(this.tableName).insert({
            id: faq.id,
            question: faq.question,
            answer: faq.answer,
            category: faq.category,
            language: faq.language,
            display_order: faq.displayOrder,
            is_active: faq.isActive,
        });
        return faq;
    }
    async update(id, data) {
        const updateData = {};
        if (data.question)
            updateData.question = data.question;
        if (data.answer)
            updateData.answer = data.answer;
        if (data.category)
            updateData.category = data.category;
        if (data.language)
            updateData.language = data.language;
        if (data.displayOrder !== undefined)
            updateData.display_order = data.displayOrder;
        if (data.isActive !== undefined)
            updateData.is_active = data.isActive;
        updateData.updated_at = db.fn.now();
        const updated = await db(this.tableName).where({ id }).update(updateData);
        if (updated === 0) {
            return null;
        }
        return this.findById(id);
    }
    async delete(id) {
        const deleted = await db(this.tableName).where({ id }).del();
        return deleted > 0;
    }
}
exports.FAQRepository = FAQRepository;
//# sourceMappingURL=FAQRepository.js.map