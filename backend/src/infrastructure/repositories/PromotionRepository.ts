import { IPromotionRepository } from '../../domain/repositories/IPromotionRepository';
import { Promotion } from '../../domain/entities/Promotion';
import { db } from '../database/connection';

interface PromotionRow {
  id: string;
  code: string;
  title: string;
  description: string;
  discount_type: 'percentage' | 'fixed';
  discount_value: number;
  max_discount: number | null;
  min_order_amount: number | null;
  applicable_services: string | null;
  applicable_packages: string | null;
  start_date: Date;
  end_date: Date;
  is_active: boolean;
  created_at: Date;
  updated_at: Date;
}

export class PromotionRepository implements IPromotionRepository {
  private readonly tableName = 'promotions';

  private mapRowToEntity(row: PromotionRow): Promotion {
    return new Promotion(
      row.id,
      row.code,
      row.title,
      row.description,
      row.discount_type,
      Number(row.discount_value),
      row.max_discount ? Number(row.max_discount) : null,
      row.min_order_amount ? Number(row.min_order_amount) : null,
      row.applicable_services ? JSON.parse(row.applicable_services) : null,
      row.applicable_packages ? JSON.parse(row.applicable_packages) : null,
      new Date(row.start_date),
      new Date(row.end_date),
      Boolean(row.is_active),
      new Date(row.created_at),
      new Date(row.updated_at)
    );
  }

  async findAll(filters?: {
    keyword?: string;
    discountType?: string;
    isActive?: boolean;
    sortBy?: string;
    sortOrder?: 'asc' | 'desc';
  }): Promise<Promotion[]> {
    let query = db<PromotionRow>(this.tableName);

    if (filters?.keyword) {
      query = query.where((builder) => {
        builder
          .where('code', 'like', `%${filters.keyword}%`)
          .orWhere('title', 'like', `%${filters.keyword}%`)
          .orWhere('description', 'like', `%${filters.keyword}%`);
      });
    }
    if (filters?.discountType) {
      query = query.where('discount_type', filters.discountType);
    }
    if (filters?.isActive !== undefined) {
      query = query.where('is_active', filters.isActive);
    }

    // Map camelCase to snake_case for database columns
    const columnMap: Record<string, string> = {
      createdAt: 'created_at',
      updatedAt: 'updated_at',
      startDate: 'start_date',
      endDate: 'end_date',
      discountType: 'discount_type',
      discountValue: 'discount_value',
      isActive: 'is_active'
    };

    const sortBy = filters?.sortBy || 'created_at';
    const sortOrder = filters?.sortOrder || 'desc';
    const dbColumn = columnMap[sortBy] || sortBy;

    const rows = await query.orderBy(dbColumn, sortOrder).select('*');
    return rows.map((row) => this.mapRowToEntity(row));
  }

  async findById(id: string): Promise<Promotion | null> {
    const row = await db<PromotionRow>(this.tableName).where({ id }).first();
    return row ? this.mapRowToEntity(row) : null;
  }

  async findByCode(code: string): Promise<Promotion | null> {
    const row = await db<PromotionRow>(this.tableName).where({ code }).first();
    return row ? this.mapRowToEntity(row) : null;
  }

  async findActive(): Promise<Promotion[]> {
    const now = new Date();
    const rows = await db<PromotionRow>(this.tableName)
      .where({ is_active: true })
      .where('start_date', '<=', now)
      .where('end_date', '>=', now)
      .select('*');
    return rows.map((row) => this.mapRowToEntity(row));
  }

  async findByService(serviceId: string): Promise<Promotion[]> {
    const rows = await db<PromotionRow>(this.tableName)
      .where({ is_active: true })
      .select('*');

    return rows
      .filter((row) => {
        if (!row.applicable_services) return true;
        const services = JSON.parse(row.applicable_services);
        return services.includes(serviceId);
      })
      .map((row) => this.mapRowToEntity(row));
  }

  async findByPackage(packageId: string): Promise<Promotion[]> {
    const rows = await db<PromotionRow>(this.tableName)
      .where({ is_active: true })
      .select('*');

    return rows
      .filter((row) => {
        if (!row.applicable_packages) return true;
        const packages = JSON.parse(row.applicable_packages);
        return packages.includes(packageId);
      })
      .map((row) => this.mapRowToEntity(row));
  }

  async create(promotion: Promotion): Promise<Promotion> {
    await db(this.tableName).insert({
      id: promotion.id,
      code: promotion.code,
      title: promotion.title,
      description: promotion.description,
      discount_type: promotion.discountType,
      discount_value: promotion.discountValue,
      max_discount: promotion.maxDiscount,
      min_order_amount: promotion.minOrderAmount,
      applicable_services: promotion.applicableServices
        ? JSON.stringify(promotion.applicableServices)
        : null,
      applicable_packages: promotion.applicablePackages
        ? JSON.stringify(promotion.applicablePackages)
        : null,
      start_date: promotion.startDate,
      end_date: promotion.endDate,
      is_active: promotion.isActive,
    });

    return promotion;
  }

  async update(id: string, data: Partial<Promotion>): Promise<Promotion | null> {
    const updateData: any = {};

    if (data.code) updateData.code = data.code;
    if (data.title) updateData.title = data.title;
    if (data.description) updateData.description = data.description;
    if (data.discountType) updateData.discount_type = data.discountType;
    if (data.discountValue !== undefined) updateData.discount_value = data.discountValue;
    if (data.maxDiscount !== undefined) updateData.max_discount = data.maxDiscount;
    if (data.minOrderAmount !== undefined) updateData.min_order_amount = data.minOrderAmount;
    if (data.applicableServices)
      updateData.applicable_services = JSON.stringify(data.applicableServices);
    if (data.applicablePackages)
      updateData.applicable_packages = JSON.stringify(data.applicablePackages);
    if (data.startDate) updateData.start_date = data.startDate;
    if (data.endDate) updateData.end_date = data.endDate;
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
