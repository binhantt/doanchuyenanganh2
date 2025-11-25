"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.up = up;
exports.down = down;
async function up(knex) {
    return knex.schema.createTable('promotions', (table) => {
        table.uuid('id').primary();
        table.string('code', 50).notNullable().unique();
        table.string('title', 200).notNullable();
        table.text('description').notNullable();
        table.enum('discount_type', ['percentage', 'fixed']).notNullable();
        table.decimal('discount_value', 10, 2).notNullable();
        table.decimal('max_discount', 15, 2).nullable();
        table.decimal('min_order_amount', 15, 2).nullable();
        table.json('applicable_services').nullable(); // JSON array of service IDs
        table.json('applicable_packages').nullable(); // JSON array of package IDs
        table.datetime('start_date').notNullable();
        table.datetime('end_date').notNullable();
        table.boolean('is_active').defaultTo(true);
        table.timestamps(true, true);
        table.index('code');
        table.index('is_active');
        table.index('start_date');
        table.index('end_date');
    });
}
async function down(knex) {
    return knex.schema.dropTable('promotions');
}
//# sourceMappingURL=20251116100000_create_promotions.js.map