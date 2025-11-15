import { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable('products', (table) => {
    table.uuid('id').primary();
    table.string('name', 200).notNullable();
    table.string('slug', 200).notNullable().unique();
    table.text('description').notNullable();
    table.decimal('price', 15, 2).notNullable();
    table.string('category', 100).notNullable(); // Nhẫn, Dây chuyền, Vòng tay, etc.
    table.string('material', 100).notNullable(); // Vàng 18K, Vàng 24K, Bạc, etc.
    table.text('features').notNullable(); // JSON array
    table.text('images').notNullable(); // JSON array of image URLs
    table.integer('stock_quantity').defaultTo(0);
    table.boolean('is_featured').defaultTo(false);
    table.boolean('is_active').defaultTo(true);
    table.timestamps(true, true);

    table.index('slug');
    table.index('category');
    table.index('is_active');
    table.index('is_featured');
  });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTable('products');
}
