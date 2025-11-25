"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.up = up;
exports.down = down;
async function up(knex) {
    return knex.schema.createTable('testimonials', (table) => {
        table.uuid('id').primary();
        table.string('client_name', 200).notNullable();
        table.string('client_role', 100).notNullable();
        table.text('content').notNullable();
        table.integer('rating').notNullable().checkBetween([1, 5]);
        table.date('event_date').notNullable();
        table.string('location', 200).notNullable();
        table.string('language', 10).notNullable().defaultTo('en');
        table.boolean('is_active').defaultTo(true);
        table.timestamps(true, true);
        table.index('language');
        table.index('is_active');
        table.index('event_date');
    });
}
async function down(knex) {
    return knex.schema.dropTable('testimonials');
}
//# sourceMappingURL=20251115050000_create_testimonials.js.map