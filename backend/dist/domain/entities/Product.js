"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Product = void 0;
class Product {
    constructor(id, name, slug, description, price, category, categoryId, material, features, images, stockQuantity, isFeatured = false, isActive = true, createdAt, updatedAt) {
        this.id = id;
        this.name = name;
        this.slug = slug;
        this.description = description;
        this.price = price;
        this.category = category;
        this.categoryId = categoryId;
        this.material = material;
        this.features = features;
        this.images = images;
        this.stockQuantity = stockQuantity;
        this.isFeatured = isFeatured;
        this.isActive = isActive;
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;
    }
    isAvailable() {
        return this.isActive && this.stockQuantity > 0;
    }
    calculateDiscount(discountPercent) {
        return this.price * (1 - discountPercent / 100);
    }
}
exports.Product = Product;
//# sourceMappingURL=Product.js.map