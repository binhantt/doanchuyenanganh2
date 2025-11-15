import { Request, Response } from 'express';
import { IGalleryService } from '../../application/interfaces/IGalleryService';

export class GalleryController {
  constructor(private galleryService: IGalleryService) {}

  getAllGalleries = async (req: Request, res: Response): Promise<void> => {
    try {
      const { category, relatedId, relatedType, isActive } = req.query;

      const filters: any = {};
      if (category) filters.category = category as string;
      if (relatedId) filters.relatedId = relatedId as string;
      if (relatedType) filters.relatedType = relatedType as string;
      if (isActive !== undefined) filters.isActive = isActive === 'true';

      const galleries = await this.galleryService.getAllGalleries(filters);
      res.json({
        success: true,
        data: galleries,
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: error instanceof Error ? error.message : 'Internal server error',
      });
    }
  };

  getGalleryById = async (req: Request, res: Response): Promise<void> => {
    try {
      const { id } = req.params;
      const gallery = await this.galleryService.getGalleryById(id);
      res.json({
        success: true,
        data: gallery,
      });
    } catch (error) {
      const statusCode = error instanceof Error && error.message === 'Gallery not found' ? 404 : 500;
      res.status(statusCode).json({
        success: false,
        message: error instanceof Error ? error.message : 'Internal server error',
      });
    }
  };

  getGalleriesByRelated = async (req: Request, res: Response): Promise<void> => {
    try {
      const { relatedId, relatedType } = req.params;
      const galleries = await this.galleryService.getGalleriesByRelated(relatedId, relatedType);
      res.json({
        success: true,
        data: galleries,
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: error instanceof Error ? error.message : 'Internal server error',
      });
    }
  };

  getPrimaryImage = async (req: Request, res: Response): Promise<void> => {
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
    } catch (error) {
      res.status(500).json({
        success: false,
        message: error instanceof Error ? error.message : 'Internal server error',
      });
    }
  };

  createGallery = async (req: Request, res: Response): Promise<void> => {
    try {
      const gallery = await this.galleryService.createGallery(req.body);
      res.status(201).json({
        success: true,
        data: gallery,
      });
    } catch (error) {
      const statusCode = error instanceof Error && error.message.includes('required') ? 400 : 500;
      res.status(statusCode).json({
        success: false,
        message: error instanceof Error ? error.message : 'Bad request',
      });
    }
  };

  updateGallery = async (req: Request, res: Response): Promise<void> => {
    try {
      const { id } = req.params;
      const gallery = await this.galleryService.updateGallery(id, req.body);
      res.json({
        success: true,
        data: gallery,
      });
    } catch (error) {
      const statusCode = error instanceof Error && error.message === 'Gallery not found' ? 404 : 400;
      res.status(statusCode).json({
        success: false,
        message: error instanceof Error ? error.message : 'Bad request',
      });
    }
  };

  deleteGallery = async (req: Request, res: Response): Promise<void> => {
    try {
      const { id } = req.params;
      await this.galleryService.deleteGallery(id);
      res.json({
        success: true,
        message: 'Gallery deleted successfully',
      });
    } catch (error) {
      const statusCode = error instanceof Error && error.message === 'Gallery not found' ? 404 : 500;
      res.status(statusCode).json({
        success: false,
        message: error instanceof Error ? error.message : 'Internal server error',
      });
    }
  };

  setPrimaryImage = async (req: Request, res: Response): Promise<void> => {
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
    } catch (error) {
      const statusCode = error instanceof Error && error.message === 'Gallery not found' ? 404 : 400;
      res.status(statusCode).json({
        success: false,
        message: error instanceof Error ? error.message : 'Bad request',
      });
    }
  };

  updateDisplayOrder = async (req: Request, res: Response): Promise<void> => {
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
    } catch (error) {
      const statusCode = error instanceof Error && error.message === 'Gallery not found' ? 404 : 400;
      res.status(statusCode).json({
        success: false,
        message: error instanceof Error ? error.message : 'Bad request',
      });
    }
  };
}
