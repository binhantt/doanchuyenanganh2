"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.up = up;
exports.down = down;
async function up(knex) {
    return knex.schema.createTable('packages', (table) => {
        table.uuid('id').primary();
        table.string('name', 200).notNullable();
        table.string('slug', 200).notNullable().unique();
        table.text('description').notNullable();
        table.decimal('price', 15, 2).notNullable();
        table.text('features').notNullable(); // JSON array
        table.boolean('is_popular').defaultTo(false);
        table.boolean('is_active').defaultTo(true);
        table.timestamps(true, true);
        table.index('slug');
        table.index('is_popular');
        table.index('is_active');
    });
}
async function down(knex) {
    return knex.schema.dropTable('packages');
}
//# sourceMappingURL=20251115054000_create_packages.js.map