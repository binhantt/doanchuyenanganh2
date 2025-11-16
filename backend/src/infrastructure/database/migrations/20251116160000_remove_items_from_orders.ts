import { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
  // Remove items column from orders table since we're using order_items table now
  await knex.schema.alterTable('orders', (table) => {
    table.dropColumn('items');
  });
}

export async function down(knex: Knex): Promise<void> {
  // Add items column back if we need to rollback
  await knex.schema.alterTable('orders', (table) => {
    table.json('items').nullable();
  });
}
