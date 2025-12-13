import { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
  const exists = await knex.schema.hasTable('testimonials');
  if (exists) return;
  
  await knex.schema.createTable('testimonials', (table) => {
    table.uuid('id').primary();
    table.string('client_name', 255).notNullable();
    table.string('client_role', 255).notNullable();
    table.text('content').notNullable();
    table.integer('rating').notNullable().checkBetween([1, 5]);
    table.date('event_date').notNullable();
    table.string('location', 255).notNullable();
    table.string('language', 10).notNullable().defaultTo('vi');
    table.boolean('is_active').notNullable().defaultTo(true);
    table.timestamp('created_at').defaultTo(knex.fn.now());
    table.timestamp('updated_at').defaultTo(knex.fn.now());

    // Indexes
    table.index('is_active');
    table.index('language');
    table.index('rating');
    table.index(['is_active', 'language']);
  });
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.dropTableIfExists('testimonials');
}
