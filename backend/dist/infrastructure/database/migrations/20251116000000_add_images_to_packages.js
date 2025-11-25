"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.up = up;
exports.down = down;
async function up(knex) {
    return knex.schema.table('packages', (table) => {
        table.text('images').nullable().defaultTo('[]'); // JSON array
    });
}
async function down(knex) {
    return knex.schema.table('packages', (table) => {
        table.dropColumn('images');
    });
}
//# sourceMappingURL=20251116000000_add_images_to_packages.js.map