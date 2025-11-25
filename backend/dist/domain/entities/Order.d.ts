export declare class Order {
    readonly id: string;
    readonly clientName: string;
    readonly clientEmail: string;
    readonly clientPhone: string;
    readonly weddingDate: Date;
    readonly guestCount: number;
    readonly venue: string;
    readonly notes: string;
    readonly items: OrderItem[];
    readonly paymentMethod: 'bank_transfer' | 'momo' | 'zalopay' | 'cash';
    readonly totalAmount: number;
    readonly depositAmount: number;
    readonly status: 'pending' | 'confirmed' | 'paid' | 'completed' | 'cancelled';
    readonly promotionId?: string | null | undefined;
    readonly promotionCode?: string | null | undefined;
    readonly discountAmount: number;
    readonly finalAmount?: number | undefined;
    readonly createdAt?: Date | undefined;
    readonly updatedAt?: Date | undefined;
    constructor(id: string, clientName: string, clientEmail: string, clientPhone: string, weddingDate: Date, guestCount: number, venue: string, notes: string, items: OrderItem[], paymentMethod: 'bank_transfer' | 'momo' | 'zalopay' | 'cash', totalAmount: number, depositAmount: number, status?: 'pending' | 'confirmed' | 'paid' | 'completed' | 'cancelled', promotionId?: string | null | undefined, promotionCode?: string | null | undefined, discountAmount?: number, finalAmount?: number | undefined, createdAt?: Date | undefined, updatedAt?: Date | undefined);
    isPending(): boolean;
    isPaid(): boolean;
    getDisplayDate(): string;
    calculateTotal(): number;
    calculateFinalAmount(): number;
    hasPromotion(): boolean;
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
//# sourceMappingURL=Order.d.ts.map