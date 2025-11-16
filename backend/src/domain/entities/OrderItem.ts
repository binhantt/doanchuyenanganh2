export class OrderItem {
  constructor(
    public readonly id: string,
    public readonly orderId: string,
    public readonly productId: string | null,
    public readonly packageId: string | null,
    public readonly serviceId: string | null,
    public readonly itemType: 'product' | 'package' | 'service' | 'menu',
    public readonly itemName: string,
    public readonly description: string | null,
    public readonly quantity: number,
    public readonly unitPrice: number,
    public readonly subtotal: number,
    public readonly createdAt?: Date,
    public readonly updatedAt?: Date
  ) {}

  isProduct(): boolean {
    return this.itemType === 'product' && !!this.productId;
  }

  isPackage(): boolean {
    return this.itemType === 'package' && !!this.packageId;
  }

  isService(): boolean {
    return this.itemType === 'service' && !!this.serviceId;
  }

  getRelatedId(): string | null {
    switch (this.itemType) {
      case 'product':
        return this.productId;
      case 'package':
        return this.packageId;
      case 'service':
        return this.serviceId;
      default:
        return null;
    }
  }
}
