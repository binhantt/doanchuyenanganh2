export class Decoration {
  constructor(
    public readonly id: string,
    public readonly name: string,
    public readonly slug: string,
    public readonly description: string,
    public readonly theme: string,
    public readonly style: string,
    public readonly basePrice: number,
    public readonly features: string[],
    public readonly images: string[],
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
