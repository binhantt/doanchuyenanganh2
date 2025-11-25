"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.up = up;
exports.down = down;
async function up(knex) {
    return knex.schema.createTable('faqs', (table) => {
        table.uuid('id').primary();
        table.string('question', 500).notNullable();
        table.text('answer').notNullable();
        table.string('category', 100).notNullable();
        table.string('language', 10).notNullable().defaultTo('en');
        table.integer('display_order').notNullable().defaultTo(0);
        table.boolean('is_active').defaultTo(true);
        table.timestamps(true, true);
        table.index('category');
        table.index('language');
        table.index('is_active');
        table.index(['category', 'language']);
        table.index('display_order');
    });
}
async function down(knex) {
    return knex.schema.dropTable('faqs');
}
//# sourceMappingURL=20251115051000_create_faqs.js.map