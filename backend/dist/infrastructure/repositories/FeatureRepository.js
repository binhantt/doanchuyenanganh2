"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FeatureRepository = void 0;
const Feature_1 = require("../../domain/entities/Feature");
const connection_1 = require("../database/connection");
class FeatureRepository {
    constructor() {
        this.tableName = 'features';
    }
    mapRowToEntity(row) {
        return new Feature_1.Feature(row.id, row.entity_id, row.entity_type, row.feature_text, row.feature_type, row.display_order, new Date(row.created_at), new Date(row.updated_at));
    }
    async findByEntity(entityId, entityType) {
        const rows = await (0, connection_1.db)(this.tableName)
            .where({ entity_id: entityId, entity_type: entityType })
            .orderBy('display_order', 'asc')
            .select('*');
        return rows.map((row) => this.mapRowToEntity(row));
    }
    async findByEntityAndType(entityId, entityType, featureType) {
        const rows = await (0, connection_1.db)(this.tableName)
            .where({ entity_id: entityId, entity_type: entityType, feature_type: featureType })
            .orderBy('display_order', 'asc')
            .select('*');
        return rows.map((row) => this.mapRowToEntity(row));
    }
    async create(feature) {
        await (0, connection_1.db)(this.tableName).insert({
            id: feature.id,
            entity_id: feature.entityId,
            entity_type: feature.entityType,
            feature_text: feature.featureText,
            feature_type: feature.featureType,
            display_order: feature.displayOrder,
        });
        return feature;
    }
    async createMany(features) {
        const rows = features.map((feature) => ({
            id: feature.id,
            entity_id: feature.entityId,
            entity_type: feature.entityType,
            feature_text: feature.featureText,
            feature_type: feature.featureType,
            display_order: feature.displayOrder,
        }));
        await (0, connection_1.db)(this.tableName).insert(rows);
        return features;
    }
    async update(id, data) {
        const updateData = {};
        if (data.featureText)
            updateData.feature_text = data.featureText;
        if (data.featureType)
            updateData.feature_type = data.featureType;
        if (data.displayOrder !== undefined)
            updateData.display_order = data.displayOrder;
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
exports.FeatureRepository = FeatureRepository;
//# sourceMappingURL=FeatureRepository.js.map