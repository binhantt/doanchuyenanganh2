import { CreateGalleryDTO, UpdateGalleryDTO, GalleryResponseDTO } from '../dto/GalleryDTO';
export interface IGalleryService {
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
}
//# sourceMappingURL=IGalleryService.d.ts.map