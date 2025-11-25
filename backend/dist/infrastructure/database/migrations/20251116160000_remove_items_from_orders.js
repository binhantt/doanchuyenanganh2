"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.up = up;
exports.down = down;
async function up(knex) {
    // Remove items column from orders table since we're using order_items table now
    await knex.schema.alterTable('orders', (table) => {
        table.dropColumn('items');
    });
}
async function down(knex) {
    // Add items column back if we need to rollback
    await knex.schema.alterTable('orders', (table) => {
        table.json('items').nullable();
    });
}
//# sourceMappingURL=20251116160000_remove_items_from_orders.js.map