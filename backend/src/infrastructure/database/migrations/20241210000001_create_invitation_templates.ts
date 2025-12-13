import { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable('invitation_templates', (table) => {
    table.increments('id').primary();
    table.string('name', 255).notNullable();
    table.text('description').nullable();
    table.string('thumbnail_url', 500).nullable();
    table.decimal('price', 10, 2).notNullable().defaultTo(0);
    table.json('design_config').nullable(); // Lưu cấu hình thiết kế (colors, fonts, layout)
    table.string('category', 100).nullable(); // classic, modern, minimal, floral, etc.
    table.boolean('is_active').defaultTo(true);
    table.integer('usage_count').defaultTo(0); // Số lần được sử dụng
    table.timestamps(true, true);

    // Indexes
    table.index('is_active');
    table.index('category');
    table.index('price');
  });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTableIfExists('invitation_templates');
}
