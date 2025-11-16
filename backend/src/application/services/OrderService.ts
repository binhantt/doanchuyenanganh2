import { IOrderService } from '../interfaces/IOrderService';
import { IOrderRepository } from '../../domain/repositories/IOrderRepository';
import { Order, OrderItem } from '../../domain/entities/Order';
import { v4 as uuidv4 } from 'uuid';

export class OrderService implements IOrderService {
  constructor(private readonly orderRepository: IOrderRepository) {}

  async getAllOrders(): Promise<Order[]> {
    return this.orderRepository.findAll();
  }

  async getOrderById(id: string): Promise<Order | null> {
    return this.orderRepository.findById(id);
  }

  async getOrdersByEmail(email: string): Promise<Order[]> {
    return this.orderRepository.findByEmail(email);
  }

  async getOrdersByStatus(status: string): Promise<Order[]> {
    return this.orderRepository.findByStatus(status);
  }

  async getOrdersByDateRange(startDate: Date, endDate: Date): Promise<Order[]> {
    return this.orderRepository.findByDateRange(startDate, endDate);
  }

  async createOrder(data: {
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
  }): Promise<Order> {
    if (!data.clientName || !data.clientEmail || !data.clientPhone || !data.weddingDate || !data.paymentMethod) {
      throw new Error('Missing required fields');
    }

    if (data.guestCount < 1) {
      throw new Error('Guest count must be at least 1');
    }

    if (!data.items || data.items.length === 0) {
      throw new Error('Order must contain at least one item');
    }

    const subtotal = data.items.reduce((sum, item) => sum + item.subtotal, 0);
    const discountAmount = data.discountAmount || 0;
    const totalAmount = subtotal - discountAmount;
    const depositAmount = totalAmount * 0.3;

    const order = new Order(
      uuidv4(),
      data.clientName,
      data.clientEmail,
      data.clientPhone,
      data.weddingDate,
      data.guestCount,
      data.venue,
      data.notes || '',
      data.items,
      data.paymentMethod,
      totalAmount,
      depositAmount,
      'pending',
      null, // promotionId
      data.promotionCode || null,
      discountAmount,
      totalAmount // finalAmount = totalAmount (already discounted)
    );

    return this.orderRepository.create(order);
  }

  async updateOrder(id: string, data: Partial<Order>): Promise<Order | null> {
    return this.orderRepository.update(id, data);
  }

  async deleteOrder(id: string): Promise<boolean> {
    return this.orderRepository.delete(id);
  }

  async applyVoucher(
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
  }> {
    // Import VoucherRepository để kiểm tra voucher
    const { VoucherRepository } = await import('../../infrastructure/repositories/VoucherRepository');
    const voucherRepo = new VoucherRepository();

    // Tìm voucher theo code
    const voucher = await voucherRepo.findByCode(voucherCode);

    if (!voucher) {
      return {
        valid: false,
        message: 'Mã giảm giá không tồn tại',
      };
    }

    if (!voucher.isValid()) {
      return {
        valid: false,
        message: 'Mã giảm giá đã hết hạn hoặc không còn hiệu lực',
      };
    }

    if (!voucher.canBeUsedForOrder(totalAmount)) {
      if (voucher.minOrderValue) {
        return {
          valid: false,
          message: `Đơn hàng phải có giá trị tối thiểu ${voucher.minOrderValue.toLocaleString('vi-VN')}đ`,
        };
      }
      return {
        valid: false,
        message: 'Không thể áp dụng mã giảm giá cho đơn hàng này',
      };
    }

    // Tính toán giảm giá
    const discountAmount = voucher.calculateDiscount(totalAmount);
    const finalAmount = totalAmount - discountAmount;

    return {
      valid: true,
      voucherCode: voucher.code,
      discountAmount,
      finalAmount,
      discountType: voucher.discountType,
      discountValue: voucher.discountValue,
    };
  }
}
