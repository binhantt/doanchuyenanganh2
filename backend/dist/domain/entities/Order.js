"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Order = void 0;
class Order {
    constructor(id, clientName, clientEmail, clientPhone, weddingDate, guestCount, venue, notes, items, paymentMethod, totalAmount, depositAmount, status = 'pending', promotionId, promotionCode, discountAmount = 0, finalAmount, createdAt, updatedAt) {
        this.id = id;
        this.clientName = clientName;
        this.clientEmail = clientEmail;
        this.clientPhone = clientPhone;
        this.weddingDate = weddingDate;
        this.guestCount = guestCount;
        this.venue = venue;
        this.notes = notes;
        this.items = items;
        this.paymentMethod = paymentMethod;
        this.totalAmount = totalAmount;
        this.depositAmount = depositAmount;
        this.status = status;
        this.promotionId = promotionId;
        this.promotionCode = promotionCode;
        this.discountAmount = discountAmount;
        this.finalAmount = finalAmount;
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;
    }
    isPending() {
        return this.status === 'pending';
    }
    isPaid() {
        return this.status === 'paid';
    }
    getDisplayDate() {
        return this.weddingDate.toLocaleDateString('vi-VN', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
        });
    }
    calculateTotal() {
        return this.items.reduce((sum, item) => sum + item.subtotal, 0);
    }
    calculateFinalAmount() {
        return this.totalAmount - this.discountAmount;
    }
    hasPromotion() {
        return !!this.promotionCode && this.discountAmount > 0;
    }
}
exports.Order = Order;
//# sourceMappingURL=Order.js.map