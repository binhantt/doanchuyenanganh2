import { IAlbumRepository } from '../../domain/repositories/IAlbumRepository';
import { GalleryAlbum } from '../../domain/entities/GalleryAlbum';
import { db } from '../database/connection';
import { v4 as uuidv4 } from 'uuid';

export class AlbumRepository implements IAlbumRepository {
  private readonly tableName = 'gallery_albums';

  async findAll(filters?: {
    isActive?: boolean;
  }): Promise<GalleryAlbum[]> {
    let query = db(this.tableName);

    if (filters?.isActive !== undefined) {
      query = query.where('is_active', filters.isActive);
    }

    const rows = await query
      .orderBy('display_order', 'asc')
      .orderBy('created_at', 'desc');
    
    return rows.map(this.mapToEntity);
  }

  async findById(id: string): Promise<GalleryAlbum | null> {
    const row = await db(this.tableName).where({ id }).first();
    return row ? this.mapToEntity(row) : null;
  }

  async create(album: Omit<GalleryAlbum, 'id' | 'createdAt' | 'updatedAt'>): Promise<GalleryAlbum> {
    const id = uuidv4();
    const now = new Date();

    const data = {
      id,
      name: album.name,
      description: album.description,
      cover_image_id: album.coverImageId,
      display_order: album.displayOrder,
      is_active: album.isActive,
      created_at: now,
      updated_at: now,
    };

    await db(this.tableName).insert(data);
    const created = await this.findById(id);
    if (!created) throw new Error('Failed to create album');
    return created;
  }

  async update(id: string, album: Partial<GalleryAlbum>): Promise<GalleryAlbum | null> {
    const data: any = {
      updated_at: new Date(),
    };

    if (album.name !== undefined) data.name = album.name;
    if (album.description !== undefined) data.description = album.description;
    if (album.coverImageId !== undefined) data.cover_image_id = album.coverImageId;
    if (album.displayOrder !== undefined) data.display_order = album.displayOrder;
    if (album.isActive !== undefined) data.is_active = album.isActive;

    const updated = await db(this.tableName).where({ id }).update(data);
    return updated ? this.findById(id) : null;
  }

  async delete(id: string): Promise<boolean> {
    const deleted = await db(this.tableName).where({ id }).delete();
    return deleted > 0;
  }

  async countImages(albumId: string): Promise<number> {
    const result = await db('galleries')
      .where({ album_id: albumId, is_active: true })
      .count('id as count')
      .first();
    
    return result ? Number(result.count) : 0;
  }

  private mapToEntity(row: any): GalleryAlbum {
    return new GalleryAlbum(
      row.id,
      row.name,
      row.description,
      row.cover_image_id,
      row.display_order,
      row.is_active,
      row.created_at,
      row.updated_at
    );
  }
}

