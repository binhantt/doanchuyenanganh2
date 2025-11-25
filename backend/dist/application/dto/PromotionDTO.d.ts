export interface PromotionDTO {
    id: string;
    code: string;
    title: string;
    description: string;
    discountType: 'percentage' | 'fixed';
    discountValue: number;
    maxDiscount?: number;
    minOrderAmount?: number;
    applicableServices?: string[];
    applicablePackages?: string[];
    startDate: string;
    endDate: string;
    isActive: boolean;
    createdAt: string;
    updatedAt: string;
}
export interface CreatePromotionDTO {
    code: string;
    title: string;
    description: string;
    discountType: 'percentage' | 'fixed';
    discountValue: number;
    maxDiscount?: number;
    minOrderAmount?: number;
    applicableServices?: string[];
    applicablePackages?: string[];
    startDate: string;
    endDate: string;
    isActive: boolean;
}
export interface UpdatePromotionDTO {
    code?: string;
    title?: string;
    description?: string;
    discountType?: 'percentage' | 'fixed';
    discountValue?: number;
    maxDiscount?: number;
    minOrderAmount?: number;
    applicableServices?: string[];
    applicablePackages?: string[];
    startDate?: string;
    endDate?: string;
    isActive?: boolean;
}
//# sourceMappingURL=PromotionDTO.d.ts.map