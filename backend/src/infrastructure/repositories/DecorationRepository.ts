import { IDecorationRepository } from '../../domain/repositories/IDecorationRepository';
import { Decoration } from '../../domain/entities/Decoration';
import { db } from '../database/connection';

interface DecorationRow {
  id: string;
  name: string;
  slug: string;
  description: string;
  theme: string;
  style: string;
  base_price: number;
  features: string;
  images: string;
  is_active: boolean;
  created_at: Date;
  updated_at: Date;
}

export class DecorationRepository implements IDecorationRepository {
  private readonly tableName = 'decorations';

  private mapRowToEntity(row: DecorationRow): Decoration {
    return new Decoration(
      row.id,
      row.name,
      row.slug,
      row.description,
      row.theme,
      row.style,
      Number(row.base_price),
      JSON.parse(row.features),
      JSON.parse(row.images),
      Boolean(row.is_active),
      new Date(row.created_at),
      new Date(row.updated_at)
    );
  }

  async findAll(): Promise<Decoration[]> {
    const rows = await db<DecorationRow>(this.tableName).select('*');
    return rows.map((row) => this.mapRowToEntity(row));
  }

  async findById(id: string): Promise<Decoration | null> {
    const row = await db<DecorationRow>(this.tableName).where({ id }).first();
    return row ? this.mapRowToEntity(row) : null;
  }

  async findBySlug(slug: string): Promise<Decoration | null> {
    const row = await db<DecorationRow>(this.tableName).where({ slug }).first();
    return row ? this.mapRowToEntity(row) : null;
  }

  async findActive(): Promise<Decoration[]> {
    const rows = await db<DecorationRow>(this.tableName)
      .where({ is_active: true })
      .select('*');
    return rows.map((row) => this.mapRowToEntity(row));
  }

  async findByTheme(theme: string): Promise<Decoration[]> {
    const rows = await db<DecorationRow>(this.tableName)
      .where({ theme, is_active: true })
      .select('*');
    return rows.map((row) => this.mapRowToEntity(row));
  }

  async findByStyle(style: string): Promise<Decoration[]> {
    const rows = await db<DecorationRow>(this.tableName)
      .where({ style, is_active: true })
      .select('*');
    return rows.map((row) => this.mapRowToEntity(row));
  }

  async create(decoration: Decoration): Promise<Decoration> {
    await db(this.tableName).insert({
      id: decoration.id,
      name: decoration.name,
      slug: decoration.slug,
      description: decoration.description,
      theme: decoration.theme,
      style: decoration.style,
      base_price: decoration.basePrice,
      features: JSON.stringify(decoration.features),
      images: JSON.stringify(decoration.images),
      is_active: decoration.isActive,
    });

    return decoration;
  }

  async update(id: string, data: Partial<Decoration>): Promise<Decoration | null> {
    const updateData: any = {};

    if (data.name) updateData.name = data.name;
    if (data.slug) updateData.slug = data.slug;
    if (data.description) updateData.description = data.description;
    if (data.theme) updateData.theme = data.theme;
    if (data.style) updateData.style = data.style;
    if (data.basePrice !== undefined) updateData.base_price = data.basePrice;
    if (data.features) updateData.features = JSON.stringify(data.features);
    if (data.images) updateData.images = JSON.stringify(data.images);
    if (data.isActive !== undefined) updateData.is_active = data.isActive;

    updateData.updated_at = db.fn.now();

    const updated = await db(this.tableName).where({ id }).update(updateData);

    if (updated === 0) {
      return null;
    }

    return this.findById(id);
  }

  async delete(id: string): Promise<boolean> {
    const deleted = await db(this.tableName).where({ id }).del();
    return deleted > 0;
  }
}
