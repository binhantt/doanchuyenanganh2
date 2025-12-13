import { GalleryAlbum } from '../entities/GalleryAlbum';

export interface IAlbumRepository {
  findAll(filters?: {
    isActive?: boolean;
  }): Promise<GalleryAlbum[]>;
  findById(id: string): Promise<GalleryAlbum | null>;
  create(album: Omit<GalleryAlbum, 'id' | 'createdAt' | 'updatedAt'>): Promise<GalleryAlbum>;
  update(id: string, album: Partial<GalleryAlbum>): Promise<GalleryAlbum | null>;
  delete(id: string): Promise<boolean>;
  countImages(albumId: string): Promise<number>;
}


