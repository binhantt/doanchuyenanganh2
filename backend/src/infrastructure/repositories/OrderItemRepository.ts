import { OrderItem } from '../../domain/entities/OrderItem';
import { db } from '../database/connection';

interface OrderItemRow {
  id: string;
  order_id: string;
  product_id: string | null;
  package_id: string | null;
  service_id: string | null;
  item_type: 'product' | 'package' | 'service' | 'menu';
  item_name: string;
  description: string | null;
  quantity: number;
  unit_price: number;
  subtotal: number;
  created_at: Date;
  updated_at: Date;
}

export class OrderItemRepository {
  private readonly tableName = 'order_items';

  private mapRowToEntity(row: OrderItemRow): OrderItem {
    return new OrderItem(
      row.id,
      row.order_id,
      row.product_id,
      row.package_id,
      row.service_id,
      row.item_type,
      row.item_name,
      row.description,
      row.quantity,
      Number(row.unit_price),
      Number(row.subtotal),
      new Date(row.created_at),
      new Date(row.updated_at)
    );
  }

  async findByOrderId(orderId: string): Promise<OrderItem[]> {
    const rows = await db<OrderItemRow>(this.tableName)
      .where({ order_id: orderId })
      .select('*');
    return rows.map((row) => this.mapRowToEntity(row));
  }

  async findById(id: string): Promise<OrderItem | null> {
    const row = await db<OrderItemRow>(this.tableName).where({ id }).first();
    return row ? this.mapRowToEntity(row) : null;
  }

  async create(item: OrderItem): Promise<OrderItem> {
    await db(this.tableName).insert({
      id: item.id,
      order_id: item.orderId,
      product_id: item.productId,
      package_id: item.packageId,
      service_id: item.serviceId,
      item_type: item.itemType,
      item_name: item.itemName,
      description: item.description,
      quantity: item.quantity,
      unit_price: item.unitPrice,
      subtotal: item.subtotal,
    });

    return item;
  }

  async createBulk(items: OrderItem[]): Promise<OrderItem[]> {
    const data = items.map((item) => ({
      id: item.id,
      order_id: item.orderId,
      product_id: item.productId,
      package_id: item.packageId,
      service_id: item.serviceId,
      item_type: item.itemType,
      item_name: item.itemName,
      description: item.description,
      quantity: item.quantity,
      unit_price: item.unitPrice,
      subtotal: item.subtotal,
    }));

    await db(this.tableName).insert(data);
    return items;
  }

  async update(id: string, data: Partial<OrderItem>): Promise<OrderItem | null> {
    const updateData: any = {};

    if (data.quantity !== undefined) updateData.quantity = data.quantity;
    if (data.unitPrice !== undefined) updateData.unit_price = data.unitPrice;
    if (data.subtotal !== undefined) updateData.subtotal = data.subtotal;
    if (data.description !== undefined) updateData.description = data.description;

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

  async deleteByOrderId(orderId: string): Promise<boolean> {
    const deleted = await db(this.tableName).where({ order_id: orderId }).del();
    return deleted > 0;
  }
}
