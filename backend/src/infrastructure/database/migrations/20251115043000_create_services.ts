import { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable('services', (table) => {
    table.uuid('id').primary();
    table.string('name', 200).notNullable();
    table.string('slug', 200).notNullable().unique();
    table.string('short_description', 500).notNullable();
    table.text('full_description').notNullable();
    table.string('icon', 100).notNullable();
    table.text('features').notNullable(); // JSON array
    table.decimal('base_price', 15, 2).notNullable();
    table.boolean('is_active').defaultTo(true);
    table.timestamps(true, true);

    table.index('slug');
    table.index('is_active');
  });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTable('services');
}
