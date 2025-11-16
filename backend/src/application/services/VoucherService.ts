import { IVoucherService } from '../interfaces/IVoucherService';
import { IVoucherRepository } from '../../domain/repositories/IVoucherRepository';
import { Voucher } from '../../domain/entities/Voucher';
import { v4 as uuidv4 } from 'uuid';

export class VoucherService implements IVoucherService {
  constructor(private readonly voucherRepository: IVoucherRepository) {}

  async getAllVouchers(): Promise<Voucher[]> {
    return this.voucherRepository.findAll();
  }

  async getActiveVouchers(): Promise<Voucher[]> {
    return this.voucherRepository.findActive();
  }

  async getVoucherById(id: string): Promise<Voucher | null> {
    return this.voucherRepository.findById(id);
  }

  async getVoucherByCode(code: string): Promise<Voucher | null> {
    return this.voucherRepository.findByCode(code);
  }

  async createVoucher(data: {
    code: string;
    name: string;
    description?: string | null;
    discountType: 'percentage' | 'fixed';
    discountValue: number;
    maxDiscountAmount?: number | null;
    minOrderValue?: number | null;
    usageLimit?: number | null;
    usagePerCustomer?: number | null;
    startDate?: Date | null;
    endDate?: Date | null;
    isActive?: boolean;
  }): Promise<Voucher> {
    // Validate
    if (!data.code || !data.name || !data.discountType || !data.discountValue) {
      throw new Error('Missing required fields');
    }

    if (data.discountType === 'percentage' && (data.discountValue < 0 || data.discountValue > 100)) {
      throw new Error('Percentage discount must be between 0 and 100');
    }

    if (data.discountValue < 0) {
      throw new Error('Discount value must be positive');
    }

    // Check if code already exists
    const existing = await this.voucherRepository.findByCode(data.code);
    if (existing) {
      throw new Error('Voucher code already exists');
    }

    const voucher = new Voucher(
      uuidv4(),
      data.code.toUpperCase(),
      data.name,
      data.description || null,
      data.discountType,
      data.discountValue,
      data.maxDiscountAmount || null,
      data.minOrderValue || null,
      data.usageLimit || null,
      0, // usedCount starts at 0
      data.usagePerCustomer || null,
      data.startDate || null,
      data.endDate || null,
      data.isActive !== undefined ? data.isActive : true
    );

    return this.voucherRepository.create(voucher);
  }

  async updateVoucher(id: string, data: Partial<Voucher>): Promise<Voucher | null> {
    const existing = await this.voucherRepository.findById(id);
    if (!existing) {
      return null;
    }

    // Validate if updating code
    if (data.code && data.code !== existing.code) {
      const codeExists = await this.voucherRepository.findByCode(data.code);
      if (codeExists) {
        throw new Error('Voucher code already exists');
      }
    }

    // Validate discount value
    if (data.discountType === 'percentage' && data.discountValue) {
      if (data.discountValue < 0 || data.discountValue > 100) {
        throw new Error('Percentage discount must be between 0 and 100');
      }
    }

    return this.voucherRepository.update(id, data);
  }

  async deleteVoucher(id: string): Promise<boolean> {
    return this.voucherRepository.delete(id);
  }
}
