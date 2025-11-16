import { Order, OrderItem } from '../../domain/entities/Order';

export interface IOrderService {
  getAllOrders(): Promise<Order[]>;
  getOrderById(id: string): Promise<Order | null>;
  getOrdersByEmail(email: string): Promise<Order[]>;
  getOrdersByStatus(status: string): Promise<Order[]>;
  getOrdersByDateRange(startDate: Date, endDate: Date): Promise<Order[]>;
  createOrder(data: {
    clientName: string;
    clientEmail: string;
    clientPhone: string;
    weddingDate: Date;
    guestCount: number;
    venue: string;
    notes?: string;
    items: OrderItem[];
    paymentMethod: 'bank_transfer' | 'momo' | 'zalopay' | 'cash';
    promotionCode?: string;
    discountAmount?: number;
  }): Promise<Order>;
  updateOrder(id: string, data: Partial<Order>): Promise<Order | null>;
  deleteOrder(id: string): Promise<boolean>;
  applyVoucher(
    voucherCode: string,
    totalAmount: number
  ): Promise<{
    valid: boolean;
    message?: string;
    voucherCode?: string;
    discountAmount?: number;
    finalAmount?: number;
    discountType?: string;
    discountValue?: number;
  }>;
}
