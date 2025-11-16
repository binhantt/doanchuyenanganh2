import { Promotion } from '../../domain/entities/Promotion';

export interface IPromotionService {
  getAllPromotions(): Promise<Promotion[]>;
  getPromotionById(id: string): Promise<Promotion | null>;
  getPromotionByCode(code: string): Promise<Promotion | null>;
  getActivePromotions(): Promise<Promotion[]>;
  getPromotionsByService(serviceId: string): Promise<Promotion[]>;
  getPromotionsByPackage(packageId: string): Promise<Promotion[]>;
  createPromotion(data: {
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
  }): Promise<Promotion>;
  updatePromotion(id: string, data: Partial<Promotion>): Promise<Promotion | null>;
  deletePromotion(id: string): Promise<boolean>;
}
