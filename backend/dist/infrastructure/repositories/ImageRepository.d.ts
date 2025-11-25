import { IImageRepository } from '../../domain/repositories/IImageRepository';
import { Image, EntityType } from '../../domain/entities/Image';
export declare class ImageRepository implements IImageRepository {
    private readonly tableName;
    private mapRowToEntity;
    findByEntity(entityId: string, entityType: EntityType): Promise<Image[]>;
    findPrimaryByEntity(entityId: string, entityType: EntityType): Promise<Image | null>;
    create(image: Image): Promise<Image>;
    createMany(images: Image[]): Promise<Image[]>;
    update(id: string, data: Partial<Image>): Promise<Image | null>;
    delete(id: string): Promise<boolean>;
    deleteByEntity(entityId: string, entityType: EntityType): Promise<boolean>;
}
//# sourceMappingURL=ImageRepository.d.ts.map