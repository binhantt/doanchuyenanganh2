"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrderService = void 0;
const Order_1 = require("../../domain/entities/Order");
const uuid_1 = require("uuid");
class OrderService {
    constructor(orderRepository) {
        this.orderRepository = orderRepository;
    }
    async getAllOrders(filters) {
        return this.orderRepository.findAll(filters);
    }
    async getOrderById(id) {
        return this.orderRepository.findById(id);
    }
    async getOrdersByEmail(email) {
        return this.orderRepository.findByEmail(email);
    }
    async getOrdersByStatus(status) {
        return this.orderRepository.findByStatus(status);
    }
    async getOrdersByDateRange(startDate, endDate) {
        return this.orderRepository.findByDateRange(startDate, endDate);
    }
    async createOrder(data) {
        if (!data.clientName || !data.clientEmail || !data.clientPhone || !data.weddingDate || !data.paymentMethod) {
            throw new Error('Missing required fields');
        }
        if (data.guestCount < 1) {
            throw new Error('Guest count must be at least 1');
        }
        if (!data.items || data.items.length === 0) {
            throw new Error('Order must contain at least one item');
        }
        const subtotal = data.items.reduce((sum, item) => sum + item.subtotal, 0);
        const discountAmount = data.discountAmount || 0;
        const totalAmount = subtotal - discountAmount;
        const depositAmount = totalAmount * 0.3;
        const order = new Order_1.Order((0, uuid_1.v4)(), data.clientName, data.clientEmail, data.clientPhone, data.weddingDate, data.guestCount, data.venue, data.notes || '', data.items, data.paymentMethod, totalAmount, depositAmount, 'pending', null, // promotionId
        data.promotionCode || null, discountAmount, totalAmount // finalAmount = totalAmount (already discounted)
        );
        return this.orderRepository.create(order);
    }
    async updateOrder(id, data) {
        return this.orderRepository.update(id, data);
    }
    async deleteOrder(id) {
        return this.orderRepository.delete(id);
    }
    async applyVoucher(voucherCode, totalAmount) {
        // Import VoucherRepository để kiểm tra voucher
        const { VoucherRepository } = await Promise.resolve().then(() => __importStar(require('../../infrastructure/repositories/VoucherRepository')));
        const voucherRepo = new VoucherRepository();
        // Tìm voucher theo code
        const voucher = await voucherRepo.findByCode(voucherCode);
        if (!voucher) {
            return {
                valid: false,
                message: 'Mã giảm giá không tồn tại',
            };
        }
        if (!voucher.isValid()) {
            return {
                valid: false,
                message: 'Mã giảm giá đã hết hạn hoặc không còn hiệu lực',
            };
        }
        if (!voucher.canBeUsedForOrder(totalAmount)) {
            if (voucher.minOrderValue) {
                return {
                    valid: false,
                    message: `Đơn hàng phải có giá trị tối thiểu ${voucher.minOrderValue.toLocaleString('vi-VN')}đ`,
                };
            }
            return {
                valid: false,
                message: 'Không thể áp dụng mã giảm giá cho đơn hàng này',
            };
        }
        // Tính toán giảm giá
        const discountAmount = voucher.calculateDiscount(totalAmount);
        const finalAmount = totalAmount - discountAmount;
        return {
            valid: true,
            voucherCode: voucher.code,
            discountAmount,
            finalAmount,
            discountType: voucher.discountType,
            discountValue: voucher.discountValue,
        };
    }
}
exports.OrderService = OrderService;
//# sourceMappingURL=OrderService.js.map