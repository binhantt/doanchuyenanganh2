export type EntityType = 'package' | 'product' | 'service' | 'decoration';

export class Image {
  constructor(
    public readonly id: string,
    public readonly entityId: string,
    public readonly entityType: EntityType,
    public readonly url: string,
    public readonly altText: string | null = null,
    public readonly displayOrder: number = 0,
    public readonly isPrimary: boolean = false,
    public readonly createdAt?: Date,
    public readonly updatedAt?: Date
  ) {}

  isForEntity(entityId: string, entityType: EntityType): boolean {
    return this.entityId === entityId && this.entityType === entityType;
  }

  static createPrimary(
    id: string,
    entityId: string,
    entityType: EntityType,
    url: string,
    altText?: string
  ): Image {
    return new Image(id, entityId, entityType, url, altText || null, 0, true);
  }
}
