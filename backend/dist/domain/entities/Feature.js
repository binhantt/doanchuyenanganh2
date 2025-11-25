"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Feature = void 0;
class Feature {
    constructor(id, entityId, entityType, featureText, featureType, displayOrder = 0, createdAt, updatedAt) {
        this.id = id;
        this.entityId = entityId;
        this.entityType = entityType;
        this.featureText = featureText;
        this.featureType = featureType;
        this.displayOrder = displayOrder;
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;
    }
    isForEntity(entityId, entityType) {
        return this.entityId === entityId && this.entityType === entityType;
    }
    isIncluded() {
        return this.featureType === 'included';
    }
    isExcluded() {
        return this.featureType === 'excluded';
    }
    isHighlight() {
        return this.featureType === 'highlight';
    }
}
exports.Feature = Feature;
//# sourceMappingURL=Feature.js.map