"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Service = void 0;
class Service {
    constructor(id, name, slug, shortDescription, fullDescription, icon, basePrice, isActive = true, createdAt, updatedAt, features, images) {
        this.id = id;
        this.name = name;
        this.slug = slug;
        this.shortDescription = shortDescription;
        this.fullDescription = fullDescription;
        this.icon = icon;
        this.basePrice = basePrice;
        this.isActive = isActive;
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;
        this.features = features;
        this.images = images;
    }
    isAvailable() {
        return this.isActive;
    }
    calculateDiscount(discountPercent) {
        return this.basePrice * (1 - discountPercent / 100);
    }
}
exports.Service = Service;
//# sourceMappingURL=Service.js.map