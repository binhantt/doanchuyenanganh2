"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GalleryController = void 0;
class GalleryController {
    constructor(galleryService) {
        this.galleryService = galleryService;
        this.getAllGalleries = async (req, res) => {
            try {
                const { keyword, category, relatedId, relatedType, isActive, sortBy, sortOrder } = req.query;
                const filters = {};
                if (keyword)
                    filters.keyword = keyword;
                if (category)
                    filters.category = category;
                if (relatedId)
                    filters.relatedId = relatedId;
                if (relatedType)
                    filters.relatedType = relatedType;
                if (isActive !== undefined)
                    filters.isActive = isActive === 'true';
                if (sortBy)
                    filters.sortBy = sortBy;
                if (sortOrder)
                    filters.sortOrder = sortOrder;
                const galleries = await this.galleryService.getAllGalleries(filters);
                res.json({
                    success: true,
                    data: galleries,
                });
            }
            catch (error) {
                res.status(500).json({
                    success: false,
                    message: error instanceof Error ? error.message : 'Internal server error',
                });
            }
        };
        this.getGalleryById = async (req, res) => {
            try {
                const { id } = req.params;
                const gallery = await this.galleryService.getGalleryById(id);
                res.json({
                    success: true,
                    data: gallery,
                });
            }
            catch (error) {
                const statusCode = error instanceof Error && error.message === 'Gallery not found' ? 404 : 500;
                res.status(statusCode).json({
                    success: false,
                    message: error instanceof Error ? error.message : 'Internal server error',
                });
            }
        };
        this.getGalleriesByRelated = async (req, res) => {
            try {
                const { relatedId, relatedType } = req.params;
                const galleries = await this.galleryService.getGalleriesByRelated(relatedId, relatedType);
                res.json({
                    success: true,
                    data: galleries,
                });
            }
            catch (error) {
                res.status(500).json({
                    success: false,
                    message: error instanceof Error ? error.message : 'Internal server error',
                });
            }
        };
        this.getPrimaryImage = async (req, res) => {
            try {
                const { relatedId, relatedType } = req.params;
                const gallery = await this.galleryService.getPrimaryImage(relatedId, relatedType);
                if (!gallery) {
                    res.status(404).json({
                        success: false,
                        message: 'No primary image found',
                    });
                    return;
                }
                res.json({
                    success: true,
                    data: gallery,
                });
            }
            catch (error) {
                res.status(500).json({
                    success: false,
                    message: error instanceof Error ? error.message : 'Internal server error',
                });
            }
        };
        this.createGallery = async (req, res) => {
            try {
                const gallery = await this.galleryService.createGallery(req.body);
                res.status(201).json({
                    success: true,
                    data: gallery,
                });
            }
            catch (error) {
                const statusCode = error instanceof Error && error.message.includes('required') ? 400 : 500;
                res.status(statusCode).json({
                    success: false,
                    message: error instanceof Error ? error.message : 'Bad request',
                });
            }
        };
        this.updateGallery = async (req, res) => {
            try {
                const { id } = req.params;
                const gallery = await this.galleryService.updateGallery(id, req.body);
                res.json({
                    success: true,
                    data: gallery,
                });
            }
            catch (error) {
                const statusCode = error instanceof Error && error.message === 'Gallery not found' ? 404 : 400;
                res.status(statusCode).json({
                    success: false,
                    message: error instanceof Error ? error.message : 'Bad request',
                });
            }
        };
        this.deleteGallery = async (req, res) => {
            try {
                const { id } = req.params;
                await this.galleryService.deleteGallery(id);
                res.json({
                    success: true,
                    message: 'Gallery deleted successfully',
                });
            }
            catch (error) {
                const statusCode = error instanceof Error && error.message === 'Gallery not found' ? 404 : 500;
                res.status(statusCode).json({
                    success: false,
                    message: error instanceof Error ? error.message : 'Internal server error',
                });
            }
        };
        this.setPrimaryImage = async (req, res) => {
            try {
                const { id } = req.params;
                const { relatedId, relatedType } = req.body;
                if (!relatedId || !relatedType) {
                    res.status(400).json({
                        success: false,
                        message: 'relatedId and relatedType are required',
                    });
                    return;
                }
                await this.galleryService.setPrimaryImage(id, relatedId, relatedType);
                res.json({
                    success: true,
                    message: 'Primary image set successfully',
                });
            }
            catch (error) {
                const statusCode = error instanceof Error && error.message === 'Gallery not found' ? 404 : 400;
                res.status(statusCode).json({
                    success: false,
                    message: error instanceof Error ? error.message : 'Bad request',
                });
            }
        };
        this.updateDisplayOrder = async (req, res) => {
            try {
                const { id } = req.params;
                const { order } = req.body;
                if (order === undefined || typeof order !== 'number') {
                    res.status(400).json({
                        success: false,
                        message: 'Order is required and must be a number',
                    });
                    return;
                }
                await this.galleryService.updateDisplayOrder(id, order);
                res.json({
                    success: true,
                    message: 'Display order updated successfully',
                });
            }
            catch (error) {
                const statusCode = error instanceof Error && error.message === 'Gallery not found' ? 404 : 400;
                res.status(statusCode).json({
                    success: false,
                    message: error instanceof Error ? error.message : 'Bad request',
                });
            }
        };
    }
}
exports.GalleryController = GalleryController;
//# sourceMappingURL=gallery.controller.js.map