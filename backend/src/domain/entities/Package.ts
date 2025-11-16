export interface PackageFeatures {
  included: string[];
  excluded?: string[];
  highlights?: string[];
}

export class Package {
  constructor(
    public readonly id: string,
    public readonly name: string,
    public readonly slug: string,
    public readonly description: string,
    public readonly price: number,
    public readonly features: PackageFeatures,
    public readonly images: string[] = [],
    public readonly isPopular: boolean = false,
    public readonly isActive: boolean = true,
    public readonly createdAt?: Date,
    public readonly updatedAt?: Date
  ) {}

  isAvailable(): boolean {
    return this.isActive;
  }

  calculateDiscount(discountPercent: number): number {
    return this.price * (1 - discountPercent / 100);
  }
}
