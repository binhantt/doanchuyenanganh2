import { Image, EntityType } from '../entities/Image';

export interface IImageRepository {
  findByEntity(entityId: string, entityType: EntityType): Promise<Image[]>;
  findPrimaryByEntity(entityId: string, entityType: EntityType): Promise<Image | null>;
  create(image: Image): Promise<Image>;
  createMany(images: Image[]): Promise<Image[]>;
  update(id: string, data: Partial<Image>): Promise<Image | null>;
  delete(id: string): Promise<boolean>;
  deleteByEntity(entityId: string, entityType: EntityType): Promise<boolean>;
}
