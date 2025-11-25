"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.up = up;
exports.down = down;
async function up(knex) {
    return knex.schema.alterTable('products', (table) => {
        table.integer('category_id').unsigned().nullable();
        table.foreign('category_id').references('id').inTable('categories').onDelete('SET NULL');
        table.index('category_id');
    });
}
async function down(knex) {
    return knex.schema.alterTable('products', (table) => {
        table.dropForeign(['category_id']);
        table.dropColumn('category_id');
    });
}
//# sourceMappingURL=20251119001000_add_category_to_products.js.map