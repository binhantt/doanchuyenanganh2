import { IImageRepository } from '../../domain/repositories/IImageRepository';
import { Image, EntityType } from '../../domain/entities/Image';
import { db } from '../database/connection';

interface ImageRow {
  id: string;
  entity_id: string;
  entity_type: EntityType;
  url: string;
  alt_text: string | null;
  display_order: number;
  is_primary: boolean;
  created_at: Date;
  updated_at: Date;
}

export class ImageRepository implements IImageRepository {
  private readonly tableName = 'images';

  private mapRowToEntity(row: ImageRow): Image {
    return new Image(
      row.id,
      row.entity_id,
      row.entity_type,
      row.url,
      row.alt_text,
      row.display_order,
      Boolean(row.is_primary),
      new Date(row.created_at),
      new Date(row.updated_at)
    );
  }

  async findByEntity(entityId: string, entityType: EntityType): Promise<Image[]> {
    const rows = await db<ImageRow>(this.tableName)
      .where({ entity_id: entityId, entity_type: entityType })
      .orderBy('display_order', 'asc')
      .select('*');
    return rows.map((row) => this.mapRowToEntity(row));
  }

  async findPrimaryByEntity(entityId: string, entityType: EntityType): Promise<Image | null> {
    const row = await db<ImageRow>(this.tableName)
      .where({ entity_id: entityId, entity_type: entityType, is_primary: true })
      .first();
    return row ? this.mapRowToEntity(row) : null;
  }

  async create(image: Image): Promise<Image> {
    await db(this.tableName).insert({
      id: image.id,
      entity_id: image.entityId,
      entity_type: image.entityType,
      url: image.url,
      alt_text: image.altText,
      display_order: image.displayOrder,
      is_primary: image.isPrimary,
    });
    return image;
  }

  async createMany(images: Image[]): Promise<Image[]> {
    const rows = images.map((img) => ({
      id: img.id,
      entity_id: img.entityId,
      entity_type: img.entityType,
      url: img.url,
      alt_text: img.altText,
      display_order: img.displayOrder,
      is_primary: img.isPrimary,
    }));

    await db(this.tableName).insert(rows);
    return images;
  }

  async update(id: string, data: Partial<Image>): Promise<Image | null> {
    const updateData: any = {};

    if (data.url) updateData.url = data.url;
    if (data.altText !== undefined) updateData.alt_text = data.altText;
    if (data.displayOrder !== undefined) updateData.display_order = data.displayOrder;
    if (data.isPrimary !== undefined) updateData.is_primary = data.isPrimary;

    updateData.updated_at = db.fn.now();

    const updated = await db(this.tableName).where({ id }).update(updateData);

    if (updated === 0) {
      return null;
    }

    const row = await db<ImageRow>(this.tableName).where({ id }).first();
    return row ? this.mapRowToEntity(row) : null;
  }

  async delete(id: string): Promise<boolean> {
    const deleted = await db(this.tableName).where({ id }).del();
    return deleted > 0;
  }

  async deleteByEntity(entityId: string, entityType: EntityType): Promise<boolean> {
    const deleted = await db(this.tableName)
      .where({ entity_id: entityId, entity_type: entityType })
      .del();
    return deleted > 0;
  }
}
