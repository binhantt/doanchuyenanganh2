"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ServiceRepository = void 0;
;
const Service_1 = require("../../domain/entities/Service");
const connection_1 = require("../database/connection");
class ServiceRepository {
    constructor() {
        this.tableName = 'services';
    }
    mapRowToEntity(row) {
        return new Service_1.Service(row.id, row.name, row.slug, row.short_description, row.full_description, row.icon, Number(row.base_price), Boolean(row.is_active), new Date(row.created_at), new Date(row.updated_at));
    }
    async loadFeaturesAndImages(service) {
        // Load features
        const features = await (0, connection_1.db)('features')
            .where({ entity_id: service.id, entity_type: 'service' })
            .orderBy('display_order', 'asc');
        const featuresObj = {
            included: features.filter((f) => f.feature_type === 'included').map((f) => f.feature_text),
            excluded: features.filter((f) => f.feature_type === 'excluded').map((f) => f.feature_text),
            highlights: features.filter((f) => f.feature_type === 'highlight').map((f) => f.feature_text),
        };
        // Load images
        const images = await (0, connection_1.db)('images')
            .where({ entity_id: service.id, entity_type: 'service' })
            .orderBy('display_order', 'asc');
        return {
            ...service,
            features: featuresObj,
            images: images.map((img) => img.url),
        };
    }
    async findAll() {
        const rows = await (0, connection_1.db)(this.tableName).select('*');
        const services = rows.map((row) => this.mapRowToEntity(row));
        return Promise.all(services.map((s) => this.loadFeaturesAndImages(s)));
    }
    async findById(id) {
        const row = await (0, connection_1.db)(this.tableName).where({ id }).first();
        if (!row)
            return null;
        const service = this.mapRowToEntity(row);
        return this.loadFeaturesAndImages(service);
    }
    async findBySlug(slug) {
        const row = await (0, connection_1.db)(this.tableName).where({ slug }).first();
        if (!row)
            return null;
        const service = this.mapRowToEntity(row);
        return this.loadFeaturesAndImages(service);
    }
    async findActive() {
        const rows = await (0, connection_1.db)(this.tableName)
            .where({ is_active: true })
            .select('*');
        const services = rows.map((row) => this.mapRowToEntity(row));
        return Promise.all(services.map((s) => this.loadFeaturesAndImages(s)));
    }
    async create(service) {
        await (0, connection_1.db)(this.tableName).insert({
            id: service.id,
            name: service.name,
            slug: service.slug,
            short_description: service.shortDescription,
            full_description: service.fullDescription,
            icon: service.icon,
            base_price: service.basePrice,
            is_active: service.isActive,
        });
        return service;
    }
    async update(id, data) {
        const updateData = {};
        if (data.name)
            updateData.name = data.name;
        if (data.slug)
            updateData.slug = data.slug;
        if (data.shortDescription)
            updateData.short_description = data.shortDescription;
        if (data.fullDescription)
            updateData.full_description = data.fullDescription;
        if (data.icon)
            updateData.icon = data.icon;
        if (data.basePrice !== undefined)
            updateData.base_price = data.basePrice;
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
exports.ServiceRepository = ServiceRepository;
//# sourceMappingURL=ServiceRepository.js.map