"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DecorationService = void 0;
const Decoration_1 = require("../../domain/entities/Decoration");
const uuid_1 = require("uuid");
class DecorationService {
    constructor(decorationRepository) {
        this.decorationRepository = decorationRepository;
    }
    async getAllDecorations(onlyActive = false) {
        if (onlyActive) {
            return await this.decorationRepository.findActive();
        }
        return await this.decorationRepository.findAll();
    }
    async getDecorationById(id) {
        return await this.decorationRepository.findById(id);
    }
    async getDecorationBySlug(slug) {
        return await this.decorationRepository.findBySlug(slug);
    }
    async getDecorationsByTheme(theme) {
        return await this.decorationRepository.findByTheme(theme);
    }
    async getDecorationsByStyle(style) {
        return await this.decorationRepository.findByStyle(style);
    }
    async createDecoration(data) {
        // Business validation
        if (data.basePrice < 0) {
            throw new Error('Base price must be non-negative');
        }
        if (data.features.length === 0) {
            throw new Error('Decoration must have at least one feature');
        }
        // Check if slug already exists
        const existing = await this.decorationRepository.findBySlug(data.slug);
        if (existing) {
            throw new Error(`Decoration with slug "${data.slug}" already exists`);
        }
        // Create entity
        const decoration = new Decoration_1.Decoration((0, uuid_1.v4)(), data.name, data.slug, data.description, data.theme, data.style, data.basePrice, data.features, data.images, data.isActive ?? true);
        return await this.decorationRepository.create(decoration);
    }
    async updateDecoration(id, data) {
        const existing = await this.decorationRepository.findById(id);
        if (!existing) {
            return null;
        }
        if (data.basePrice !== undefined && data.basePrice < 0) {
            throw new Error('Base price must be non-negative');
        }
        if (data.features !== undefined && data.features.length === 0) {
            throw new Error('Decoration must have at least one feature');
        }
        if (data.slug && data.slug !== existing.slug) {
            const slugExists = await this.decorationRepository.findBySlug(data.slug);
            if (slugExists) {
                throw new Error(`Decoration with slug "${data.slug}" already exists`);
            }
        }
        return await this.decorationRepository.update(id, data);
    }
    async deleteDecoration(id) {
        const existing = await this.decorationRepository.findById(id);
        if (!existing) {
            return false;
        }
        return await this.decorationRepository.delete(id);
    }
}
exports.DecorationService = DecorationService;
//# sourceMappingURL=DecorationService.js.map