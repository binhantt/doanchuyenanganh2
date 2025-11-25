"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.up = up;
exports.down = down;
async function up(knex) {
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
async function down(knex) {
    await knex.schema.dropTableIfExists('testimonials');
}
//# sourceMappingURL=20251119150000_create_testimonials.js.map