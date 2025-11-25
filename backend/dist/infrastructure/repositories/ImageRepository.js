"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ImageRepository = void 0;
const Image_1 = require("../../domain/entities/Image");
const connection_1 = require("../database/connection");
class ImageRepository {
    constructor() {
        this.tableName = 'images';
    }
    mapRowToEntity(row) {
        return new Image_1.Image(row.id, row.entity_id, row.entity_type, row.url, row.alt_text, row.display_order, Boolean(row.is_primary), new Date(row.created_at), new Date(row.updated_at));
    }
    async findByEntity(entityId, entityType) {
        const rows = await (0, connection_1.db)(this.tableName)
            .where({ entity_id: entityId, entity_type: entityType })
            .orderBy('display_order', 'asc')
            .select('*');
        return rows.map((row) => this.mapRowToEntity(row));
    }
    async findPrimaryByEntity(entityId, entityType) {
        const row = await (0, connection_1.db)(this.tableName)
            .where({ entity_id: entityId, entity_type: entityType, is_primary: true })
            .first();
        return row ? this.mapRowToEntity(row) : null;
    }
    async create(image) {
        await (0, connection_1.db)(this.tableName).insert({
            id: image.id,
            entity_id: image.entityId,
            entity_type: image.entityType,
            url: image.url,
            alt_text: image.altText,
            display_order: image.displayOrder,
            is_primary: image.isPrimary,
        });
        return image;
    }
    async createMany(images) {
        const rows = images.map((img) => ({
            id: img.id,
            entity_id: img.entityId,
            entity_type: img.entityType,
            url: img.url,
            alt_text: img.altText,
            display_order: img.displayOrder,
            is_primary: img.isPrimary,
        }));
        await (0, connection_1.db)(this.tableName).insert(rows);
        return images;
    }
    async update(id, data) {
        const updateData = {};
        if (data.url)
            updateData.url = data.url;
        if (data.altText !== undefined)
            updateData.alt_text = data.altText;
        if (data.displayOrder !== undefined)
            updateData.display_order = data.displayOrder;
        if (data.isPrimary !== undefined)
            updateData.is_primary = data.isPrimary;
        updateData.updated_at = connection_1.db.fn.now();
        const updated = await (0, connection_1.db)(this.tableName).where({ id }).update(updateData);
        if (updated === 0) {
            return null;
        }
        const row = await (0, connection_1.db)(this.tableName).where({ id }).first();
        return row ? this.mapRowToEntity(row) : null;
    }
    async delete(id) {
        const deleted = await (0, connection_1.db)(this.tableName).where({ id }).del();
        return deleted > 0;
    }
    async deleteByEntity(entityId, entityType) {
        const deleted = await (0, connection_1.db)(this.tableName)
            .where({ entity_id: entityId, entity_type: entityType })
            .del();
        return deleted > 0;
    }
}
exports.ImageRepository = ImageRepository;
//# sourceMappingURL=ImageRepository.js.map