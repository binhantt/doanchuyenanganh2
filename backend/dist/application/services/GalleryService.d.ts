import { IGalleryService } from '../interfaces/IGalleryService';
import { IGalleryRepository } from '../../domain/repositories/IGalleryRepository';
import { CreateGalleryDTO, UpdateGalleryDTO, GalleryResponseDTO } from '../dto/GalleryDTO';
export declare class GalleryService implements IGalleryService {
    private galleryRepository;
    constructor(galleryRepository: IGalleryRepository);
    getAllGalleries(filters?: {
        category?: string;
        relatedId?: string;
        relatedType?: string;
        isActive?: boolean;
    }): Promise<GalleryResponseDTO[]>;
    getGalleryById(id: string): Promise<GalleryResponseDTO>;
    getGalleriesByRelated(relatedId: string, relatedType: string): Promise<GalleryResponseDTO[]>;
    getPrimaryImage(relatedId: string, relatedType: string): Promise<GalleryResponseDTO | null>;
    createGallery(data: CreateGalleryDTO): Promise<GalleryResponseDTO>;
    updateGallery(id: string, data: UpdateGalleryDTO): Promise<GalleryResponseDTO>;
    deleteGallery(id: string): Promise<void>;
    setPrimaryImage(id: string, relatedId: string, relatedType: string): Promise<void>;
    updateDisplayOrder(id: string, order: number): Promise<void>;
    private mapToDTO;
}
//# sourceMappingURL=GalleryService.d.ts.map