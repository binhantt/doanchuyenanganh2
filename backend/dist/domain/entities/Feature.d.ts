export type EntityType = 'package' | 'product' | 'service' | 'decoration';
export type FeatureType = 'included' | 'excluded' | 'highlight';
export declare class Feature {
    readonly id: string;
    readonly entityId: string;
    readonly entityType: EntityType;
    readonly featureText: string;
    readonly featureType: FeatureType;
    readonly displayOrder: number;
    readonly createdAt?: Date | undefined;
    readonly updatedAt?: Date | undefined;
    constructor(id: string, entityId: string, entityType: EntityType, featureText: string, featureType: FeatureType, displayOrder?: number, createdAt?: Date | undefined, updatedAt?: Date | undefined);
    isForEntity(entityId: string, entityType: EntityType): boolean;
    isIncluded(): boolean;
    isExcluded(): boolean;
    isHighlight(): boolean;
}
//# sourceMappingURL=Feature.d.ts.map