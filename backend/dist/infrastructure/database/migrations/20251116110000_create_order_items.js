"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.up = up;
exports.down = down;
async function up(knex) {
    // Create order_items table
    await knex.schema.createTable('order_items', (table) => {
        table.uuid('id').primary();
        table.uuid('order_id').notNullable();
        table.uuid('product_id').nullable();
        table.uuid('package_id').nullable();
        table.uuid('service_id').nullable();
        table.enum('item_type', ['product', 'package', 'service', 'menu']).notNullable();
        table.string('item_name', 300).notNullable();
        table.text('description').nullable();
        table.integer('quantity').notNullable().defaultTo(1);
        table.decimal('unit_price', 15, 2).notNullable();
        table.decimal('subtotal', 15, 2).notNullable();
        table.timestamps(true, true);
        // Foreign keys
        table.foreign('order_id').references('id').inTable('orders').onDelete('CASCADE');
        table.foreign('product_id').references('id').inTable('products').onDelete('SET NULL');
        table.foreign('package_id').references('id').inTable('packages').onDelete('SET NULL');
        table.foreign('service_id').references('id').inTable('services').onDelete('SET NULL');
        // Indexes
        table.index('order_id');
        table.index('product_id');
        table.index('package_id');
        table.index('service_id');
        table.index('item_type');
    });
    // Add promotion fields to orders table
    await knex.schema.alterTable('orders', (table) => {
        table.uuid('promotion_id').nullable().after('status');
        table.string('promotion_code', 50).nullable().after('promotion_id');
        table.decimal('discount_amount', 15, 2).defaultTo(0).after('promotion_code');
        table.decimal('final_amount', 15, 2).notNullable().after('discount_amount');
        // Foreign key for promotion
        table.foreign('promotion_id').references('id').inTable('promotions').onDelete('SET NULL');
        // Indexes
        table.index('promotion_code');
    });
    // Remove items JSON column from orders (data migration should be done separately)
    // This will be handled in a separate data migration if needed
}
async function down(knex) {
    // Remove promotion fields from orders
    await knex.schema.alterTable('orders', (table) => {
        table.dropForeign('promotion_id');
        table.dropColumn('promotion_id');
        table.dropColumn('promotion_code');
        table.dropColumn('discount_amount');
        table.dropColumn('final_amount');
    });
    // Drop order_items table
    await knex.schema.dropTable('order_items');
}
//# sourceMappingURL=20251116110000_create_order_items.js.map