export type DiscountType = 'percentage' | 'fixed';
export declare class Voucher {
    readonly id: string;
    readonly code: string;
    readonly name: string;
    readonly description: string | null;
    readonly discountType: DiscountType;
    readonly discountValue: number;
    readonly maxDiscountAmount: number | null;
    readonly minOrderValue: number | null;
    readonly usageLimit: number | null;
    readonly usedCount: number;
    readonly usagePerCustomer: number | null;
    readonly startDate: Date | null;
    readonly endDate: Date | null;
    readonly isActive: boolean;
    readonly createdAt?: Date | undefined;
    readonly updatedAt?: Date | undefined;
    constructor(id: string, code: string, name: string, description: string | null, discountType: DiscountType, discountValue: number, maxDiscountAmount: number | null, minOrderValue: number | null, usageLimit: number | null, usedCount: number, usagePerCustomer: number | null, startDate: Date | null, endDate: Date | null, isActive: boolean, createdAt?: Date | undefined, updatedAt?: Date | undefined);
    isValid(): boolean;
    canBeUsedForOrder(orderAmount: number): boolean;
    calculateDiscount(orderAmount: number): number;
}
//# sourceMappingURL=Voucher.d.ts.map