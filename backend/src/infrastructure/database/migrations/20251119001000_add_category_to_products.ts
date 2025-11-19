import { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
  return knex.schema.alterTable('products', (table) => {
    table.integer('category_id').unsigned().nullable();
    table.foreign('category_id').references('id').inTable('categories').onDelete('SET NULL');
    table.index('category_id');
  });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.alterTable('products', (table) => {
    table.dropForeign(['category_id']);
    table.dropColumn('category_id');
  });
}
