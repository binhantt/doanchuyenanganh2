import { IProductRepository } from '../../domain/repositories/IProductRepository';
import { Product } from '../../domain/entities/Product';
import { db } from '../database/connection';
import { v4 as uuidv4 } from 'uuid';

export class ProductRepository implements IProductRepository {
  private readonly tableName = 'products';

  private async loadFeaturesAndImages(productId: string): Promise<{ features: string[]; images: string[] }> {
    // Load features
    const featuresRows = await db('features')
      .where({ entity_id: productId, entity_type: 'product' })
      .orderBy('display_order', 'asc');

    const features = featuresRows.map((row) => row.feature_text);

    // Load images
    const imagesRows = await db('images')
      .where({ entity_id: productId, entity_type: 'product' })
      .orderBy('display_order', 'asc');

    const images = imagesRows.map((row) => row.url);

    return { features, images };
  }

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
    return Promise.all(rows.map((row) => this.mapToEntity(row)));
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
    const trx = await db.transaction();

    try {
      // Insert product
      await trx(this.tableName).insert({
        id,
        name: product.name,
        slug: product.slug,
        description: product.description,
        price: product.price,
        category: product.category,
        material: product.material,
        stock_quantity: product.stockQuantity,
        is_featured: product.isFeatured,
        is_active: product.isActive,
      });

      // Insert features
      for (let i = 0; i < product.features.length; i++) {
        await trx('features').insert({
          id: uuidv4(),
          entity_id: id,
          entity_type: 'product',
          feature_text: product.features[i],
          feature_type: 'included',
          display_order: i,
        });
      }

      // Insert images
      for (let i = 0; i < product.images.length; i++) {
        await trx('images').insert({
          id: uuidv4(),
          entity_id: id,
          entity_type: 'product',
          url: product.images[i],
          display_order: i,
          is_primary: i === 0,
        });
      }

      await trx.commit();
      const created = await this.findById(id);
      if (!created) throw new Error('Failed to create product');
      return created;
    } catch (error) {
      await trx.rollback();
      throw error;
    }
  }

  async update(id: string, product: Partial<Product>): Promise<Product | null> {
    const trx = await db.transaction();

    try {
      const data: any = {
        updated_at: new Date(),
      };

      if (product.name !== undefined) data.name = product.name;
      if (product.slug !== undefined) data.slug = product.slug;
      if (product.description !== undefined) data.description = product.description;
      if (product.price !== undefined) data.price = product.price;
      if (product.category !== undefined) data.category = product.category;
      if (product.material !== undefined) data.material = product.material;
      if (product.stockQuantity !== undefined) data.stock_quantity = product.stockQuantity;
      if (product.isFeatured !== undefined) data.is_featured = product.isFeatured;
      if (product.isActive !== undefined) data.is_active = product.isActive;

      const updated = await trx(this.tableName).where({ id }).update(data);

      if (updated === 0) {
        await trx.rollback();
        return null;
      }

      // Update features if provided
      if (product.features) {
        await trx('features').where({ entity_id: id, entity_type: 'product' }).del();

        for (let i = 0; i < product.features.length; i++) {
          await trx('features').insert({
            id: uuidv4(),
            entity_id: id,
            entity_type: 'product',
            feature_text: product.features[i],
            feature_type: 'included',
            display_order: i,
          });
        }
      }

      // Update images if provided
      if (product.images) {
        await trx('images').where({ entity_id: id, entity_type: 'product' }).del();

        for (let i = 0; i < product.images.length; i++) {
          await trx('images').insert({
            id: uuidv4(),
            entity_id: id,
            entity_type: 'product',
            url: product.images[i],
            display_order: i,
            is_primary: i === 0,
          });
        }
      }

      await trx.commit();
      return this.findById(id);
    } catch (error) {
      await trx.rollback();
      throw error;
    }
  }

  async delete(id: string): Promise<boolean> {
    const trx = await db.transaction();

    try {
      // Delete related features and images
      await trx('features').where({ entity_id: id, entity_type: 'product' }).del();
      await trx('images').where({ entity_id: id, entity_type: 'product' }).del();

      // Delete product
      const deleted = await trx(this.tableName).where({ id }).delete();

      await trx.commit();
      return deleted > 0;
    } catch (error) {
      await trx.rollback();
      throw error;
    }
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

  private async mapToEntity(row: any): Promise<Product> {
    const { features, images } = await this.loadFeaturesAndImages(row.id);

    return new Product(
      row.id,
      row.name,
      row.slug,
      row.description,
      parseFloat(row.price),
      row.category,
      row.material,
      features,
      images,
      row.stock_quantity,
      row.is_featured,
      row.is_active,
      row.created_at,
      row.updated_at
    );
  }
}
