import { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
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

export async function down(knex: Knex): Promise<void> {
  await knex.schema.dropTableIfExists('vouchers');
}
