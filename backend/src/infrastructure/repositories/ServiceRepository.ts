import { IServiceRepository } from '../../domain/repositories/IServiceRepository';
import { Service } from '../../domain/entities/Service';
import { db } from '../database/connection';

interface ServiceRow {
  id: string;
  name: string;
  slug: string;
  short_description: string;
  full_description: string;
  icon: string;
  features: string;
  base_price: number;
  is_active: boolean;
  created_at: Date;
  updated_at: Date;
}

export class ServiceRepository implements IServiceRepository {
  private readonly tableName = 'services';

  private mapRowToEntity(row: ServiceRow): Service {
    return new Service(
      row.id,
      row.name,
      row.slug,
      row.short_description,
      row.full_description,
      row.icon,
      JSON.parse(row.features),
      Number(row.base_price),
      Boolean(row.is_active),
      new Date(row.created_at),
      new Date(row.updated_at)
    );
  }

  async findAll(): Promise<Service[]> {
    const rows = await db<ServiceRow>(this.tableName).select('*');
    return rows.map((row) => this.mapRowToEntity(row));
  }

  async findById(id: string): Promise<Service | null> {
    const row = await db<ServiceRow>(this.tableName).where({ id }).first();
    return row ? this.mapRowToEntity(row) : null;
  }

  async findBySlug(slug: string): Promise<Service | null> {
    const row = await db<ServiceRow>(this.tableName).where({ slug }).first();
    return row ? this.mapRowToEntity(row) : null;
  }

  async findActive(): Promise<Service[]> {
    const rows = await db<ServiceRow>(this.tableName)
      .where({ is_active: true })
      .select('*');
    return rows.map((row) => this.mapRowToEntity(row));
  }

  async create(service: Service): Promise<Service> {
    await db(this.tableName).insert({
      id: service.id,
      name: service.name,
      slug: service.slug,
      short_description: service.shortDescription,
      full_description: service.fullDescription,
      icon: service.icon,
      features: JSON.stringify(service.features),
      base_price: service.basePrice,
      is_active: service.isActive,
    });

    return service;
  }

  async update(id: string, data: Partial<Service>): Promise<Service | null> {
    const updateData: any = {};

    if (data.name) updateData.name = data.name;
    if (data.slug) updateData.slug = data.slug;
    if (data.shortDescription) updateData.short_description = data.shortDescription;
    if (data.fullDescription) updateData.full_description = data.fullDescription;
    if (data.icon) updateData.icon = data.icon;
    if (data.features) updateData.features = JSON.stringify(data.features);
    if (data.basePrice !== undefined) updateData.base_price = data.basePrice;
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
