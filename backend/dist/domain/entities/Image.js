"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Image = void 0;
class Image {
    constructor(id, entityId, entityType, url, altText = null, displayOrder = 0, isPrimary = false, createdAt, updatedAt) {
        this.id = id;
        this.entityId = entityId;
        this.entityType = entityType;
        this.url = url;
        this.altText = altText;
        this.displayOrder = displayOrder;
        this.isPrimary = isPrimary;
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;
    }
    isForEntity(entityId, entityType) {
        return this.entityId === entityId && this.entityType === entityType;
    }
    static createPrimary(id, entityId, entityType, url, altText) {
        return new Image(id, entityId, entityType, url, altText || null, 0, true);
    }
}
exports.Image = Image;
//# sourceMappingURL=Image.js.map