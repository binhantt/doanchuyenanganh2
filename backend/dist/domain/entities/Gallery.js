"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Gallery = void 0;
class Gallery {
    constructor(id, title, altText, fileName, filePath, fileUrl, mimeType, fileSize, width, height, category, relatedId, relatedType, displayOrder = 0, isPrimary = false, isActive = true, createdAt, updatedAt) {
        this.id = id;
        this.title = title;
        this.altText = altText;
        this.fileName = fileName;
        this.filePath = filePath;
        this.fileUrl = fileUrl;
        this.mimeType = mimeType;
        this.fileSize = fileSize;
        this.width = width;
        this.height = height;
        this.category = category;
        this.relatedId = relatedId;
        this.relatedType = relatedType;
        this.displayOrder = displayOrder;
        this.isPrimary = isPrimary;
        this.isActive = isActive;
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;
    }
    isImage() {
        return this.mimeType.startsWith('image/');
    }
    getFileExtension() {
        return this.fileName.split('.').pop() || '';
    }
    getFileSizeInKB() {
        return Math.round(this.fileSize / 1024);
    }
    getFileSizeInMB() {
        return Math.round((this.fileSize / 1024 / 1024) * 100) / 100;
    }
    getDimensions() {
        if (this.width && this.height) {
            return `${this.width}x${this.height}`;
        }
        return null;
    }
}
exports.Gallery = Gallery;
//# sourceMappingURL=Gallery.js.map