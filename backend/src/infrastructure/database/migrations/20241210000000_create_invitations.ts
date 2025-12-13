import { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable('invitations', (table) => {
    table.uuid('id').primary();
    table.uuid('user_id').notNullable();
    table.integer('template_id').notNullable();
    table.string('groom_name', 255).notNullable();
    table.string('bride_name', 255).notNullable();
    table.date('wedding_date').notNullable();
    table.time('wedding_time').notNullable();
    table.string('venue', 255).notNullable();
    table.text('venue_address').notNullable();
    table.string('recipient_name', 255).notNullable();
    table.text('message').nullable();
    table.string('share_url', 255).notNullable().unique();
    table.boolean('is_active').defaultTo(true);
    table.timestamps(true, true);

    // Foreign key
    table.foreign('user_id').references('id').inTable('users').onDelete('CASCADE');

    // Indexes
    table.index('user_id');
    table.index('share_url');
  });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTableIfExists('invitations');
}
