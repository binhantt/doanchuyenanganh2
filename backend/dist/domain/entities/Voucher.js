"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Voucher = void 0;
class Voucher {
    constructor(id, code, name, description, discountType, discountValue, maxDiscountAmount, minOrderValue, usageLimit, usedCount, usagePerCustomer, startDate, endDate, isActive, createdAt, updatedAt) {
        this.id = id;
        this.code = code;
        this.name = name;
        this.description = description;
        this.discountType = discountType;
        this.discountValue = discountValue;
        this.maxDiscountAmount = maxDiscountAmount;
        this.minOrderValue = minOrderValue;
        this.usageLimit = usageLimit;
        this.usedCount = usedCount;
        this.usagePerCustomer = usagePerCustomer;
        this.startDate = startDate;
        this.endDate = endDate;
        this.isActive = isActive;
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;
    }
    isValid() {
        if (!this.isActive)
            return false;
        const now = new Date();
        if (this.startDate && now < this.startDate)
            return false;
        if (this.endDate && now > this.endDate)
            return false;
        if (this.usageLimit && this.usedCount >= this.usageLimit)
            return false;
        return true;
    }
    canBeUsedForOrder(orderAmount) {
        if (!this.isValid())
            return false;
        if (this.minOrderValue && orderAmount < this.minOrderValue)
            return false;
        return true;
    }
    calculateDiscount(orderAmount) {
        if (!this.canBeUsedForOrder(orderAmount))
            return 0;
        let discount = 0;
        if (this.discountType === 'percentage') {
            discount = (orderAmount * this.discountValue) / 100;
            if (this.maxDiscountAmount && discount > this.maxDiscountAmount) {
                discount = this.maxDiscountAmount;
            }
        }
        else {
            discount = this.discountValue;
        }
        // Đảm bảo giảm giá không vượt quá tổng tiền
        if (discount > orderAmount) {
            discount = orderAmount;
        }
        return discount;
    }
}
exports.Voucher = Voucher;
//# sourceMappingURL=Voucher.js.map