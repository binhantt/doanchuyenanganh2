import { Request, Response } from 'express';
import { IGalleryService } from '../../application/interfaces/IGalleryService';
import { IAlbumService } from '../../application/interfaces/IAlbumService';

export class GalleryController {
  constructor(
    private galleryService: IGalleryService,
    private albumService?: IAlbumService
  ) {}

  getAllGalleries = async (req: Request, res: Response): Promise<void> => {
    try {
      const { keyword, category, albumId, relatedId, relatedType, isActive, sortBy, sortOrder } = req.query;

      const filters: any = {};
      if (keyword) filters.keyword = keyword as string;
      if (category) filters.category = category as string;
      if (albumId) filters.albumId = albumId as string;
      if (relatedId) filters.relatedId = relatedId as string;
      if (relatedType) filters.relatedType = relatedType as string;
      if (isActive !== undefined) filters.isActive = isActive === 'true';
      if (sortBy) filters.sortBy = sortBy as string;
      if (sortOrder) filters.sortOrder = sortOrder as 'asc' | 'desc';

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

  // Album methods
  getAllAlbums = async (req: Request, res: Response): Promise<void> => {
    try {
      if (!this.albumService) {
        res.status(501).json({
          success: false,
          message: 'Album service not available',
        });
        return;
      }

      const { isActive } = req.query;
      const filters: any = {};
      if (isActive !== undefined) filters.isActive = isActive === 'true';

      const albums = await this.albumService.getAllAlbums(filters);
      res.json({
        success: true,
        data: albums,
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: error instanceof Error ? error.message : 'Internal server error',
      });
    }
  };

  getAlbumById = async (req: Request, res: Response): Promise<void> => {
    try {
      if (!this.albumService) {
        res.status(501).json({
          success: false,
          message: 'Album service not available',
        });
        return;
      }

      const { id } = req.params;
      const album = await this.albumService.getAlbumById(id);
      res.json({
        success: true,
        data: album,
      });
    } catch (error) {
      const statusCode = error instanceof Error && error.message === 'Album not found' ? 404 : 500;
      res.status(statusCode).json({
        success: false,
        message: error instanceof Error ? error.message : 'Internal server error',
      });
    }
  };

  getImagesByAlbum = async (req: Request, res: Response): Promise<void> => {
    try {
      if (!this.albumService) {
        res.status(501).json({
          success: false,
          message: 'Album service not available',
        });
        return;
      }

      const albumId = req.params.albumId || req.params.id;
      const images = await this.albumService.getImagesByAlbum(albumId);
      res.json({
        success: true,
        data: images,
      });
    } catch (error) {
      const statusCode = error instanceof Error && error.message === 'Album not found' ? 404 : 500;
      res.status(statusCode).json({
        success: false,
        message: error instanceof Error ? error.message : 'Internal server error',
      });
    }
  };

  createAlbum = async (req: Request, res: Response): Promise<void> => {
    try {
      if (!this.albumService) {
        res.status(501).json({
          success: false,
          message: 'Album service not available',
        });
        return;
      }

      const album = await this.albumService.createAlbum(req.body);
      res.status(201).json({
        success: true,
        data: album,
      });
    } catch (error) {
      const statusCode = error instanceof Error && error.message.includes('required') ? 400 : 500;
      res.status(statusCode).json({
        success: false,
        message: error instanceof Error ? error.message : 'Bad request',
      });
    }
  };

  updateAlbum = async (req: Request, res: Response): Promise<void> => {
    try {
      if (!this.albumService) {
        res.status(501).json({
          success: false,
          message: 'Album service not available',
        });
        return;
      }

      const { id } = req.params;
      const album = await this.albumService.updateAlbum(id, req.body);
      res.json({
        success: true,
        data: album,
      });
    } catch (error) {
      const statusCode = error instanceof Error && error.message === 'Album not found' ? 404 : 400;
      res.status(statusCode).json({
        success: false,
        message: error instanceof Error ? error.message : 'Bad request',
      });
    }
  };

  deleteAlbum = async (req: Request, res: Response): Promise<void> => {
    try {
      if (!this.albumService) {
        res.status(501).json({
          success: false,
          message: 'Album service not available',
        });
        return;
      }

      const { id } = req.params;
      await this.albumService.deleteAlbum(id);
      res.json({
        success: true,
        message: 'Album deleted successfully',
      });
    } catch (error) {
      const statusCode = error instanceof Error && error.message === 'Album not found' ? 404 : 500;
      res.status(statusCode).json({
        success: false,
        message: error instanceof Error ? error.message : 'Internal server error',
      });
    }
  };
}
