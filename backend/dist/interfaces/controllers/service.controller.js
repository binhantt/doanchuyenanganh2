"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ServiceController = void 0;
class ServiceController {
    constructor(serviceService) {
        this.serviceService = serviceService;
    }
    async list(req, res) {
        try {
            const { keyword, isActive, sortBy, sortOrder } = req.query;
            const services = await this.serviceService.getAllServices(isActive === 'true', {
                keyword: keyword,
                sortBy: sortBy,
                sortOrder: sortOrder,
            });
            return res.status(200).json({
                success: true,
                data: services,
                count: services.length,
            });
        }
        catch (error) {
            return res.status(500).json({
                success: false,
                message: error instanceof Error ? error.message : 'Internal server error',
            });
        }
    }
    async getById(req, res) {
        try {
            const { id } = req.params;
            const service = await this.serviceService.getServiceById(id);
            if (!service) {
                return res.status(404).json({
                    success: false,
                    message: 'Service not found',
                });
            }
            return res.status(200).json({
                success: true,
                data: service,
            });
        }
        catch (error) {
            return res.status(500).json({
                success: false,
                message: error instanceof Error ? error.message : 'Internal server error',
            });
        }
    }
    async getBySlug(req, res) {
        try {
            const { slug } = req.params;
            const service = await this.serviceService.getServiceBySlug(slug);
            if (!service) {
                return res.status(404).json({
                    success: false,
                    message: 'Service not found',
                });
            }
            return res.status(200).json({
                success: true,
                data: service,
            });
        }
        catch (error) {
            return res.status(500).json({
                success: false,
                message: error instanceof Error ? error.message : 'Internal server error',
            });
        }
    }
    async create(req, res) {
        try {
            const input = req.body;
            const service = await this.serviceService.createService(input);
            return res.status(201).json({
                success: true,
                data: service,
                message: 'Service created successfully',
            });
        }
        catch (error) {
            return res.status(500).json({
                success: false,
                message: error instanceof Error ? error.message : 'Internal server error',
            });
        }
    }
    async update(req, res) {
        try {
            const { id } = req.params;
            const input = req.body;
            const service = await this.serviceService.updateService(id, input);
            if (!service) {
                return res.status(404).json({
                    success: false,
                    message: 'Service not found',
                });
            }
            return res.status(200).json({
                success: true,
                data: service,
                message: 'Service updated successfully',
            });
        }
        catch (error) {
            return res.status(500).json({
                success: false,
                message: error instanceof Error ? error.message : 'Internal server error',
            });
        }
    }
    async delete(req, res) {
        try {
            const { id } = req.params;
            const deleted = await this.serviceService.deleteService(id);
            if (!deleted) {
                return res.status(404).json({
                    success: false,
                    message: 'Service not found',
                });
            }
            return res.status(200).json({
                success: true,
                message: 'Service deleted successfully',
            });
        }
        catch (error) {
            return res.status(500).json({
                success: false,
                message: error instanceof Error ? error.message : 'Internal server error',
            });
        }
    }
    async addImage(req, res) {
        try {
            const { id } = req.params;
            const { imageUrl, altText, caption, isPrimary, displayOrder } = req.body;
            if (!imageUrl) {
                return res.status(400).json({
                    success: false,
                    message: 'imageUrl is required',
                });
            }
            const service = await this.serviceService.getServiceById(id);
            if (!service) {
                return res.status(404).json({
                    success: false,
                    message: 'Service not found',
                });
            }
            const imageData = {
                imageUrl,
                altText: altText || service.name,
                caption: caption || '',
                relatedType: 'service',
                relatedId: id,
                isPrimary: isPrimary || false,
                displayOrder: displayOrder || 0,
                isActive: true,
            };
            const image = await this.serviceService.addImage(id, imageData);
            return res.status(201).json({
                success: true,
                data: image,
                message: 'Image added successfully',
            });
        }
        catch (error) {
            return res.status(500).json({
                success: false,
                message: error instanceof Error ? error.message : 'Internal server error',
            });
        }
    }
    async removeImage(req, res) {
        try {
            const { id, imageId } = req.params;
            const service = await this.serviceService.getServiceById(id);
            if (!service) {
                return res.status(404).json({
                    success: false,
                    message: 'Service not found',
                });
            }
            const deleted = await this.serviceService.removeImage(id, imageId);
            if (!deleted) {
                return res.status(404).json({
                    success: false,
                    message: 'Image not found',
                });
            }
            return res.status(200).json({
                success: true,
                message: 'Image removed successfully',
            });
        }
        catch (error) {
            return res.status(500).json({
                success: false,
                message: error instanceof Error ? error.message : 'Internal server error',
            });
        }
    }
    async getImages(req, res) {
        try {
            const { id } = req.params;
            const service = await this.serviceService.getServiceById(id);
            if (!service) {
                return res.status(404).json({
                    success: false,
                    message: 'Service not found',
                });
            }
            const images = await this.serviceService.getImages(id);
            return res.status(200).json({
                success: true,
                data: images,
                count: images.length,
            });
        }
        catch (error) {
            return res.status(500).json({
                success: false,
                message: error instanceof Error ? error.message : 'Internal server error',
            });
        }
    }
}
exports.ServiceController = ServiceController;
//# sourceMappingURL=service.controller.js.map