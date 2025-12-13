import { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
  return knex.schema.table('invitations', (table) => {
    table.text('cover_image').nullable().after('message');
  });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.table('invitations', (table) => {
    table.dropColumn('cover_image');
  });
}
