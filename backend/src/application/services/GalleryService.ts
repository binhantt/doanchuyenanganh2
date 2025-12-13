import { IGalleryService } from '../interfaces/IGalleryService';
import { IGalleryRepository } from '../../domain/repositories/IGalleryRepository';
import { CreateGalleryDTO, UpdateGalleryDTO, GalleryResponseDTO } from '../dto/GalleryDTO';
import { Gallery } from '../../domain/entities/Gallery';

export class GalleryService implements IGalleryService {
  constructor(private galleryRepository: IGalleryRepository) {}

  async getAllGalleries(filters?: {
    category?: string;
    albumId?: string;
    relatedId?: string;
    relatedType?: string;
    isActive?: boolean;
  }): Promise<GalleryResponseDTO[]> {
    const galleries = await this.galleryRepository.findAll(filters);
    return galleries.map(this.mapToDTO);
  }

  async getGalleryById(id: string): Promise<GalleryResponseDTO> {
    const gallery = await this.galleryRepository.findById(id);
    if (!gallery) {
      throw new Error('Gallery not found');
    }
    return this.mapToDTO(gallery);
  }

  async getGalleriesByRelated(relatedId: string, relatedType: string): Promise<GalleryResponseDTO[]> {
    const galleries = await this.galleryRepository.findByRelated(relatedId, relatedType);
    return galleries.map(this.mapToDTO);
  }

  async getPrimaryImage(relatedId: string, relatedType: string): Promise<GalleryResponseDTO | null> {
    const gallery = await this.galleryRepository.findPrimaryByRelated(relatedId, relatedType);
    return gallery ? this.mapToDTO(gallery) : null;
  }

  async createGallery(data: CreateGalleryDTO): Promise<GalleryResponseDTO> {
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
      albumId: (data as any).albumId || null,
      relatedId: data.relatedId || null,
      relatedType: data.relatedType || null,
      displayOrder: data.displayOrder || 0,
      isPrimary: data.isPrimary || false,
      isActive: data.isActive !== undefined ? data.isActive : true,
    });

    return this.mapToDTO(gallery);
  }

  async updateGallery(id: string, data: UpdateGalleryDTO): Promise<GalleryResponseDTO> {
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

  async deleteGallery(id: string): Promise<void> {
    const existing = await this.galleryRepository.findById(id);
    if (!existing) {
      throw new Error('Gallery not found');
    }

    const deleted = await this.galleryRepository.delete(id);
    if (!deleted) {
      throw new Error('Failed to delete gallery');
    }
  }

  async setPrimaryImage(id: string, relatedId: string, relatedType: string): Promise<void> {
    const existing = await this.galleryRepository.findById(id);
    if (!existing) {
      throw new Error('Gallery not found');
    }

    const updated = await this.galleryRepository.setPrimary(id, relatedId, relatedType);
    if (!updated) {
      throw new Error('Failed to set primary image');
    }
  }

  async updateDisplayOrder(id: string, order: number): Promise<void> {
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

  private mapToDTO(gallery: Gallery): GalleryResponseDTO {
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
      albumId: gallery.albumId,
      relatedId: gallery.relatedId,
      relatedType: gallery.relatedType,
      displayOrder: gallery.displayOrder,
      isPrimary: gallery.isPrimary,
      isActive: gallery.isActive,
      createdAt: gallery.createdAt!,
      updatedAt: gallery.updatedAt!,
    };
  }
}
