"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Package = void 0;
class Package {
    constructor(id, name, slug, description, price, features, images = [], isPopular = false, isActive = true, createdAt, updatedAt) {
        this.id = id;
        this.name = name;
        this.slug = slug;
        this.description = description;
        this.price = price;
        this.features = features;
        this.images = images;
        this.isPopular = isPopular;
        this.isActive = isActive;
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;
    }
    isAvailable() {
        return this.isActive;
    }
    calculateDiscount(discountPercent) {
        return this.price * (1 - discountPercent / 100);
    }
}
exports.Package = Package;
//# sourceMappingURL=Package.js.map