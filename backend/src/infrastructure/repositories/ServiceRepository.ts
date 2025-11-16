;import { IServiceRepository } from '../../domain/repositories/IServiceRepository';
import { Service } from '../../domain/entities/Service';
import { db } from '../database/connection';

interface ServiceRow {
  id: string;
  name: string;
  slug: string;
  short_description: string;
  full_description: string;
  icon: string;
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
      Number(row.base_price),
      Boolean(row.is_active),
      new Date(row.created_at),
      new Date(row.updated_at)
    );
  }

  private async loadFeaturesAndImages(service: Service): Promise<any> {
    // Load features
    const features = await db('features')
      .where({ entity_id: service.id, entity_type: 'service' })
      .orderBy('display_order', 'asc');

    const featuresObj = {
      included: features.filter((f) => f.feature_type === 'included').map((f) => f.feature_text),
      excluded: features.filter((f) => f.feature_type === 'excluded').map((f) => f.feature_text),
      highlights: features.filter((f) => f.feature_type === 'highlight').map((f) => f.feature_text),
    };

    // Load images
    const images = await db('images')
      .where({ entity_id: service.id, entity_type: 'service' })
      .orderBy('display_order', 'asc');

    return {
      ...service,
      features: featuresObj,
      images: images.map((img) => img.url),
    };
  }

  async findAll(): Promise<Service[]> {
    const rows = await db<ServiceRow>(this.tableName).select('*');
    const services = rows.map((row) => this.mapRowToEntity(row));
    return Promise.all(services.map((s) => this.loadFeaturesAndImages(s)));
  }

  async findById(id: string): Promise<Service | null> {
    const row = await db<ServiceRow>(this.tableName).where({ id }).first();
    if (!row) return null;
    const service = this.mapRowToEntity(row);
    return this.loadFeaturesAndImages(service);
  }

  async findBySlug(slug: string): Promise<Service | null> {
    const row = await db<ServiceRow>(this.tableName).where({ slug }).first();
    if (!row) return null;
    const service = this.mapRowToEntity(row);
    return this.loadFeaturesAndImages(service);
  }

  async findActive(): Promise<Service[]> {
    const rows = await db<ServiceRow>(this.tableName)
      .where({ is_active: true })
      .select('*');
    const services = rows.map((row) => this.mapRowToEntity(row));
    return Promise.all(services.map((s) => this.loadFeaturesAndImages(s)));
  }

  async create(service: Service): Promise<Service> {
    await db(this.tableName).insert({
      id: service.id,
      name: service.name,
      slug: service.slug,
      short_description: service.shortDescription,
      full_description: service.fullDescription,
      icon: service.icon,
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
