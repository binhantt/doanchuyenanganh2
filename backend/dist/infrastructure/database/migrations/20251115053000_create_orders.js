"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.up = up;
exports.down = down;
async function up(knex) {
    return knex.schema.createTable('orders', (table) => {
        table.uuid('id').primary();
        table.string('client_name', 200).notNullable();
        table.string('client_email', 200).notNullable();
        table.string('client_phone', 20).notNullable();
        table.date('wedding_date').notNullable();
        table.integer('guest_count').notNullable();
        table.string('venue', 300).notNullable();
        table.text('notes').nullable();
        table.json('items').notNullable();
        table.enum('payment_method', ['bank_transfer', 'momo', 'zalopay', 'cash']).notNullable();
        table.decimal('total_amount', 15, 2).notNullable();
        table.decimal('deposit_amount', 15, 2).notNullable();
        table.enum('status', ['pending', 'confirmed', 'paid', 'completed', 'cancelled']).defaultTo('pending');
        table.timestamps(true, true);
        table.index('client_email');
        table.index('wedding_date');
        table.index('status');
    });
}
async function down(knex) {
    return knex.schema.dropTable('orders');
}
//# sourceMappingURL=20251115053000_create_orders.js.map