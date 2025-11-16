import { IOrderRepository } from '../../domain/repositories/IOrderRepository';
import { Order, OrderItem } from '../../domain/entities/Order';
import knex from 'knex';
import databaseConfig from '../config/database';

const db = knex(databaseConfig);

interface OrderRow {
  id: string;
  client_name: string;
  client_email: string;
  client_phone: string;
  wedding_date: Date;
  guest_count: number;
  venue: string;
  notes: string;
  payment_method: 'bank_transfer' | 'momo' | 'zalopay' | 'cash';
  total_amount: number;
  deposit_amount: number;
  status: 'pending' | 'confirmed' | 'paid' | 'completed' | 'cancelled';
  promotion_id: string | null;
  promotion_code: string | null;
  discount_amount: number;
  final_amount: number;
  created_at: Date;
  updated_at: Date;
}

export class OrderRepository implements IOrderRepository {
  private readonly tableName = 'orders';

  private async loadOrderItems(orderId: string): Promise<OrderItem[]> {
    const items = await db('order_items')
      .where({ order_id: orderId })
      .select('*');

    return items.map((item) => ({
      id: item.id,
      productId: item.product_id,
      productName: item.item_name,
      productType: item.item_type,
      quantity: item.quantity,
      unitPrice: Number(item.unit_price),
      subtotal: Number(item.subtotal),
      description: item.description,
    }));
  }

  private async mapRowToEntity(row: OrderRow): Promise<Order> {
    const items = await this.loadOrderItems(row.id);

    return new Order(
      row.id,
      row.client_name,
      row.client_email,
      row.client_phone,
      new Date(row.wedding_date),
      row.guest_count,
      row.venue,
      row.notes,
      items,
      row.payment_method,
      Number(row.total_amount),
      Number(row.deposit_amount),
      row.status,
      row.promotion_id,
      row.promotion_code,
      Number(row.discount_amount),
      Number(row.final_amount),
      new Date(row.created_at),
      new Date(row.updated_at)
    );
  }

  async findAll(): Promise<Order[]> {
    const rows = await db<OrderRow>(this.tableName).select('*').orderBy('created_at', 'desc');
    return Promise.all(rows.map((row) => this.mapRowToEntity(row)));
  }

  async findById(id: string): Promise<Order | null> {
    const row = await db<OrderRow>(this.tableName).where({ id }).first();
    return row ? this.mapRowToEntity(row) : null;
  }

  async findByEmail(email: string): Promise<Order[]> {
    const rows = await db<OrderRow>(this.tableName)
      .where({ client_email: email })
      .orderBy('created_at', 'desc')
      .select('*');
    return Promise.all(rows.map((row) => this.mapRowToEntity(row)));
  }

  async findByStatus(status: string): Promise<Order[]> {
    const rows = await db<OrderRow>(this.tableName)
      .where('status', status)
      .orderBy('wedding_date', 'asc')
      .select('*');
    return Promise.all(rows.map((row) => this.mapRowToEntity(row)));
  }

  async findByDateRange(startDate: Date, endDate: Date): Promise<Order[]> {
    const rows = await db<OrderRow>(this.tableName)
      .whereBetween('wedding_date', [startDate, endDate])
      .orderBy('wedding_date', 'asc')
      .select('*');
    return Promise.all(rows.map((row) => this.mapRowToEntity(row)));
  }

  async create(order: Order): Promise<Order> {
    const trx = await db.transaction();

    try {
      // Insert order
      await trx(this.tableName).insert({
        id: order.id,
        client_name: order.clientName,
        client_email: order.clientEmail,
        client_phone: order.clientPhone,
        wedding_date: order.weddingDate,
        guest_count: order.guestCount,
        venue: order.venue,
        notes: order.notes,
        payment_method: order.paymentMethod,
        total_amount: order.totalAmount,
        deposit_amount: order.depositAmount,
        status: order.status,
        promotion_id: order.promotionId,
        promotion_code: order.promotionCode,
        discount_amount: order.discountAmount,
        final_amount: order.finalAmount,
      });

      // Insert order items
      const { v4: uuidv4 } = require('uuid');
      for (const item of order.items) {
        const itemData: any = {
          id: item.id || uuidv4(), // Generate UUID if not provided
          order_id: order.id,
          item_name: item.productName,
          item_type: item.productType,
          quantity: item.quantity,
          unit_price: item.unitPrice,
          subtotal: item.subtotal,
          description: item.description || null,
        };

        // Set the correct foreign key based on item type
        if (item.productType === 'package') {
          itemData.package_id = item.productId;
        } else if (item.productType === 'service') {
          itemData.service_id = item.productId;
        } else if (item.productType === 'product') {
          itemData.product_id = item.productId;
        }

        await trx('order_items').insert(itemData);
      }

      await trx.commit();
      return order;
    } catch (error) {
      await trx.rollback();
      console.error('Error creating order:', error);
      throw error;
    }
  }

  async update(id: string, data: Partial<Order>): Promise<Order | null> {
    const updateData: any = {};

    if (data.clientName) updateData.client_name = data.clientName;
    if (data.clientEmail) updateData.client_email = data.clientEmail;
    if (data.clientPhone) updateData.client_phone = data.clientPhone;
    if (data.weddingDate) updateData.wedding_date = data.weddingDate;
    if (data.guestCount !== undefined) updateData.guest_count = data.guestCount;
    if (data.venue) updateData.venue = data.venue;
    if (data.notes) updateData.notes = data.notes;
    if (data.items) updateData.items = JSON.stringify(data.items);
    if (data.paymentMethod) updateData.payment_method = data.paymentMethod;
    if (data.totalAmount !== undefined) updateData.total_amount = data.totalAmount;
    if (data.depositAmount !== undefined) updateData.deposit_amount = data.depositAmount;
    if (data.status) updateData.status = data.status;
    if (data.promotionId !== undefined) updateData.promotion_id = data.promotionId;
    if (data.promotionCode !== undefined) updateData.promotion_code = data.promotionCode;
    if (data.discountAmount !== undefined) updateData.discount_amount = data.discountAmount;
    if (data.finalAmount !== undefined) updateData.final_amount = data.finalAmount;

    updateData.updated_at = db.fn.now();

    const updated = await db(this.tableName).where({ id }).update(updateData);

    if (updated === 0) {
      return null;
    }

    return this.findById(id);
  }

  async delete(id: string): Promise<boolean> {
    const trx = await db.transaction();

    try {
      // Delete order items first
      await trx('order_items').where({ order_id: id }).del();

      // Delete order
      const deleted = await trx(this.tableName).where({ id }).del();

      await trx.commit();
      return deleted > 0;
    } catch (error) {
      await trx.rollback();
      throw error;
    }
  }
}
