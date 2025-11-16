export class Promotion {
  constructor(
    public readonly id: string,
    public readonly code: string,
    public readonly title: string,
    public readonly description: string,
    public readonly discountType: 'percentage' | 'fixed',
    public readonly discountValue: number,
    public readonly maxDiscount: number | null,
    public readonly minOrderAmount: number | null,
    public readonly applicableServices: string[] | null,
    public readonly applicablePackages: string[] | null,
    public readonly startDate: Date,
    public readonly endDate: Date,
    public readonly isActive: boolean,
    public readonly createdAt?: Date,
    public readonly updatedAt?: Date
  ) {}

  isValid(): boolean {
    return this.isActive && new Date() >= this.startDate && new Date() <= this.endDate;
  }

  canApplyToService(serviceId: string): boolean {
    if (!this.applicableServices) return true;
    return this.applicableServices.includes(serviceId);
  }

  canApplyToPackage(packageId: string): boolean {
    if (!this.applicablePackages) return true;
    return this.applicablePackages.includes(packageId);
  }

  calculateDiscount(amount: number): number {
    if (this.discountType === 'percentage') {
      const discount = (amount * this.discountValue) / 100;
      return this.maxDiscount ? Math.min(discount, this.maxDiscount) : discount;
    }
    return this.discountValue;
  }
}
