export class Product {
  constructor(
    public readonly id: string,
    public readonly name: string,
    public readonly slug: string,
    public readonly description: string,
    public readonly price: number,
    public readonly category: string,
    public readonly material: string,
    public readonly features: string[],
    public readonly images: string[],
    public readonly stockQuantity: number = 0,
    public readonly isFeatured: boolean = false,
    public readonly isActive: boolean = true,
    public readonly createdAt?: Date,
    public readonly updatedAt?: Date
  ) {}

  isAvailable(): boolean {
    return this.isActive && this.stockQuantity > 0;
  }

  hasStock(quantity: number = 1): boolean {
    return this.stockQuantity >= quantity;
  }

  calculateDiscount(discountPercent: number): number {
    return this.price * (1 - discountPercent / 100);
  }

  getPrimaryImage(): string | null {
    return this.images.length > 0 ? this.images[0] : null;
  }
}
