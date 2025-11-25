"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ServiceService = void 0;
const Service_1 = require("../../domain/entities/Service");
const Image_1 = require("../../domain/entities/Image");
const Feature_1 = require("../../domain/entities/Feature");
const uuid_1 = require("uuid");
class ServiceService {
    constructor(serviceRepository, imageRepository, featureRepository, galleryRepository) {
        this.serviceRepository = serviceRepository;
        this.imageRepository = imageRepository;
        this.featureRepository = featureRepository;
        this.galleryRepository = galleryRepository;
    }
    async getAllServices(onlyActive = false, filters) {
        let services;
        if (onlyActive) {
            services = await this.serviceRepository.findActive();
        }
        else {
            services = await this.serviceRepository.findAll();
        }
        // Apply keyword filter
        if (filters?.keyword) {
            const keyword = filters.keyword.toLowerCase();
            services = services.filter(service => service.name.toLowerCase().includes(keyword) ||
                service.slug.toLowerCase().includes(keyword) ||
                (service.description && service.description.toLowerCase().includes(keyword)));
        }
        // Apply sorting
        if (filters?.sortBy) {
            const sortBy = filters.sortBy;
            const sortOrder = filters.sortOrder || 'asc';
            services.sort((a, b) => {
                const aVal = a[sortBy];
                const bVal = b[sortBy];
                if (aVal === null || aVal === undefined)
                    return 1;
                if (bVal === null || bVal === undefined)
                    return -1;
                if (typeof aVal === 'string' && typeof bVal === 'string') {
                    return sortOrder === 'asc'
                        ? aVal.localeCompare(bVal)
                        : bVal.localeCompare(aVal);
                }
                return sortOrder === 'asc'
                    ? (aVal > bVal ? 1 : -1)
                    : (bVal > aVal ? 1 : -1);
            });
        }
        return services;
    }
    async getServiceById(id) {
        return await this.serviceRepository.findById(id);
    }
    async getServiceBySlug(slug) {
        return await this.serviceRepository.findBySlug(slug);
    }
    async createService(data) {
        if (data.basePrice < 0) {
            throw new Error('Base price must be non-negative');
        }
        // Validate features - check for non-empty values
        const hasIncludedFeatures = data.features &&
            data.features.included &&
            data.features.included.some(f => f && f.trim().length > 0);
        if (!hasIncludedFeatures) {
            throw new Error('Service must have at least one included feature');
        }
        const existing = await this.serviceRepository.findBySlug(data.slug);
        if (existing) {
            throw new Error(`Service with slug "${data.slug}" already exists`);
        }
        const serviceId = (0, uuid_1.v4)();
        const service = new Service_1.Service(serviceId, data.name, data.slug, data.shortDescription, data.fullDescription, data.icon, data.basePrice, data.isActive ?? true);
        await this.serviceRepository.create(service);
        // Save features
        await this.saveFeatures(serviceId, data.features);
        // Save images
        if (data.images && data.images.length > 0) {
            await this.saveImages(serviceId, data.images);
        }
        return this.serviceRepository.findById(serviceId);
    }
    async updateService(id, data) {
        const existing = await this.serviceRepository.findById(id);
        if (!existing) {
            return null;
        }
        if (data.basePrice !== undefined && data.basePrice < 0) {
            throw new Error('Base price must be non-negative');
        }
        // Validate features only if provided and check for non-empty values
        if (data.features !== undefined) {
            const hasIncludedFeatures = data.features.included &&
                data.features.included.some(f => f && f.trim().length > 0);
            if (!hasIncludedFeatures) {
                throw new Error('Service must have at least one included feature');
            }
        }
        if (data.slug && data.slug !== existing.slug) {
            const slugExists = await this.serviceRepository.findBySlug(data.slug);
            if (slugExists) {
                throw new Error(`Service with slug "${data.slug}" already exists`);
            }
        }
        // Update basic service info
        await this.serviceRepository.update(id, data);
        // Update features if provided
        if (data.features) {
            await this.featureRepository.deleteByEntity(id, 'service');
            await this.saveFeatures(id, data.features);
        }
        // Update images if provided
        if (data.images !== undefined) {
            await this.imageRepository.deleteByEntity(id, 'service');
            if (data.images.length > 0) {
                await this.saveImages(id, data.images);
            }
        }
        return this.serviceRepository.findById(id);
    }
    async deleteService(id) {
        const existing = await this.serviceRepository.findById(id);
        if (!existing) {
            return false;
        }
        return await this.serviceRepository.delete(id);
    }
    async addImage(serviceId, imageData) {
        const service = await this.serviceRepository.findById(serviceId);
        if (!service) {
            throw new Error('Service not found');
        }
        // Get current images count for display order
        const currentImages = await this.imageRepository.findByEntity(serviceId, 'service');
        const displayOrder = imageData.displayOrder ?? currentImages.length;
        const image = new Image_1.Image((0, uuid_1.v4)(), serviceId, 'service', imageData.imageUrl, imageData.altText || null, displayOrder, imageData.isPrimary || false);
        return await this.imageRepository.create(image);
    }
    async removeImage(serviceId, imageId) {
        const service = await this.serviceRepository.findById(serviceId);
        if (!service) {
            throw new Error('Service not found');
        }
        return await this.imageRepository.delete(imageId);
    }
    async getImages(serviceId) {
        const service = await this.serviceRepository.findById(serviceId);
        if (!service) {
            throw new Error('Service not found');
        }
        return await this.imageRepository.findByEntity(serviceId, 'service');
    }
    async saveFeatures(serviceId, features) {
        const featureEntities = [];
        let order = 0;
        // Save included features
        if (features.included && features.included.length > 0) {
            for (const text of features.included) {
                if (text && text.trim()) {
                    featureEntities.push(new Feature_1.Feature((0, uuid_1.v4)(), serviceId, 'service', 'included', text.trim(), order++));
                }
            }
        }
        // Save excluded features
        if (features.excluded && features.excluded.length > 0) {
            for (const text of features.excluded) {
                if (text && text.trim()) {
                    featureEntities.push(new Feature_1.Feature((0, uuid_1.v4)(), serviceId, 'service', 'excluded', text.trim(), order++));
                }
            }
        }
        // Save highlights
        if (features.highlights && features.highlights.length > 0) {
            for (const text of features.highlights) {
                if (text && text.trim()) {
                    featureEntities.push(new Feature_1.Feature((0, uuid_1.v4)(), serviceId, 'service', 'highlight', text.trim(), order++));
                }
            }
        }
        if (featureEntities.length > 0) {
            await this.featureRepository.createMany(featureEntities);
        }
    }
    async saveImages(serviceId, images) {
        const imageEntities = [];
        for (let i = 0; i < images.length; i++) {
            const url = images[i];
            if (url && url.trim()) {
                imageEntities.push(new Image_1.Image((0, uuid_1.v4)(), serviceId, 'service', url.trim(), null, i, i === 0 // First image is primary
                ));
            }
        }
        if (imageEntities.length > 0) {
            await this.imageRepository.createMany(imageEntities);
        }
    }
}
exports.ServiceService = ServiceService;
//# sourceMappingURL=ServiceService.js.map