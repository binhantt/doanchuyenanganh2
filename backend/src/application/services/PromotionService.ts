import { IPromotionService } from '../interfaces/IPromotionService';
import { IPromotionRepository } from '../../domain/repositories/IPromotionRepository';
import { Promotion } from '../../domain/entities/Promotion';
import { v4 as uuidv4 } from 'uuid';

export class PromotionService implements IPromotionService {
  constructor(private readonly promotionRepository: IPromotionRepository) {}

  async getAllPromotions(): Promise<Promotion[]> {
    return this.promotionRepository.findAll();
  }

  async getPromotionById(id: string): Promise<Promotion | null> {
    return this.promotionRepository.findById(id);
  }

  async getPromotionByCode(code: string): Promise<Promotion | null> {
    return this.promotionRepository.findByCode(code);
  }

  async getActivePromotions(): Promise<Promotion[]> {
    return this.promotionRepository.findActive();
  }

  async getPromotionsByService(serviceId: string): Promise<Promotion[]> {
    return this.promotionRepository.findByService(serviceId);
  }

  async getPromotionsByPackage(packageId: string): Promise<Promotion[]> {
    return this.promotionRepository.findByPackage(packageId);
  }

  async createPromotion(data: {
    code: string;
    title: string;
    description: string;
    discountType: 'percentage' | 'fixed';
    discountValue: number;
    maxDiscount?: number;
    minOrderAmount?: number;
    applicableServices?: string[];
    applicablePackages?: string[];
    startDate: Date;
    endDate: Date;
    isActive: boolean;
  }): Promise<Promotion> {
    if (!data.code || !data.title || !data.discountValue) {
      throw new Error('Missing required fields');
    }

    if (data.discountType === 'percentage' && data.discountValue > 100) {
      throw new Error('Percentage discount cannot exceed 100%');
    }

    if (data.startDate >= data.endDate) {
      throw new Error('Start date must be before end date');
    }

    const promotion = new Promotion(
      uuidv4(),
      data.code,
      data.title,
      data.description,
      data.discountType,
      data.discountValue,
      data.maxDiscount || null,
      data.minOrderAmount || null,
      data.applicableServices || null,
      data.applicablePackages || null,
      data.startDate,
      data.endDate,
      data.isActive
    );

    return this.promotionRepository.create(promotion);
  }

  async updatePromotion(id: string, data: Partial<Promotion>): Promise<Promotion | null> {
    const existing = await this.promotionRepository.findById(id);
    if (!existing) {
      return null;
    }

    return this.promotionRepository.update(id, data);
  }

  async deletePromotion(id: string): Promise<boolean> {
    const existing = await this.promotionRepository.findById(id);
    if (!existing) {
      return false;
    }

    return this.promotionRepository.delete(id);
  }
}
