import { EntityType } from '../../domain/entities/Image';
export interface ImageDTO {
    id: string;
    entityId: string;
    entityType: EntityType;
    url: string;
    altText?: string | null;
    displayOrder: number;
    isPrimary: boolean;
    createdAt?: string;
    updatedAt?: string;
}
export interface CreateImageDTO {
    entityId: string;
    entityType: EntityType;
    url: string;
    altText?: string;
    displayOrder?: number;
    isPrimary?: boolean;
}
export interface UpdateImageDTO {
    url?: string;
    altText?: string;
    displayOrder?: number;
    isPrimary?: boolean;
}
//# sourceMappingURL=ImageDTO.d.ts.map