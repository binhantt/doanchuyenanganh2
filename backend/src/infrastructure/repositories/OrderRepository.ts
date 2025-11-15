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
  items: string;
  payment_method: 'bank_transfer' | 'momo' | 'zalopay' | 'cash';
  total_amount: number;
  deposit_amount: number;
  status: 'pending' | 'confirmed' | 'paid' | 'completed' | 'cancelled';
  created_at: Date;
  updated_at: Date;
}

export class OrderRepository implements IOrderRepository {
  private readonly tableName = 'orders';

  private mapRowToEntity(row: OrderRow): Order {
    return new Order(
      row.id,
      row.client_name,
      row.client_email,
      row.client_phone,
      new Date(row.wedding_date),
      row.guest_count,
      row.venue,
      row.notes,
      JSON.parse(row.items),
      row.payment_method,
      Number(row.total_amount),
      Number(row.deposit_amount),
      row.status,
      new Date(row.created_at),
      new Date(row.updated_at)
    );
  }

  async findAll(): Promise<Order[]> {
    const rows = await db<OrderRow>(this.tableName).select('*').orderBy('created_at', 'desc');
    return rows.map((row) => this.mapRowToEntity(row));
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
    return rows.map((row) => this.mapRowToEntity(row));
  }

  async findByStatus(status: string): Promise<Order[]> {
    const rows = await db<OrderRow>(this.tableName)
      .where({ status })
      .orderBy('wedding_date', 'asc')
      .select('*');
    return rows.map((row) => this.mapRowToEntity(row));
  }

  async findByDateRange(startDate: Date, endDate: Date): Promise<Order[]> {
    const rows = await db<OrderRow>(this.tableName)
      .whereBetween('wedding_date', [startDate, endDate])
      .orderBy('wedding_date', 'asc')
      .select('*');
    return rows.map((row) => this.mapRowToEntity(row));
  }

  async create(order: Order): Promise<Order> {
    await db(this.tableName).insert({
      id: order.id,
      client_name: order.clientName,
      client_email: order.clientEmail,
      client_phone: order.clientPhone,
      wedding_date: order.weddingDate,
      guest_count: order.guestCount,
      venue: order.venue,
      notes: order.notes,
      items: JSON.stringify(order.items),
      payment_method: order.paymentMethod,
      total_amount: order.totalAmount,
      deposit_amount: order.depositAmount,
      status: order.status,
    });

    return order;
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

    updateData.updated_at = db.fn.now();

    const updated = await db(this.tableName).where({ id }).update(updateData);

    if (updated === 0) {
      return null;
    }

    return this.findById(id);
  }

  async delete(id: string): Promise<boolean> {
    const deleted = await db(this.tableName).where({ id }).del();
    return deleted > 0;
  }
}
