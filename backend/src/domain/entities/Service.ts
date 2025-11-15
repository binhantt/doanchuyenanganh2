export class Service {
  constructor(
    public readonly id: string,
    public readonly name: string,
    public readonly slug: string,
    public readonly shortDescription: string,
    public readonly fullDescription: string,
    public readonly icon: string,
    public readonly features: string[],
    public readonly basePrice: number,
    public readonly isActive: boolean = true,
    public readonly createdAt?: Date,
    public readonly updatedAt?: Date
  ) {}

  isAvailable(): boolean {
    return this.isActive;
  }

  hasFeature(feature: string): boolean {
    return this.features.includes(feature);
  }

  calculatePrice(quantity: number = 1): number {
    return this.basePrice * quantity;
  }
}
