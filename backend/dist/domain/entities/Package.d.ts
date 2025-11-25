export interface PackageFeatures {
    included: string[];
    excluded?: string[];
    highlights?: string[];
}
export declare class Package {
    readonly id: string;
    readonly name: string;
    readonly slug: string;
    readonly description: string;
    readonly price: number;
    readonly features: PackageFeatures;
    readonly images: string[];
    readonly isPopular: boolean;
    readonly isActive: boolean;
    readonly createdAt?: Date | undefined;
    readonly updatedAt?: Date | undefined;
    constructor(id: string, name: string, slug: string, description: string, price: number, features: PackageFeatures, images?: string[], isPopular?: boolean, isActive?: boolean, createdAt?: Date | undefined, updatedAt?: Date | undefined);
    isAvailable(): boolean;
    calculateDiscount(discountPercent: number): number;
}
//# sourceMappingURL=Package.d.ts.map