import { IVoucherRepository } from '../../domain/repositories/IVoucherRepository';
import { Voucher, DiscountType } from '../../domain/entities/Voucher';
import { db } from '../database/connection';

interface VoucherRow {
  id: string;
  code: string;
  name: string;
  description: string | null;
  discount_type: DiscountType;
  discount_value: number;
  max_discount_amount: number | null;
  min_order_value: number | null;
  usage_limit: number | null;
  used_count: number;
  usage_per_customer: number | null;
  start_date: Date | null;
  end_date: Date | null;
  is_active: boolean;
  created_at: Date;
  updated_at: Date;
}

export class VoucherRepository implements IVoucherRepository {
  private readonly tableName = 'vouchers';

  private mapRowToEntity(row: VoucherRow): Voucher {
    return new Voucher(
      row.id,
      row.code,
      row.name,
      row.description,
      row.discount_type,
      Number(row.discount_value),
      row.max_discount_amount ? Number(row.max_discount_amount) : null,
      row.min_order_value ? Number(row.min_order_value) : null,
      row.usage_limit,
      row.used_count,
      row.usage_per_customer,
      row.start_date,
      row.end_date,
      Boolean(row.is_active),
      new Date(row.created_at),
      new Date(row.updated_at)
    );
  }

  async findAll(): Promise<Voucher[]> {
    const rows = await db<VoucherRow>(this.tableName).select('*');
    return rows.map((row) => this.mapRowToEntity(row));
  }

  async findById(id: string): Promise<Voucher | null> {
    const row = await db<VoucherRow>(this.tableName).where({ id }).first();
    return row ? this.mapRowToEntity(row) : null;
  }

  async findByCode(code: string): Promise<Voucher | null> {
    const row = await db<VoucherRow>(this.tableName).where({ code }).first();
    return row ? this.mapRowToEntity(row) : null;
  }

  async findActive(): Promise<Voucher[]> {
    const now = new Date();
    const rows = await db<VoucherRow>(this.tableName)
      .where({ is_active: true })
      .where((builder) => {
        builder.whereNull('start_date').orWhere('start_date', '<=', now);
      })
      .where((builder) => {
        builder.whereNull('end_date').orWhere('end_date', '>=', now);
      })
      .select('*');
    return rows.map((row) => this.mapRowToEntity(row));
  }

  async create(voucher: Voucher): Promise<Voucher> {
    await db(this.tableName).insert({
      id: voucher.id,
      code: voucher.code,
      name: voucher.name,
      description: voucher.description,
      discount_type: voucher.discountType,
      discount_value: voucher.discountValue,
      max_discount_amount: voucher.maxDiscountAmount,
      min_order_value: voucher.minOrderValue,
      usage_limit: voucher.usageLimit,
      used_count: voucher.usedCount,
      usage_per_customer: voucher.usagePerCustomer,
      start_date: voucher.startDate,
      end_date: voucher.endDate,
      is_active: voucher.isActive,
    });
    return voucher;
  }

  async update(id: string, data: Partial<Voucher>): Promise<Voucher | null> {
    const updateData: any = {};

    if (data.code) updateData.code = data.code;
    if (data.name) updateData.name = data.name;
    if (data.description !== undefined) updateData.description = data.description;
    if (data.discountType) updateData.discount_type = data.discountType;
    if (data.discountValue !== undefined) updateData.discount_value = data.discountValue;
    if (data.maxDiscountAmount !== undefined) updateData.max_discount_amount = data.maxDiscountAmount;
    if (data.minOrderValue !== undefined) updateData.min_order_value = data.minOrderValue;
    if (data.usageLimit !== undefined) updateData.usage_limit = data.usageLimit;
    if (data.usedCount !== undefined) updateData.used_count = data.usedCount;
    if (data.usagePerCustomer !== undefined) updateData.usage_per_customer = data.usagePerCustomer;
    if (data.startDate !== undefined) updateData.start_date = data.startDate;
    if (data.endDate !== undefined) updateData.end_date = data.endDate;
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

  async incrementUsedCount(id: string): Promise<boolean> {
    const updated = await db(this.tableName).where({ id }).increment('used_count', 1);
    return updated > 0;
  }
}
