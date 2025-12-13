import { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
  return knex.schema.table('invitations', (table) => {
    table.text('avatar_image').nullable().after('cover_image');
  });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.table('invitations', (table) => {
    table.dropColumn('avatar_image');
  });
}
