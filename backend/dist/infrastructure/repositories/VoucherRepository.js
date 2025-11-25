"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.VoucherRepository = void 0;
const Voucher_1 = require("../../domain/entities/Voucher");
const connection_1 = require("../database/connection");
class VoucherRepository {
    constructor() {
        this.tableName = 'vouchers';
    }
    mapRowToEntity(row) {
        return new Voucher_1.Voucher(row.id, row.code, row.name, row.description, row.discount_type, Number(row.discount_value), row.max_discount_amount ? Number(row.max_discount_amount) : null, row.min_order_value ? Number(row.min_order_value) : null, row.usage_limit, row.used_count, row.usage_per_customer, row.start_date, row.end_date, Boolean(row.is_active), new Date(row.created_at), new Date(row.updated_at));
    }
    async findAll() {
        const rows = await (0, connection_1.db)(this.tableName).select('*');
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
            .where((builder) => {
            builder.whereNull('start_date').orWhere('start_date', '<=', now);
        })
            .where((builder) => {
            builder.whereNull('end_date').orWhere('end_date', '>=', now);
        })
            .select('*');
        return rows.map((row) => this.mapRowToEntity(row));
    }
    async create(voucher) {
        await (0, connection_1.db)(this.tableName).insert({
            id: voucher.id,
            code: voucher.code,
            name: voucher.name,
            description: voucher.description,
            discount_type: voucher.discountType,
            discount_value: voucher.discountValue,
            max_discount_amount: voucher.maxDiscountAmount,
            min_order_value: voucher.minOrderValue,
            usage_limit: voucher.usageLimit,
            used_count: voucher.usedCount,
            usage_per_customer: voucher.usagePerCustomer,
            start_date: voucher.startDate,
            end_date: voucher.endDate,
            is_active: voucher.isActive,
        });
        return voucher;
    }
    async update(id, data) {
        const updateData = {};
        if (data.code)
            updateData.code = data.code;
        if (data.name)
            updateData.name = data.name;
        if (data.description !== undefined)
            updateData.description = data.description;
        if (data.discountType)
            updateData.discount_type = data.discountType;
        if (data.discountValue !== undefined)
            updateData.discount_value = data.discountValue;
        if (data.maxDiscountAmount !== undefined)
            updateData.max_discount_amount = data.maxDiscountAmount;
        if (data.minOrderValue !== undefined)
            updateData.min_order_value = data.minOrderValue;
        if (data.usageLimit !== undefined)
            updateData.usage_limit = data.usageLimit;
        if (data.usedCount !== undefined)
            updateData.used_count = data.usedCount;
        if (data.usagePerCustomer !== undefined)
            updateData.usage_per_customer = data.usagePerCustomer;
        if (data.startDate !== undefined)
            updateData.start_date = data.startDate;
        if (data.endDate !== undefined)
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
    async incrementUsedCount(id) {
        const updated = await (0, connection_1.db)(this.tableName).where({ id }).increment('used_count', 1);
        return updated > 0;
    }
}
exports.VoucherRepository = VoucherRepository;
//# sourceMappingURL=VoucherRepository.js.map