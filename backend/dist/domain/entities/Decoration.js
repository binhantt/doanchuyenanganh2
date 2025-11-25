"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Decoration = void 0;
class Decoration {
    constructor(id, name, slug, description, theme, style, basePrice, features, images, isActive = true, createdAt, updatedAt) {
        this.id = id;
        this.name = name;
        this.slug = slug;
        this.description = description;
        this.theme = theme;
        this.style = style;
        this.basePrice = basePrice;
        this.features = features;
        this.images = images;
        this.isActive = isActive;
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;
    }
    isAvailable() {
        return this.isActive;
    }
    hasFeature(feature) {
        return this.features.includes(feature);
    }
    calculatePrice(quantity = 1) {
        return this.basePrice * quantity;
    }
}
exports.Decoration = Decoration;
//# sourceMappingURL=Decoration.js.map