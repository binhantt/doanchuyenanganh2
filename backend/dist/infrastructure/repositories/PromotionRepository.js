"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PromotionRepository = void 0;
const Promotion_1 = require("../../domain/entities/Promotion");
const connection_1 = require("../database/connection");
class PromotionRepository {
    constructor() {
        this.tableName = 'promotions';
    }
    mapRowToEntity(row) {
        return new Promotion_1.Promotion(row.id, row.code, row.title, row.description, row.discount_type, Number(row.discount_value), row.max_discount ? Number(row.max_discount) : null, row.min_order_amount ? Number(row.min_order_amount) : null, row.applicable_services ? JSON.parse(row.applicable_services) : null, row.applicable_packages ? JSON.parse(row.applicable_packages) : null, new Date(row.start_date), new Date(row.end_date), Boolean(row.is_active), new Date(row.created_at), new Date(row.updated_at));
    }
    async findAll(filters) {
        let query = (0, connection_1.db)(this.tableName);
        if (filters?.keyword) {
            query = query.where((builder) => {
                builder
                    .where('code', 'like', `%${filters.keyword}%`)
                    .orWhere('title', 'like', `%${filters.keyword}%`)
                    .orWhere('description', 'like', `%${filters.keyword}%`);
            });
        }
        if (filters?.discountType) {
            query = query.where('discount_type', filters.discountType);
        }
        if (filters?.isActive !== undefined) {
            query = query.where('is_active', filters.isActive);
        }
        // Map camelCase to snake_case for database columns
        const columnMap = {
            createdAt: 'created_at',
            updatedAt: 'updated_at',
            startDate: 'start_date',
            endDate: 'end_date',
            discountType: 'discount_type',
            discountValue: 'discount_value',
            isActive: 'is_active'
        };
        const sortBy = filters?.sortBy || 'created_at';
        const sortOrder = filters?.sortOrder || 'desc';
        const dbColumn = columnMap[sortBy] || sortBy;
        const rows = await query.orderBy(dbColumn, sortOrder).select('*');
        return rows.map((row) => this.mapRowToEntity(row));
    }
    async findById(id) {
        const row = await (0, connection_1.db)(this.tableName).where({ id }).first();
        return row ? this.mapRowToEntity(row) : null;
    }
    async findByCode(code) {
        const row = await (0, connection_1.db)(this.tableName).where({ code }).first();
        return row ? this.mapRowToEntity(row) : null;
    }
    async findActive() {
        const now = new Date();
        const rows = await (0, connection_1.db)(this.tableName)
            .where({ is_active: true })
            .where('start_date', '<=', now)
            .where('end_date', '>=', now)
            .select('*');
        return rows.map((row) => this.mapRowToEntity(row));
    }
    async findByService(serviceId) {
        const rows = await (0, connection_1.db)(this.tableName)
            .where({ is_active: true })
            .select('*');
        return rows
            .filter((row) => {
            if (!row.applicable_services)
                return true;
            const services = JSON.parse(row.applicable_services);
            return services.includes(serviceId);
        })
            .map((row) => this.mapRowToEntity(row));
    }
    async findByPackage(packageId) {
        const rows = await (0, connection_1.db)(this.tableName)
            .where({ is_active: true })
            .select('*');
        return rows
            .filter((row) => {
            if (!row.applicable_packages)
                return true;
            const packages = JSON.parse(row.applicable_packages);
            return packages.includes(packageId);
        })
            .map((row) => this.mapRowToEntity(row));
    }
    async create(promotion) {
        await (0, connection_1.db)(this.tableName).insert({
            id: promotion.id,
            code: promotion.code,
            title: promotion.title,
            description: promotion.description,
            discount_type: promotion.discountType,
            discount_value: promotion.discountValue,
            max_discount: promotion.maxDiscount,
            min_order_amount: promotion.minOrderAmount,
            applicable_services: promotion.applicableServices
                ? JSON.stringify(promotion.applicableServices)
                : null,
            applicable_packages: promotion.applicablePackages
                ? JSON.stringify(promotion.applicablePackages)
                : null,
            start_date: promotion.startDate,
            end_date: promotion.endDate,
            is_active: promotion.isActive,
        });
        return promotion;
    }
    async update(id, data) {
        const updateData = {};
        if (data.code)
            updateData.code = data.code;
        if (data.title)
            updateData.title = data.title;
        if (data.description)
            updateData.description = data.description;
        if (data.discountType)
            updateData.discount_type = data.discountType;
        if (data.discountValue !== undefined)
            updateData.discount_value = data.discountValue;
        if (data.maxDiscount !== undefined)
            updateData.max_discount = data.maxDiscount;
        if (data.minOrderAmount !== undefined)
            updateData.min_order_amount = data.minOrderAmount;
        if (data.applicableServices)
            updateData.applicable_services = JSON.stringify(data.applicableServices);
        if (data.applicablePackages)
            updateData.applicable_packages = JSON.stringify(data.applicablePackages);
        if (data.startDate)
            updateData.start_date = data.startDate;
        if (data.endDate)
            updateData.end_date = data.endDate;
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
exports.PromotionRepository = PromotionRepository;
//# sourceMappingURL=PromotionRepository.js.map