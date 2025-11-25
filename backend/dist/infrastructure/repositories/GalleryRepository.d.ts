import { IGalleryRepository } from '../../domain/repositories/IGalleryRepository';
import { Gallery } from '../../domain/entities/Gallery';
export declare class GalleryRepository implements IGalleryRepository {
    private readonly tableName;
    findAll(filters?: {
        keyword?: string;
        category?: string;
        relatedId?: string;
        relatedType?: string;
        isActive?: boolean;
        sortBy?: string;
        sortOrder?: 'asc' | 'desc';
    }): Promise<Gallery[]>;
    findById(id: string): Promise<Gallery | null>;
    findByRelated(relatedId: string, relatedType: string): Promise<Gallery[]>;
    findPrimaryByRelated(relatedId: string, relatedType: string): Promise<Gallery | null>;
    create(gallery: Omit<Gallery, 'id' | 'createdAt' | 'updatedAt'>): Promise<Gallery>;
    update(id: string, gallery: Partial<Gallery>): Promise<Gallery | null>;
    delete(id: string): Promise<boolean>;
    setPrimary(id: string, relatedId: string, relatedType: string): Promise<boolean>;
    updateDisplayOrder(id: string, order: number): Promise<boolean>;
    private mapToEntity;
}
//# sourceMappingURL=GalleryRepository.d.ts.map