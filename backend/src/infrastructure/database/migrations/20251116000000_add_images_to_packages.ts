import { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
  return knex.schema.table('packages', (table) => {
    table.text('images').nullable().defaultTo('[]'); // JSON array
  });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.table('packages', (table) => {
    table.dropColumn('images');
  });
}
