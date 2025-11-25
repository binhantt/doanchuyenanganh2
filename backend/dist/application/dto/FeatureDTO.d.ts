import { EntityType, FeatureType } from '../../domain/entities/Feature';
export interface FeatureDTO {
    id: string;
    entityId: string;
    entityType: EntityType;
    featureText: string;
    featureType: FeatureType;
    displayOrder: number;
    createdAt?: string;
    updatedAt?: string;
}
export interface CreateFeatureDTO {
    entityId: string;
    entityType: EntityType;
    featureText: string;
    featureType: FeatureType;
    displayOrder?: number;
}
export interface UpdateFeatureDTO {
    featureText?: string;
    featureType?: FeatureType;
    displayOrder?: number;
}
export interface GroupedFeaturesDTO {
    included: string[];
    excluded: string[];
    highlights: string[];
}
//# sourceMappingURL=FeatureDTO.d.ts.map