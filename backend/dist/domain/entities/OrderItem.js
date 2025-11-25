"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrderItem = void 0;
class OrderItem {
    constructor(id, orderId, productId, packageId, serviceId, itemType, itemName, description, quantity, unitPrice, subtotal, createdAt, updatedAt) {
        this.id = id;
        this.orderId = orderId;
        this.productId = productId;
        this.packageId = packageId;
        this.serviceId = serviceId;
        this.itemType = itemType;
        this.itemName = itemName;
        this.description = description;
        this.quantity = quantity;
        this.unitPrice = unitPrice;
        this.subtotal = subtotal;
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;
    }
    isProduct() {
        return this.itemType === 'product' && !!this.productId;
    }
    isPackage() {
        return this.itemType === 'package' && !!this.packageId;
    }
    isService() {
        return this.itemType === 'service' && !!this.serviceId;
    }
    getRelatedId() {
        switch (this.itemType) {
            case 'product':
                return this.productId;
            case 'package':
                return this.packageId;
            case 'service':
                return this.serviceId;
            default:
                return null;
        }
    }
}
exports.OrderItem = OrderItem;
//# sourceMappingURL=OrderItem.js.map