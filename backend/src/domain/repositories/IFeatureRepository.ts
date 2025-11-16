import { Feature, EntityType, FeatureType } from '../entities/Feature';

export interface IFeatureRepository {
  findByEntity(entityId: string, entityType: EntityType): Promise<Feature[]>;
  findByEntityAndType(entityId: string, entityType: EntityType, featureType: FeatureType): Promise<Feature[]>;
  create(feature: Feature): Promise<Feature>;
  createMany(features: Feature[]): Promise<Feature[]>;
  update(id: string, data: Partial<Feature>): Promise<Feature | null>;
  delete(id: string): Promise<boolean>;
  deleteByEntity(entityId: string, entityType: EntityType): Promise<boolean>;
}
