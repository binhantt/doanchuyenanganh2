export type DiscountType = 'percentage' | 'fixed';

export class Voucher {
  constructor(
    public readonly id: string,
    public readonly code: string,
    public readonly name: string,
    public readonly description: string | null,
    public readonly discountType: DiscountType,
    public readonly discountValue: number,
    public readonly maxDiscountAmount: number | null,
    public readonly minOrderValue: number | null,
    public readonly usageLimit: number | null,
    public readonly usedCount: number,
    public readonly usagePerCustomer: number | null,
    public readonly startDate: Date | null,
    public readonly endDate: Date | null,
    public readonly isActive: boolean,
    public readonly createdAt?: Date,
    public readonly updatedAt?: Date
  ) {}

  isValid(): boolean {
    if (!this.isActive) return false;

    const now = new Date();
    if (this.startDate && now < this.startDate) return false;
    if (this.endDate && now > this.endDate) return false;

    if (this.usageLimit && this.usedCount >= this.usageLimit) return false;

    return true;
  }

  canBeUsedForOrder(orderAmount: number): boolean {
    if (!this.isValid()) return false;
    if (this.minOrderValue && orderAmount < this.minOrderValue) return false;
    return true;
  }

  calculateDiscount(orderAmount: number): number {
    if (!this.canBeUsedForOrder(orderAmount)) return 0;

    let discount = 0;
    if (this.discountType === 'percentage') {
      discount = (orderAmount * this.discountValue) / 100;
      if (this.maxDiscountAmount && discount > this.maxDiscountAmount) {
        discount = this.maxDiscountAmount;
      }
    } else {
      discount = this.discountValue;
    }

    // Đảm bảo giảm giá không vượt quá tổng tiền
    if (discount > orderAmount) {
      discount = orderAmount;
    }

    return discount;
  }
}
