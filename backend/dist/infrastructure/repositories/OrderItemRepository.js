"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrderItemRepository = void 0;
const OrderItem_1 = require("../../domain/entities/OrderItem");
const connection_1 = require("../database/connection");
class OrderItemRepository {
    constructor() {
        this.tableName = 'order_items';
    }
    mapRowToEntity(row) {
        return new OrderItem_1.OrderItem(row.id, row.order_id, row.product_id, row.package_id, row.service_id, row.item_type, row.item_name, row.description, row.quantity, Number(row.unit_price), Number(row.subtotal), new Date(row.created_at), new Date(row.updated_at));
    }
    async findByOrderId(orderId) {
        const rows = await (0, connection_1.db)(this.tableName)
            .where({ order_id: orderId })
            .select('*');
        return rows.map((row) => this.mapRowToEntity(row));
    }
    async findById(id) {
        const row = await (0, connection_1.db)(this.tableName).where({ id }).first();
        return row ? this.mapRowToEntity(row) : null;
    }
    async create(item) {
        await (0, connection_1.db)(this.tableName).insert({
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
    async createBulk(items) {
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
        await (0, connection_1.db)(this.tableName).insert(data);
        return items;
    }
    async update(id, data) {
        const updateData = {};
        if (data.quantity !== undefined)
            updateData.quantity = data.quantity;
        if (data.unitPrice !== undefined)
            updateData.unit_price = data.unitPrice;
        if (data.subtotal !== undefined)
            updateData.subtotal = data.subtotal;
        if (data.description !== undefined)
            updateData.description = data.description;
        updateData.updated_at = connection_1.db.fn.now();
        const updated = await (0, connection_1.db)(this.tableName).where({ id }).update(updateData);
        if (updated === 0) {
            return null;
        }
        return this.findById(id);
    }
    async delete(id) {
        const deleted = await (0, connection_1.db)(this.tableName).where({ id }).del();
        return deleted > 0;
    }
    async deleteByOrderId(orderId) {
        const deleted = await (0, connection_1.db)(this.tableName).where({ order_id: orderId }).del();
        return deleted > 0;
    }
}
exports.OrderItemRepository = OrderItemRepository;
//# sourceMappingURL=OrderItemRepository.js.map