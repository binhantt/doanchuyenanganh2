import { IProductRepository } from '../../domain/repositories/IProductRepository';
import { Product } from '../../domain/entities/Product';
import { db } from '../database/connection';
import { v4 as uuidv4 } from 'uuid';

export class ProductRepository implements IProductRepository {
  private readonly tableName = 'products';

  async findAll(filters?: { category?: string; isActive?: boolean; isFeatured?: boolean }): Promise<Product[]> {
    let query = db(this.tableName);

    if (filters?.category) {
      query = query.where('category', filters.category);
    }
    if (filters?.isActive !== undefined) {
      query = query.where('is_active', filters.isActive);
    }
    if (filters?.isFeatured !== undefined) {
      query = query.where('is_featured', filters.isFeatured);
    }

    const rows = await query.orderBy('created_at', 'desc');
    return rows.map(this.mapToEntity);
  }

  async findById(id: string): Promise<Product | null> {
    const row = await db(this.tableName).where({ id }).first();
    return row ? this.mapToEntity(row) : null;
  }

  async findBySlug(slug: string): Promise<Product | null> {
    const row = await db(this.tableName).where({ slug }).first();
    return row ? this.mapToEntity(row) : null;
  }

  async create(product: Omit<Product, 'id' | 'createdAt' | 'updatedAt'>): Promise<Product> {
    const id = uuidv4();
    const now = new Date();

    const data = {
      id,
      name: product.name,
      slug: product.slug,
      description: product.description,
      price: product.price,
      category: product.category,
      material: product.material,
      features: JSON.stringify(product.features),
      images: JSON.stringify(product.images),
      stock_quantity: product.stockQuantity,
      is_featured: product.isFeatured,
      is_active: product.isActive,
      created_at: now,
      updated_at: now,
    };

    await db(this.tableName).insert(data);
    const created = await this.findById(id);
    if (!created) throw new Error('Failed to create product');
    return created;
  }

  async update(id: string, product: Partial<Product>): Promise<Product | null> {
    const data: any = {
      updated_at: new Date(),
    };

    if (product.name !== undefined) data.name = product.name;
    if (product.slug !== undefined) data.slug = product.slug;
    if (product.description !== undefined) data.description = product.description;
    if (product.price !== undefined) data.price = product.price;
    if (product.category !== undefined) data.category = product.category;
    if (product.material !== undefined) data.material = product.material;
    if (product.features !== undefined) data.features = JSON.stringify(product.features);
    if (product.images !== undefined) data.images = JSON.stringify(product.images);
    if (product.stockQuantity !== undefined) data.stock_quantity = product.stockQuantity;
    if (product.isFeatured !== undefined) data.is_featured = product.isFeatured;
    if (product.isActive !== undefined) data.is_active = product.isActive;

    const updated = await db(this.tableName).where({ id }).update(data);
    return updated ? this.findById(id) : null;
  }

  async delete(id: string): Promise<boolean> {
    const deleted = await db(this.tableName).where({ id }).delete();
    return deleted > 0;
  }

  async updateStock(id: string, quantity: number): Promise<boolean> {
    const updated = await db(this.tableName)
      .where({ id })
      .update({
        stock_quantity: quantity,
        updated_at: new Date(),
      });
    return updated > 0;
  }

  private mapToEntity(row: any): Product {
    return new Product(
      row.id,
      row.name,
      row.slug,
      row.description,
      parseFloat(row.price),
      row.category,
      row.material,
      JSON.parse(row.features),
      JSON.parse(row.images),
      row.stock_quantity,
      row.is_featured,
      row.is_active,
      row.created_at,
      row.updated_at
    );
  }
}
