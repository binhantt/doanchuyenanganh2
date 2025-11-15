import { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable('decorations', (table) => {
    table.uuid('id').primary();
    table.string('name', 200).notNullable();
    table.string('slug', 200).notNullable().unique();
    table.text('description').notNullable();
    table.string('theme', 100).notNullable();
    table.string('style', 100).notNullable();
    table.decimal('base_price', 15, 2).notNullable();
    table.text('features').notNullable(); // JSON array
    table.text('images').notNullable(); // JSON array
    table.boolean('is_active').defaultTo(true);
    table.timestamps(true, true);

    table.index('slug');
    table.index('theme');
    table.index('style');
    table.index('is_active');
  });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTable('decorations');
}
