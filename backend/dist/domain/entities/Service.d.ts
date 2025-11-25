export interface ServiceFeatures {
    included: string[];
    excluded: string[];
    highlights: string[];
}
export declare class Service {
    readonly id: string;
    readonly name: string;
    readonly slug: string;
    readonly shortDescription: string;
    readonly fullDescription: string;
    readonly icon: string;
    readonly basePrice: number;
    readonly isActive: boolean;
    readonly createdAt?: Date | undefined;
    readonly updatedAt?: Date | undefined;
    readonly features?: ServiceFeatures | undefined;
    readonly images?: string[] | undefined;
    constructor(id: string, name: string, slug: string, shortDescription: string, fullDescription: string, icon: string, basePrice: number, isActive?: boolean, createdAt?: Date | undefined, updatedAt?: Date | undefined, features?: ServiceFeatures | undefined, images?: string[] | undefined);
    isAvailable(): boolean;
    calculateDiscount(discountPercent: number): number;
}
//# sourceMappingURL=Service.d.ts.map