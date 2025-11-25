"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.up = up;
exports.down = down;
async function up(knex) {
    return knex.schema.createTable('galleries', (table) => {
        table.uuid('id').primary();
        table.string('title', 200).notNullable();
        table.string('alt_text', 200).nullable();
        table.string('file_name', 255).notNullable();
        table.string('file_path', 500).notNullable();
        table.string('file_url', 500).notNullable();
        table.string('mime_type', 100).notNullable();
        table.integer('file_size').notNullable(); // in bytes
        table.integer('width').nullable();
        table.integer('height').nullable();
        table.string('category', 100).notNullable().defaultTo('general'); // product, decoration, service, general
        table.uuid('related_id').nullable(); // ID của product, decoration, etc.
        table.string('related_type', 50).nullable(); // 'product', 'decoration', 'service'
        table.integer('display_order').defaultTo(0);
        table.boolean('is_primary').defaultTo(false);
        table.boolean('is_active').defaultTo(true);
        table.timestamps(true, true);
        table.index('category');
        table.index('related_id');
        table.index('related_type');
        table.index('is_active');
        table.index(['related_id', 'related_type']);
    });
}
async function down(knex) {
    return knex.schema.dropTable('galleries');
}
//# sourceMappingURL=20251115045000_create_galleries.js.map