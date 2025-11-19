import { ICategoryRepository } from '../../domain/repositories/ICategoryRepository';
import { Category } from '../../domain/entities/Category';
import { db } from '../database/connection';

interface CategoryRow {
  id: number;
  name: string;
  slug: string;
  description: string | null;
  is_active: boolean;
  created_at: Date;
  updated_at: Date;
}

export class CategoryRepository implements ICategoryRepository {
  private readonly tableName = 'categories';

  private mapRowToEntity(row: CategoryRow): Category {
    return new Category(
      row.id,
      row.name,
      row.slug,
      row.description,
      Boolean(row.is_active),
      new Date(row.created_at),
      new Date(row.updated_at)
    );
  }

  async findAll(): Promise<Category[]> {
    const rows = await db<CategoryRow>(this.tableName).select('*').orderBy('name', 'asc');
    return rows.map((row) => this.mapRowToEntity(row));
  }

  async findById(id: number): Promise<Category | null> {
    const row = await db<CategoryRow>(this.tableName).where({ id }).first();
    return row ? this.mapRowToEntity(row) : null;
  }

  async findBySlug(slug: string): Promise<Category | null> {
    const row = await db<CategoryRow>(this.tableName).where({ slug }).first();
    return row ? this.mapRowToEntity(row) : null;
  }

  async findActive(): Promise<Category[]> {
    const rows = await db<CategoryRow>(this.tableName)
      .where({ is_active: true })
      .orderBy('name', 'asc')
      .select('*');
    return rows.map((row) => this.mapRowToEntity(row));
  }

  async create(category: Category): Promise<Category> {
    const [id] = await db(this.tableName).insert({
      name: category.name,
      slug: category.slug,
      description: category.description,
      is_active: category.isActive,
    });

    const created = await this.findById(id);
    return created!;
  }

  async update(id: number, data: Partial<Category>): Promise<Category | null> {
    const updateData: any = {};

    if (data.name) updateData.name = data.name;
    if (data.slug) updateData.slug = data.slug;
    if (data.description !== undefined) updateData.description = data.description;
    if (data.isActive !== undefined) updateData.is_active = data.isActive;

    updateData.updated_at = db.fn.now();

    const updated = await db(this.tableName).where({ id }).update(updateData);

    if (updated === 0) {
      return null;
    }

    return this.findById(id);
  }

  async delete(id: number): Promise<boolean> {
    const deleted = await db(this.tableName).where({ id }).del();
    return deleted > 0;
  }
}
