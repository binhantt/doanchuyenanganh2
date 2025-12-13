import { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
  return knex.schema.table('invitations', (table) => {
    table.text('story').nullable().after('recipient_name');
    table.text('invitation_message').nullable().after('story');
    table.json('gallery').nullable().after('avatar_image');
    table.string('discount_code', 50).nullable().after('gallery');
  });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.table('invitations', (table) => {
    table.dropColumn('story');
    table.dropColumn('invitation_message');
    table.dropColumn('gallery');
    table.dropColumn('discount_code');
  });
}

