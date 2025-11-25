"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.up = up;
exports.down = down;
async function up(knex) {
    await knex.schema.createTable('vouchers', (table) => {
        table.uuid('id').primary();
        table.string('code', 50).notNullable().unique();
        table.string('name', 200).notNullable();
        table.text('description').nullable();
        table.enum('discount_type', ['percentage', 'fixed']).notNullable();
        table.decimal('discount_value', 15, 2).notNullable();
        table.decimal('max_discount_amount', 15, 2).nullable(); // Giảm tối đa (cho % discount)
        table.decimal('min_order_value', 15, 2).nullable(); // Giá trị đơn hàng tối thiểu
        table.integer('usage_limit').nullable(); // Số lần sử dụng tối đa
        table.integer('used_count').defaultTo(0); // Số lần đã sử dụng
        table.integer('usage_per_customer').nullable(); // Số lần 1 khách hàng có thể dùng
        table.date('start_date').nullable();
        table.date('end_date').nullable();
        table.boolean('is_active').defaultTo(true);
        table.timestamps(true, true);
        // Indexes
        table.index('code');
        table.index('is_active');
        table.index(['start_date', 'end_date']);
    });
}
async function down(knex) {
    await knex.schema.dropTableIfExists('vouchers');
}
//# sourceMappingURL=20251116150000_create_vouchers_table.js.map