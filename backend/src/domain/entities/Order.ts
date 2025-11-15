export class Order {
  constructor(
    public readonly id: string,
    public readonly clientName: string,
    public readonly clientEmail: string,
    public readonly clientPhone: string,
    public readonly weddingDate: Date,
    public readonly guestCount: number,
    public readonly venue: string,
    public readonly notes: string,
    public readonly items: OrderItem[],
    public readonly paymentMethod: 'bank_transfer' | 'momo' | 'zalopay' | 'cash',
    public readonly totalAmount: number,
    public readonly depositAmount: number,
    public readonly status: 'pending' | 'confirmed' | 'paid' | 'completed' | 'cancelled' = 'pending',
    public readonly createdAt?: Date,
    public readonly updatedAt?: Date
  ) {}

  isPending(): boolean {
    return this.status === 'pending';
  }

  isPaid(): boolean {
    return this.status === 'paid';
  }

  getDisplayDate(): string {
    return this.weddingDate.toLocaleDateString('vi-VN', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  }

  calculateTotal(): number {
    return this.items.reduce((sum, item) => sum + item.subtotal, 0);
  }
}

export interface OrderItem {
  id: string;
  productId: string;
  productName: string;
  productType: 'package' | 'service' | 'product' | 'menu';
  quantity: number;
  unitPrice: number;
  subtotal: number;
  description?: string;
}
