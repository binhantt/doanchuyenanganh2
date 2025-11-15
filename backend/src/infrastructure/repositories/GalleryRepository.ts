import { IGalleryRepository } from '../../domain/repositories/IGalleryRepository';
import { Gallery } from '../../domain/entities/Gallery';
import { db } from '../database/connection';
import { v4 as uuidv4 } from 'uuid';

export class GalleryRepository implements IGalleryRepository {
  private readonly tableName = 'galleries';

  async findAll(filters?: {
    category?: string;
    relatedId?: string;
    relatedType?: string;
    isActive?: boolean;
  }): Promise<Gallery[]> {
    let query = db(this.tableName);

    if (filters?.category) {
      query = query.where('category', filters.category);
    }
    if (filters?.relatedId) {
      query = query.where('related_id', filters.relatedId);
    }
    if (filters?.relatedType) {
      query = query.where('related_type', filters.relatedType);
    }
    if (filters?.isActive !== undefined) {
      query = query.where('is_active', filters.isActive);
    }

    const rows = await query.orderBy('display_order', 'asc').orderBy('created_at', 'desc');
    return rows.map(this.mapToEntity);
  }

  async findById(id: string): Promise<Gallery | null> {
    const row = await db(this.tableName).where({ id }).first();
    return row ? this.mapToEntity(row) : null;
  }

  async findByRelated(relatedId: string, relatedType: string): Promise<Gallery[]> {
    const rows = await db(this.tableName)
      .where({ related_id: relatedId, related_type: relatedType, is_active: true })
      .orderBy('display_order', 'asc')
      .orderBy('created_at', 'desc');
    return rows.map(this.mapToEntity);
  }

  async findPrimaryByRelated(relatedId: string, relatedType: string): Promise<Gallery | null> {
    const row = await db(this.tableName)
      .where({ related_id: relatedId, related_type: relatedType, is_primary: true, is_active: true })
      .first();
    return row ? this.mapToEntity(row) : null;
  }

  async create(gallery: Omit<Gallery, 'id' | 'createdAt' | 'updatedAt'>): Promise<Gallery> {
    const id = uuidv4();
    const now = new Date();

    const data = {
      id,
      title: gallery.title,
      alt_text: gallery.altText,
      file_name: gallery.fileName,
      file_path: gallery.filePath,
      file_url: gallery.fileUrl,
      mime_type: gallery.mimeType,
      file_size: gallery.fileSize,
      width: gallery.width,
      height: gallery.height,
      category: gallery.category,
      related_id: gallery.relatedId,
      related_type: gallery.relatedType,
      display_order: gallery.displayOrder,
      is_primary: gallery.isPrimary,
      is_active: gallery.isActive,
      created_at: now,
      updated_at: now,
    };

    await db(this.tableName).insert(data);
    const created = await this.findById(id);
    if (!created) throw new Error('Failed to create gallery');
    return created;
  }

  async update(id: string, gallery: Partial<Gallery>): Promise<Gallery | null> {
    const data: any = {
      updated_at: new Date(),
    };

    if (gallery.title !== undefined) data.title = gallery.title;
    if (gallery.altText !== undefined) data.alt_text = gallery.altText;
    if (gallery.category !== undefined) data.category = gallery.category;
    if (gallery.relatedId !== undefined) data.related_id = gallery.relatedId;
    if (gallery.relatedType !== undefined) data.related_type = gallery.relatedType;
    if (gallery.displayOrder !== undefined) data.display_order = gallery.displayOrder;
    if (gallery.isPrimary !== undefined) data.is_primary = gallery.isPrimary;
    if (gallery.isActive !== undefined) data.is_active = gallery.isActive;

    const updated = await db(this.tableName).where({ id }).update(data);
    return updated ? this.findById(id) : null;
  }

  async delete(id: string): Promise<boolean> {
    const deleted = await db(this.tableName).where({ id }).delete();
    return deleted > 0;
  }

  async setPrimary(id: string, relatedId: string, relatedType: string): Promise<boolean> {
    // First, unset all primary images for this related item
    await db(this.tableName)
      .where({ related_id: relatedId, related_type: relatedType })
      .update({ is_primary: false, updated_at: new Date() });

    // Then set the new primary image
    const updated = await db(this.tableName)
      .where({ id })
      .update({ is_primary: true, updated_at: new Date() });

    return updated > 0;
  }

  async updateDisplayOrder(id: string, order: number): Promise<boolean> {
    const updated = await db(this.tableName)
      .where({ id })
      .update({ display_order: order, updated_at: new Date() });
    return updated > 0;
  }

  private mapToEntity(row: any): Gallery {
    return new Gallery(
      row.id,
      row.title,
      row.alt_text,
      row.file_name,
      row.file_path,
      row.file_url,
      row.mime_type,
      row.file_size,
      row.width,
      row.height,
      row.category,
      row.related_id,
      row.related_type,
      row.display_order,
      row.is_primary,
      row.is_active,
      row.created_at,
      row.updated_at
    );
  }
}
