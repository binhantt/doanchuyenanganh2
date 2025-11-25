"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Promotion = void 0;
class Promotion {
    constructor(id, code, title, description, discountType, discountValue, maxDiscount, minOrderAmount, applicableServices, applicablePackages, startDate, endDate, isActive, createdAt, updatedAt) {
        this.id = id;
        this.code = code;
        this.title = title;
        this.description = description;
        this.discountType = discountType;
        this.discountValue = discountValue;
        this.maxDiscount = maxDiscount;
        this.minOrderAmount = minOrderAmount;
        this.applicableServices = applicableServices;
        this.applicablePackages = applicablePackages;
        this.startDate = startDate;
        this.endDate = endDate;
        this.isActive = isActive;
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;
    }
    isValid() {
        return this.isActive && new Date() >= this.startDate && new Date() <= this.endDate;
    }
    canApplyToService(serviceId) {
        if (!this.applicableServices)
            return true;
        return this.applicableServices.includes(serviceId);
    }
    canApplyToPackage(packageId) {
        if (!this.applicablePackages)
            return true;
        return this.applicablePackages.includes(packageId);
    }
    calculateDiscount(amount) {
        if (this.discountType === 'percentage') {
            const discount = (amount * this.discountValue) / 100;
            return this.maxDiscount ? Math.min(discount, this.maxDiscount) : discount;
        }
        return this.discountValue;
    }
}
exports.Promotion = Promotion;
//# sourceMappingURL=Promotion.js.map