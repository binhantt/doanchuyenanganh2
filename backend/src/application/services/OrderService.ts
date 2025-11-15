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

    const totalAmount = data.items.reduce((sum, item) => sum + item.subtotal, 0);
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
      'pending'
    );

    return this.orderRepository.create(order);
  }

  async updateOrder(id: string, data: Partial<Order>): Promise<Order | null> {
    return this.orderRepository.update(id, data);
  }

  async deleteOrder(id: string): Promise<boolean> {
    return this.orderRepository.delete(id);
  }
}
