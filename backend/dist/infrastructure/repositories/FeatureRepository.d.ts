import { IFeatureRepository } from '../../domain/repositories/IFeatureRepository';
import { Feature, EntityType, FeatureType } from '../../domain/entities/Feature';
export declare class FeatureRepository implements IFeatureRepository {
    private readonly tableName;
    private mapRowToEntity;
    findByEntity(entityId: string, entityType: EntityType): Promise<Feature[]>;
    findByEntityAndType(entityId: string, entityType: EntityType, featureType: FeatureType): Promise<Feature[]>;
    create(feature: Feature): Promise<Feature>;
    createMany(features: Feature[]): Promise<Feature[]>;
    update(id: string, data: Partial<Feature>): Promise<Feature | null>;
    delete(id: string): Promise<boolean>;
    deleteByEntity(entityId: string, entityType: EntityType): Promise<boolean>;
}
//# sourceMappingURL=FeatureRepository.d.ts.map