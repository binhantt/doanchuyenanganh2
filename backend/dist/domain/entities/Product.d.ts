export declare class Product {
    readonly id: string;
    readonly name: string;
    readonly slug: string;
    readonly description: string;
    readonly price: number;
    readonly category: string;
    readonly categoryId: number | null;
    readonly material: string | null;
    readonly features: string[];
    readonly images: string[];
    readonly stockQuantity: number;
    readonly isFeatured: boolean;
    readonly isActive: boolean;
    readonly createdAt?: Date | undefined;
    readonly updatedAt?: Date | undefined;
    constructor(id: string, name: string, slug: string, description: string, price: number, category: string, categoryId: number | null, material: string | null, features: string[], images: string[], stockQuantity: number, isFeatured?: boolean, isActive?: boolean, createdAt?: Date | undefined, updatedAt?: Date | undefined);
    isAvailable(): boolean;
    calculateDiscount(discountPercent: number): number;
}
//# sourceMappingURL=Product.d.ts.map