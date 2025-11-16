export type EntityType = 'package' | 'product' | 'service' | 'decoration';
export type FeatureType = 'included' | 'excluded' | 'highlight';

export class Feature {
  constructor(
    public readonly id: string,
    public readonly entityId: string,
    public readonly entityType: EntityType,
    public readonly featureText: string,
    public readonly featureType: FeatureType,
    public readonly displayOrder: number = 0,
    public readonly createdAt?: Date,
    public readonly updatedAt?: Date
  ) {}

  isForEntity(entityId: string, entityType: EntityType): boolean {
    return this.entityId === entityId && this.entityType === entityType;
  }

  isIncluded(): boolean {
    return this.featureType === 'included';
  }

  isExcluded(): boolean {
    return this.featureType === 'excluded';
  }

  isHighlight(): boolean {
    return this.featureType === 'highlight';
  }
}
