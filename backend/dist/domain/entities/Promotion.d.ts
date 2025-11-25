export declare class Promotion {
    readonly id: string;
    readonly code: string;
    readonly title: string;
    readonly description: string;
    readonly discountType: 'percentage' | 'fixed';
    readonly discountValue: number;
    readonly maxDiscount: number | null;
    readonly minOrderAmount: number | null;
    readonly applicableServices: string[] | null;
    readonly applicablePackages: string[] | null;
    readonly startDate: Date;
    readonly endDate: Date;
    readonly isActive: boolean;
    readonly createdAt?: Date | undefined;
    readonly updatedAt?: Date | undefined;
    constructor(id: string, code: string, title: string, description: string, discountType: 'percentage' | 'fixed', discountValue: number, maxDiscount: number | null, minOrderAmount: number | null, applicableServices: string[] | null, applicablePackages: string[] | null, startDate: Date, endDate: Date, isActive: boolean, createdAt?: Date | undefined, updatedAt?: Date | undefined);
    isValid(): boolean;
    canApplyToService(serviceId: string): boolean;
    canApplyToPackage(packageId: string): boolean;
    calculateDiscount(amount: number): number;
}
//# sourceMappingURL=Promotion.d.ts.map