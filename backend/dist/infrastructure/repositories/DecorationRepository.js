"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DecorationRepository = void 0;
const Decoration_1 = require("../../domain/entities/Decoration");
const connection_1 = require("../database/connection");
class DecorationRepository {
    constructor() {
        this.tableName = 'decorations';
    }
    mapRowToEntity(row) {
        return new Decoration_1.Decoration(row.id, row.name, row.slug, row.description, row.theme, row.style, Number(row.base_price), JSON.parse(row.features), JSON.parse(row.images), Boolean(row.is_active), new Date(row.created_at), new Date(row.updated_at));
    }
    async findAll() {
        const rows = await (0, connection_1.db)(this.tableName).select('*');
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
            .select('*');
        return rows.map((row) => this.mapRowToEntity(row));
    }
    async findByTheme(theme) {
        const rows = await (0, connection_1.db)(this.tableName)
            .where({ theme, is_active: true })
            .select('*');
        return rows.map((row) => this.mapRowToEntity(row));
    }
    async findByStyle(style) {
        const rows = await (0, connection_1.db)(this.tableName)
            .where({ style, is_active: true })
            .select('*');
        return rows.map((row) => this.mapRowToEntity(row));
    }
    async create(decoration) {
        await (0, connection_1.db)(this.tableName).insert({
            id: decoration.id,
            name: decoration.name,
            slug: decoration.slug,
            description: decoration.description,
            theme: decoration.theme,
            style: decoration.style,
            base_price: decoration.basePrice,
            features: JSON.stringify(decoration.features),
            images: JSON.stringify(decoration.images),
            is_active: decoration.isActive,
        });
        return decoration;
    }
    async update(id, data) {
        const updateData = {};
        if (data.name)
            updateData.name = data.name;
        if (data.slug)
            updateData.slug = data.slug;
        if (data.description)
            updateData.description = data.description;
        if (data.theme)
            updateData.theme = data.theme;
        if (data.style)
            updateData.style = data.style;
        if (data.basePrice !== undefined)
            updateData.base_price = data.basePrice;
        if (data.features)
            updateData.features = JSON.stringify(data.features);
        if (data.images)
            updateData.images = JSON.stringify(data.images);
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
exports.DecorationRepository = DecorationRepository;
//# sourceMappingURL=DecorationRepository.js.map