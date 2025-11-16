export class Package {
  constructor(
    public readonly id: string,
    public readonly name: string,
    public readonly slug: string,
    public readonly description: string,
    public readonly price: number,
    public readonly features: string[],
    public readonly isPopular: boolean = false,
    public readonly isActive: boolean = true,
    public readonly images: string[] = [],
    public readonly createdAt?: Date,
    public readonly updatedAt?: Date
  ) {}

  isAvailable(): boolean {
    return this.isActive;
  }

  hasFeature(feature: string): boolean {
    return this.features.includes(feature);
  }

  calculateDiscount(discountPercent: number): number {
    return this.price * (1 - discountPercent / 100);
  }
}
