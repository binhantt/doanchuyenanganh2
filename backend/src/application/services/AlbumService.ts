import { IAlbumService } from '../interfaces/IAlbumService';
import { IAlbumRepository } from '../../domain/repositories/IAlbumRepository';
import { IGalleryRepository } from '../../domain/repositories/IGalleryRepository';
import { CreateAlbumDTO, UpdateAlbumDTO, AlbumResponseDTO } from '../dto/AlbumDTO';
import { GalleryAlbum } from '../../domain/entities/GalleryAlbum';

export class AlbumService implements IAlbumService {
  constructor(
    private albumRepository: IAlbumRepository,
    private galleryRepository: IGalleryRepository
  ) {}

  async getAllAlbums(filters?: {
    isActive?: boolean;
  }): Promise<AlbumResponseDTO[]> {
    const albums = await this.albumRepository.findAll(filters);
    
    // Get image counts and cover images for each album
    const albumsWithDetails = await Promise.all(
      albums.map(async (album) => {
        const imageCount = await this.albumRepository.countImages(album.id);
        let coverImageUrl: string | null = null;
        
        if (album.coverImageId) {
          const coverImage = await this.galleryRepository.findById(album.coverImageId);
          coverImageUrl = coverImage?.fileUrl || null;
        }
        
        return this.mapToDTO(album, imageCount, coverImageUrl);
      })
    );
    
    return albumsWithDetails;
  }

  async getAlbumById(id: string): Promise<AlbumResponseDTO> {
    const album = await this.albumRepository.findById(id);
    if (!album) {
      throw new Error('Album not found');
    }
    
    const imageCount = await this.albumRepository.countImages(id);
    let coverImageUrl: string | null = null;
    
    if (album.coverImageId) {
      const coverImage = await this.galleryRepository.findById(album.coverImageId);
      coverImageUrl = coverImage?.fileUrl || null;
    }
    
    // Get images in this album
    const albumImages = await this.galleryRepository.findByAlbum(id);
    
    const dto = this.mapToDTO(album, imageCount, coverImageUrl);
    // Optionally include images in response
    return dto;
  }

  async getImagesByAlbum(albumId: string): Promise<any[]> {
    const album = await this.albumRepository.findById(albumId);
    if (!album) {
      throw new Error('Album not found');
    }
    
    // Get images by album using the new findByAlbum method
    const albumImages = await this.galleryRepository.findByAlbum(albumId);
    
    // Map to response format
    return albumImages.map((img) => ({
      id: img.id,
      title: img.title,
      altText: img.altText,
      fileUrl: img.fileUrl,
      fileName: img.fileName,
      filePath: img.filePath,
      mimeType: img.mimeType,
      fileSize: img.fileSize,
      width: img.width,
      height: img.height,
      category: img.category,
      albumId: img.albumId,
      displayOrder: img.displayOrder,
      isPrimary: img.isPrimary,
      isActive: img.isActive,
      createdAt: img.createdAt,
      updatedAt: img.updatedAt,
    }));
  }

  async createAlbum(data: CreateAlbumDTO): Promise<AlbumResponseDTO> {
    if (!data.name) {
      throw new Error('Name is required');
    }

    // Validate cover image if provided
    if (data.coverImageId) {
      const coverImage = await this.galleryRepository.findById(data.coverImageId);
      if (!coverImage) {
        throw new Error('Cover image not found');
      }
    }

    const album = await this.albumRepository.create({
      name: data.name,
      description: data.description || null,
      coverImageId: data.coverImageId || null,
      displayOrder: data.displayOrder || 0,
      isActive: data.isActive !== undefined ? data.isActive : true,
    });

    const imageCount = await this.albumRepository.countImages(album.id);
    let coverImageUrl: string | null = null;
    
    if (album.coverImageId) {
      const coverImage = await this.galleryRepository.findById(album.coverImageId);
      coverImageUrl = coverImage?.fileUrl || null;
    }

    return this.mapToDTO(album, imageCount, coverImageUrl);
  }

  async updateAlbum(id: string, data: UpdateAlbumDTO): Promise<AlbumResponseDTO> {
    const existing = await this.albumRepository.findById(id);
    if (!existing) {
      throw new Error('Album not found');
    }

    // Validate cover image if provided
    if (data.coverImageId) {
      const coverImage = await this.galleryRepository.findById(data.coverImageId);
      if (!coverImage) {
        throw new Error('Cover image not found');
      }
    }

    const updated = await this.albumRepository.update(id, {
      name: data.name,
      description: data.description,
      coverImageId: data.coverImageId,
      displayOrder: data.displayOrder,
      isActive: data.isActive,
    });

    if (!updated) {
      throw new Error('Failed to update album');
    }

    const imageCount = await this.albumRepository.countImages(id);
    let coverImageUrl: string | null = null;
    
    if (updated.coverImageId) {
      const coverImage = await this.galleryRepository.findById(updated.coverImageId);
      coverImageUrl = coverImage?.fileUrl || null;
    }

    return this.mapToDTO(updated, imageCount, coverImageUrl);
  }

  async deleteAlbum(id: string): Promise<void> {
    const existing = await this.albumRepository.findById(id);
    if (!existing) {
      throw new Error('Album not found');
    }

    const deleted = await this.albumRepository.delete(id);
    if (!deleted) {
      throw new Error('Failed to delete album');
    }
  }

  private mapToDTO(
    album: GalleryAlbum,
    imageCount: number,
    coverImageUrl: string | null
  ): AlbumResponseDTO {
    return {
      id: album.id,
      name: album.name,
      description: album.description,
      coverImageId: album.coverImageId,
      coverImageUrl,
      imageCount,
      displayOrder: album.displayOrder,
      isActive: album.isActive,
      createdAt: album.createdAt!,
      updatedAt: album.updatedAt!,
    };
  }
}

