import { Gallery } from '../entities/Gallery';

export interface IGalleryRepository {
  findAll(filters?: {
    category?: string;
    albumId?: string;
    relatedId?: string;
    relatedType?: string;
    isActive?: boolean;
  }): Promise<Gallery[]>;
  findById(id: string): Promise<Gallery | null>;
  findByRelated(relatedId: string, relatedType: string): Promise<Gallery[]>;
  findByAlbum(albumId: string): Promise<Gallery[]>;
  findPrimaryByRelated(relatedId: string, relatedType: string): Promise<Gallery | null>;
  create(gallery: Omit<Gallery, 'id' | 'createdAt' | 'updatedAt'>): Promise<Gallery>;
  update(id: string, gallery: Partial<Gallery>): Promise<Gallery | null>;
  delete(id: string): Promise<boolean>;
  setPrimary(id: string, relatedId: string, relatedType: string): Promise<boolean>;
  updateDisplayOrder(id: string, order: number): Promise<boolean>;
}
