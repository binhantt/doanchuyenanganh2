import { IPackageRepository } from '../../domain/repositories/IPackageRepository';
import { Package } from '../../domain/entities/Package';
import { db } from '../database/connection';

interface PackageRow {
  id: string;
  name: string;
  slug: string;
  description: string;
  price: number;
  features: string;
  images?: string;
  is_popular: boolean;
  is_active: boolean;
  created_at: Date;
  updated_at: Date;
}

export class PackageRepository implements IPackageRepository {
  private readonly tableName = 'packages';

  private mapRowToEntity(row: PackageRow): Package {
    return new Package(
      row.id,
      row.name,
      row.slug,
      row.description,
      Number(row.price),
      JSON.parse(row.features),
      Boolean(row.is_popular),
      Boolean(row.is_active),
      row.images ? JSON.parse(row.images) : [],
      new Date(row.created_at),
      new Date(row.updated_at)
    );
  }

  async findAll(): Promise<Package[]> {
    const rows = await db<PackageRow>(this.tableName).select('*');
    return rows.map((row) => this.mapRowToEntity(row));
  }

  async findById(id: string): Promise<Package | null> {
    const row = await db<PackageRow>(this.tableName).where({ id }).first();
    return row ? this.mapRowToEntity(row) : null;
  }

  async findBySlug(slug: string): Promise<Package | null> {
    const row = await db<PackageRow>(this.tableName).where({ slug }).first();
    return row ? this.mapRowToEntity(row) : null;
  }

  async findActive(): Promise<Package[]> {
    const rows = await db<PackageRow>(this.tableName)
      .where({ is_active: true })
      .select('*')
      .orderBy('price', 'asc');
    return rows.map((row) => this.mapRowToEntity(row));
  }

  async findPopular(): Promise<Package[]> {
    const rows = await db<PackageRow>(this.tableName)
      .where({ is_popular: true, is_active: true })
      .select('*');
    return rows.map((row) => this.mapRowToEntity(row));
  }

  async create(pkg: Package): Promise<Package> {
    await db(this.tableName).insert({
      id: pkg.id,
      name: pkg.name,
      slug: pkg.slug,
      description: pkg.description,
      price: pkg.price,
      features: JSON.stringify(pkg.features),
      images: JSON.stringify(pkg.images || []),
      is_popular: pkg.isPopular,
      is_active: pkg.isActive,
    });

    return pkg;
  }

  async update(id: string, data: Partial<Package>): Promise<Package | null> {
    const updateData: any = {};

    if (data.name) updateData.name = data.name;
    if (data.slug) updateData.slug = data.slug;
    if (data.description) updateData.description = data.description;
    if (data.price !== undefined) updateData.price = data.price;
    if (data.features) updateData.features = JSON.stringify(data.features);
    if (data.images) updateData.images = JSON.stringify(data.images);
    if (data.isPopular !== undefined) updateData.is_popular = data.isPopular;
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
