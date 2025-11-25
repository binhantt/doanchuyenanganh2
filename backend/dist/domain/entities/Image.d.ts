export type EntityType = 'package' | 'product' | 'service' | 'decoration';
export declare class Image {
    readonly id: string;
    readonly entityId: string;
    readonly entityType: EntityType;
    readonly url: string;
    readonly altText: string | null;
    readonly displayOrder: number;
    readonly isPrimary: boolean;
    readonly createdAt?: Date | undefined;
    readonly updatedAt?: Date | undefined;
    constructor(id: string, entityId: string, entityType: EntityType, url: string, altText?: string | null, displayOrder?: number, isPrimary?: boolean, createdAt?: Date | undefined, updatedAt?: Date | undefined);
    isForEntity(entityId: string, entityType: EntityType): boolean;
    static createPrimary(id: string, entityId: string, entityType: EntityType, url: string, altText?: string): Image;
}
//# sourceMappingURL=Image.d.ts.map