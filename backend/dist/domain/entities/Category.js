"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Category = void 0;
class Category {
    constructor(id, name, slug, description, isActive = true, createdAt, updatedAt) {
        this.id = id;
        this.name = name;
        this.slug = slug;
        this.description = description;
        this.isActive = isActive;
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;
    }
    isAvailable() {
        return this.isActive;
    }
}
exports.Category = Category;
//# sourceMappingURL=Category.js.map