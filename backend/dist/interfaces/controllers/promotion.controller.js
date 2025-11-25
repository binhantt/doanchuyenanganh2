"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PromotionController = void 0;
class PromotionController {
    constructor(promotionService) {
        this.promotionService = promotionService;
    }
    async list(req, res) {
        try {
            const { keyword, discountType, active, sortBy, sortOrder } = req.query;
            const filters = {};
            if (keyword)
                filters.keyword = keyword;
            if (discountType)
                filters.discountType = discountType;
            if (active !== undefined)
                filters.isActive = active === 'true';
            if (sortBy)
                filters.sortBy = sortBy;
            if (sortOrder)
                filters.sortOrder = sortOrder;
            const promotions = await this.promotionService.getAllPromotions(filters);
            return res.status(200).json({
                success: true,
                data: promotions,
                count: promotions.length,
            });
        }
        catch (error) {
            return res.status(500).json({
                success: false,
                message: error instanceof Error ? error.message : 'Internal server error',
            });
        }
    }
    async getById(req, res) {
        try {
            const { id } = req.params;
            const promotion = await this.promotionService.getPromotionById(id);
            if (!promotion) {
                return res.status(404).json({
                    success: false,
                    message: 'Promotion not found',
                });
            }
            return res.status(200).json({
                success: true,
                data: promotion,
            });
        }
        catch (error) {
            return res.status(500).json({
                success: false,
                message: error instanceof Error ? error.message : 'Internal server error',
            });
        }
    }
    async getByCode(req, res) {
        try {
            const { code } = req.params;
            const promotion = await this.promotionService.getPromotionByCode(code);
            if (!promotion) {
                return res.status(404).json({
                    success: false,
                    message: 'Promotion code not found',
                });
            }
            return res.status(200).json({
                success: true,
                data: promotion,
            });
        }
        catch (error) {
            return res.status(500).json({
                success: false,
                message: error instanceof Error ? error.message : 'Internal server error',
            });
        }
    }
    async getByService(req, res) {
        try {
            const { serviceId } = req.params;
            const promotions = await this.promotionService.getPromotionsByService(serviceId);
            return res.status(200).json({
                success: true,
                data: promotions,
                count: promotions.length,
            });
        }
        catch (error) {
            return res.status(500).json({
                success: false,
                message: error instanceof Error ? error.message : 'Internal server error',
            });
        }
    }
    async getByPackage(req, res) {
        try {
            const { packageId } = req.params;
            const promotions = await this.promotionService.getPromotionsByPackage(packageId);
            return res.status(200).json({
                success: true,
                data: promotions,
                count: promotions.length,
            });
        }
        catch (error) {
            return res.status(500).json({
                success: false,
                message: error instanceof Error ? error.message : 'Internal server error',
            });
        }
    }
    async create(req, res) {
        try {
            const input = req.body;
            const promotion = await this.promotionService.createPromotion({
                code: input.code,
                title: input.title,
                description: input.description,
                discountType: input.discountType,
                discountValue: input.discountValue,
                maxDiscount: input.maxDiscount,
                minOrderAmount: input.minOrderAmount,
                applicableServices: input.applicableServices,
                applicablePackages: input.applicablePackages,
                startDate: new Date(input.startDate),
                endDate: new Date(input.endDate),
                isActive: input.isActive,
            });
            return res.status(201).json({
                success: true,
                data: promotion,
                message: 'Promotion created successfully',
            });
        }
        catch (error) {
            return res.status(400).json({
                success: false,
                message: error instanceof Error ? error.message : 'Failed to create promotion',
            });
        }
    }
    async update(req, res) {
        try {
            const { id } = req.params;
            const input = req.body;
            const updateData = {};
            if (input.code)
                updateData.code = input.code;
            if (input.title)
                updateData.title = input.title;
            if (input.description)
                updateData.description = input.description;
            if (input.discountType)
                updateData.discountType = input.discountType;
            if (input.discountValue !== undefined)
                updateData.discountValue = input.discountValue;
            if (input.maxDiscount !== undefined)
                updateData.maxDiscount = input.maxDiscount;
            if (input.minOrderAmount !== undefined)
                updateData.minOrderAmount = input.minOrderAmount;
            if (input.applicableServices)
                updateData.applicableServices = input.applicableServices;
            if (input.applicablePackages)
                updateData.applicablePackages = input.applicablePackages;
            if (input.startDate)
                updateData.startDate = new Date(input.startDate);
            if (input.endDate)
                updateData.endDate = new Date(input.endDate);
            if (input.isActive !== undefined)
                updateData.isActive = input.isActive;
            const promotion = await this.promotionService.updatePromotion(id, updateData);
            if (!promotion) {
                return res.status(404).json({
                    success: false,
                    message: 'Promotion not found',
                });
            }
            return res.status(200).json({
                success: true,
                data: promotion,
                message: 'Promotion updated successfully',
            });
        }
        catch (error) {
            return res.status(400).json({
                success: false,
                message: error instanceof Error ? error.message : 'Failed to update promotion',
            });
        }
    }
    async delete(req, res) {
        try {
            const { id } = req.params;
            const deleted = await this.promotionService.deletePromotion(id);
            if (!deleted) {
                return res.status(404).json({
                    success: false,
                    message: 'Promotion not found',
                });
            }
            return res.status(200).json({
                success: true,
                message: 'Promotion deleted successfully',
            });
        }
        catch (error) {
            return res.status(500).json({
                success: false,
                message: error instanceof Error ? error.message : 'Internal server error',
            });
        }
    }
}
exports.PromotionController = PromotionController;
//# sourceMappingURL=promotion.controller.js.map