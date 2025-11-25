"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.up = up;
exports.down = down;
async function up(knex) {
    return knex.schema.createTable('categories', (table) => {
        table.increments('id').primary();
        table.string('name', 200).notNullable();
        table.string('slug', 200).notNullable().unique();
        table.text('description').nullable();
        table.boolean('is_active').defaultTo(true);
        table.timestamps(true, true);
        table.index('slug');
        table.index('is_active');
    });
}
async function down(knex) {
    return knex.schema.dropTable('categories');
}
//# sourceMappingURL=20251119000000_create_categories.js.map