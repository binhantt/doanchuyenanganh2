"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PromotionService = void 0;
const Promotion_1 = require("../../domain/entities/Promotion");
const uuid_1 = require("uuid");
class PromotionService {
    constructor(promotionRepository) {
        this.promotionRepository = promotionRepository;
    }
    async getAllPromotions() {
        return this.promotionRepository.findAll();
    }
    async getPromotionById(id) {
        return this.promotionRepository.findById(id);
    }
    async getPromotionByCode(code) {
        return this.promotionRepository.findByCode(code);
    }
    async getActivePromotions() {
        return this.promotionRepository.findActive();
    }
    async getPromotionsByService(serviceId) {
        return this.promotionRepository.findByService(serviceId);
    }
    async getPromotionsByPackage(packageId) {
        return this.promotionRepository.findByPackage(packageId);
    }
    async createPromotion(data) {
        if (!data.code || !data.title || !data.discountValue) {
            throw new Error('Missing required fields');
        }
        if (data.discountType === 'percentage' && data.discountValue > 100) {
            throw new Error('Percentage discount cannot exceed 100%');
        }
        if (data.startDate >= data.endDate) {
            throw new Error('Start date must be before end date');
        }
        const promotion = new Promotion_1.Promotion((0, uuid_1.v4)(), data.code, data.title, data.description, data.discountType, data.discountValue, data.maxDiscount || null, data.minOrderAmount || null, data.applicableServices || null, data.applicablePackages || null, data.startDate, data.endDate, data.isActive);
        return this.promotionRepository.create(promotion);
    }
    async updatePromotion(id, data) {
        const existing = await this.promotionRepository.findById(id);
        if (!existing) {
            return null;
        }
        return this.promotionRepository.update(id, data);
    }
    async deletePromotion(id) {
        const existing = await this.promotionRepository.findById(id);
        if (!existing) {
            return false;
        }
        return this.promotionRepository.delete(id);
    }
}
exports.PromotionService = PromotionService;
//# sourceMappingURL=PromotionService.js.map