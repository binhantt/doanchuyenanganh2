export declare class Decoration {
    readonly id: string;
    readonly name: string;
    readonly slug: string;
    readonly description: string;
    readonly theme: string;
    readonly style: string;
    readonly basePrice: number;
    readonly features: string[];
    readonly images: string[];
    readonly isActive: boolean;
    readonly createdAt?: Date | undefined;
    readonly updatedAt?: Date | undefined;
    constructor(id: string, name: string, slug: string, description: string, theme: string, style: string, basePrice: number, features: string[], images: string[], isActive?: boolean, createdAt?: Date | undefined, updatedAt?: Date | undefined);
    isAvailable(): boolean;
    hasFeature(feature: string): boolean;
    calculatePrice(quantity?: number): number;
}
//# sourceMappingURL=Decoration.d.ts.map