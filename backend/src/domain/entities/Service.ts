export interface ServiceFeatures {
  included: string[];
  excluded: string[];
  highlights: string[];
}

export class Service {
  constructor(
    public readonly id: string,
    public readonly name: string,
    public readonly slug: string,
    public readonly shortDescription: string,
    public readonly fullDescription: string,
    public readonly icon: string,
    public readonly basePrice: number,
    public readonly isActive: boolean = true,
    public readonly createdAt?: Date,
    public readonly updatedAt?: Date,
    public readonly features?: ServiceFeatures,
    public readonly images?: string[]
  ) {}

  isAvailable(): boolean {
    return this.isActive;
  }

  calculateDiscount(discountPercent: number): number {
    return this.basePrice * (1 - discountPercent / 100);
  }
}
