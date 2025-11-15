import { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable('consultations', (table) => {
    table.uuid('id').primary();
    table.string('client_name', 200).notNullable();
    table.string('client_email', 200).notNullable();
    table.string('client_phone', 20).notNullable();
    table.date('wedding_date').notNullable();
    table.integer('guest_count').notNullable();
    table.string('venue', 300).notNullable();
    table.string('service_type', 200).notNullable();
    table.string('budget', 100).notNullable();
    table.text('notes').nullable();
    table.enum('status', ['pending', 'confirmed', 'completed', 'cancelled']).defaultTo('pending');
    table.timestamps(true, true);
    table.index('client_email');
    table.index('wedding_date');
    table.index('status');
  });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTable('consultations');
}
