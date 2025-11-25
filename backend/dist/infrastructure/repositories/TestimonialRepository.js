"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TestimonialRepository = void 0;
const Testimonial_1 = require("../../domain/entities/Testimonial");
const knex_1 = __importDefault(require("knex"));
const database_1 = __importDefault(require("../config/database"));
const db = (0, knex_1.default)(database_1.default);
class TestimonialRepository {
    constructor() {
        this.tableName = 'testimonials';
    }
    mapRowToEntity(row) {
        return new Testimonial_1.Testimonial(row.id, row.client_name, row.client_role, row.content, row.rating, new Date(row.event_date), row.location, row.language, Boolean(row.is_active), new Date(row.created_at), new Date(row.updated_at));
    }
    async findAll(filters) {
        let query = db(this.tableName);
        if (filters?.keyword) {
            query = query.where((builder) => {
                builder
                    .where('client_name', 'like', `%${filters.keyword}%`)
                    .orWhere('content', 'like', `%${filters.keyword}%`)
                    .orWhere('location', 'like', `%${filters.keyword}%`);
            });
        }
        if (filters?.rating) {
            query = query.where('rating', filters.rating);
        }
        if (filters?.isActive !== undefined) {
            query = query.where('is_active', filters.isActive);
        }
        // Map camelCase to snake_case for database columns
        const columnMap = {
            createdAt: 'created_at',
            updatedAt: 'updated_at',
            eventDate: 'event_date',
            clientName: 'client_name',
            isActive: 'is_active'
        };
        const sortBy = filters?.sortBy || 'event_date';
        const sortOrder = filters?.sortOrder || 'desc';
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
            .orderBy('event_date', 'desc')
            .select('*');
        return rows.map((row) => this.mapRowToEntity(row));
    }
    async findByLanguage(language) {
        const rows = await db(this.tableName)
            .where({ language, is_active: true })
            .orderBy('event_date', 'desc')
            .select('*');
        return rows.map((row) => this.mapRowToEntity(row));
    }
    async create(testimonial) {
        await db(this.tableName).insert({
            id: testimonial.id,
            client_name: testimonial.clientName,
            client_role: testimonial.clientRole,
            content: testimonial.content,
            rating: testimonial.rating,
            event_date: testimonial.eventDate,
            location: testimonial.location,
            language: testimonial.language,
            is_active: testimonial.isActive,
        });
        return testimonial;
    }
    async update(id, data) {
        const updateData = {};
        if (data.clientName)
            updateData.client_name = data.clientName;
        if (data.clientRole)
            updateData.client_role = data.clientRole;
        if (data.content)
            updateData.content = data.content;
        if (data.rating !== undefined)
            updateData.rating = data.rating;
        if (data.eventDate)
            updateData.event_date = data.eventDate;
        if (data.location)
            updateData.location = data.location;
        if (data.language)
            updateData.language = data.language;
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
exports.TestimonialRepository = TestimonialRepository;
//# sourceMappingURL=TestimonialRepository.js.map