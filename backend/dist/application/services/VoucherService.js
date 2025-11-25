"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.VoucherService = void 0;
const Voucher_1 = require("../../domain/entities/Voucher");
const uuid_1 = require("uuid");
class VoucherService {
    constructor(voucherRepository) {
        this.voucherRepository = voucherRepository;
    }
    async getAllVouchers() {
        return this.voucherRepository.findAll();
    }
    async getActiveVouchers() {
        return this.voucherRepository.findActive();
    }
    async getVoucherById(id) {
        return this.voucherRepository.findById(id);
    }
    async getVoucherByCode(code) {
        return this.voucherRepository.findByCode(code);
    }
    async createVoucher(data) {
        // Validate
        if (!data.code || !data.name || !data.discountType || !data.discountValue) {
            throw new Error('Missing required fields');
        }
        if (data.discountType === 'percentage' && (data.discountValue < 0 || data.discountValue > 100)) {
            throw new Error('Percentage discount must be between 0 and 100');
        }
        if (data.discountValue < 0) {
            throw new Error('Discount value must be positive');
        }
        // Check if code already exists
        const existing = await this.voucherRepository.findByCode(data.code);
        if (existing) {
            throw new Error('Voucher code already exists');
        }
        const voucher = new Voucher_1.Voucher((0, uuid_1.v4)(), data.code.toUpperCase(), data.name, data.description || null, data.discountType, data.discountValue, data.maxDiscountAmount || null, data.minOrderValue || null, data.usageLimit || null, 0, // usedCount starts at 0
        data.usagePerCustomer || null, data.startDate || null, data.endDate || null, data.isActive !== undefined ? data.isActive : true);
        return this.voucherRepository.create(voucher);
    }
    async updateVoucher(id, data) {
        const existing = await this.voucherRepository.findById(id);
        if (!existing) {
            return null;
        }
        // Validate if updating code
        if (data.code && data.code !== existing.code) {
            const codeExists = await this.voucherRepository.findByCode(data.code);
            if (codeExists) {
                throw new Error('Voucher code already exists');
            }
        }
        // Validate discount value
        if (data.discountType === 'percentage' && data.discountValue) {
            if (data.discountValue < 0 || data.discountValue > 100) {
                throw new Error('Percentage discount must be between 0 and 100');
            }
        }
        return this.voucherRepository.update(id, data);
    }
    async deleteVoucher(id) {
        return this.voucherRepository.delete(id);
    }
}
exports.VoucherService = VoucherService;
//# sourceMappingURL=VoucherService.js.map