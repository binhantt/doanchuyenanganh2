"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GalleryService = void 0;
class GalleryService {
    constructor(galleryRepository) {
        this.galleryRepository = galleryRepository;
    }
    async getAllGalleries(filters) {
        const galleries = await this.galleryRepository.findAll(filters);
        return galleries.map(this.mapToDTO);
    }
    async getGalleryById(id) {
        const gallery = await this.galleryRepository.findById(id);
        if (!gallery) {
            throw new Error('Gallery not found');
        }
        return this.mapToDTO(gallery);
    }
    async getGalleriesByRelated(relatedId, relatedType) {
        const galleries = await this.galleryRepository.findByRelated(relatedId, relatedType);
        return galleries.map(this.mapToDTO);
    }
    async getPrimaryImage(relatedId, relatedType) {
        const gallery = await this.galleryRepository.findPrimaryByRelated(relatedId, relatedType);
        return gallery ? this.mapToDTO(gallery) : null;
    }
    async createGallery(data) {
        // Validate required fields
        if (!data.title || !data.fileName || !data.fileUrl || !data.mimeType) {
            throw new Error('Missing required fields');
        }
        // Validate file type
        if (!data.mimeType.startsWith('image/')) {
            throw new Error('Only image files are allowed');
        }
        const gallery = await this.galleryRepository.create({
            title: data.title,
            altText: data.altText || null,
            fileName: data.fileName,
            filePath: data.filePath,
            fileUrl: data.fileUrl,
            mimeType: data.mimeType,
            fileSize: data.fileSize,
            width: data.width || null,
            height: data.height || null,
            category: data.category,
            relatedId: data.relatedId || null,
            relatedType: data.relatedType || null,
            displayOrder: data.displayOrder || 0,
            isPrimary: data.isPrimary || false,
            isActive: data.isActive !== undefined ? data.isActive : true,
        });
        return this.mapToDTO(gallery);
    }
    async updateGallery(id, data) {
        const existing = await this.galleryRepository.findById(id);
        if (!existing) {
            throw new Error('Gallery not found');
        }
        const updated = await this.galleryRepository.update(id, data);
        if (!updated) {
            throw new Error('Failed to update gallery');
        }
        return this.mapToDTO(updated);
    }
    async deleteGallery(id) {
        const existing = await this.galleryRepository.findById(id);
        if (!existing) {
            throw new Error('Gallery not found');
        }
        const deleted = await this.galleryRepository.delete(id);
        if (!deleted) {
            throw new Error('Failed to delete gallery');
        }
    }
    async setPrimaryImage(id, relatedId, relatedType) {
        const existing = await this.galleryRepository.findById(id);
        if (!existing) {
            throw new Error('Gallery not found');
        }
        const updated = await this.galleryRepository.setPrimary(id, relatedId, relatedType);
        if (!updated) {
            throw new Error('Failed to set primary image');
        }
    }
    async updateDisplayOrder(id, order) {
        const existing = await this.galleryRepository.findById(id);
        if (!existing) {
            throw new Error('Gallery not found');
        }
        if (order < 0) {
            throw new Error('Display order must be non-negative');
        }
        const updated = await this.galleryRepository.updateDisplayOrder(id, order);
        if (!updated) {
            throw new Error('Failed to update display order');
        }
    }
    mapToDTO(gallery) {
        return {
            id: gallery.id,
            title: gallery.title,
            altText: gallery.altText,
            fileName: gallery.fileName,
            filePath: gallery.filePath,
            fileUrl: gallery.fileUrl,
            mimeType: gallery.mimeType,
            fileSize: gallery.fileSize,
            fileSizeKB: gallery.getFileSizeInKB(),
            fileSizeMB: gallery.getFileSizeInMB(),
            width: gallery.width,
            height: gallery.height,
            dimensions: gallery.getDimensions(),
            category: gallery.category,
            relatedId: gallery.relatedId,
            relatedType: gallery.relatedType,
            displayOrder: gallery.displayOrder,
            isPrimary: gallery.isPrimary,
            isActive: gallery.isActive,
            createdAt: gallery.createdAt,
            updatedAt: gallery.updatedAt,
        };
    }
}
exports.GalleryService = GalleryService;
//# sourceMappingURL=GalleryService.js.map