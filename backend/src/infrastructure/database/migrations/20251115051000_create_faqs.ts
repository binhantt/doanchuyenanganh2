import { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable('faqs', (table) => {
    table.uuid('id').primary();
    table.string('question', 500).notNullable();
    table.text('answer').notNullable();
    table.string('category', 100).notNullable();
    table.string('language', 10).notNullable().defaultTo('en');
    table.integer('display_order').notNullable().defaultTo(0);
    table.boolean('is_active').defaultTo(true);
    table.timestamps(true, true);

    table.index('category');
    table.index('language');
    table.index('is_active');
    table.index(['category', 'language']);
    table.index('display_order');
  });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTable('faqs');
}
