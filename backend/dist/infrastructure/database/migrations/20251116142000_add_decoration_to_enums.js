"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.up = up;
exports.down = down;
async function up(knex) {
    // MySQL doesn't support ALTER ENUM directly, so we need to recreate the column
    // First, add a temporary column
    await knex.schema.table('features', (table) => {
        table.string('entity_type_temp', 20).nullable();
    });
    // Copy data to temp column
    await knex.raw('UPDATE features SET entity_type_temp = entity_type');
    // Drop old column
    await knex.schema.table('features', (table) => {
        table.dropColumn('entity_type');
    });
    // Create new column with updated enum
    await knex.schema.table('features', (table) => {
        table.enum('entity_type', ['package', 'product', 'service', 'decoration']).notNullable().after('entity_id');
    });
    // Copy data back
    await knex.raw('UPDATE features SET entity_type = entity_type_temp');
    // Drop temp column
    await knex.schema.table('features', (table) => {
        table.dropColumn('entity_type_temp');
    });
    // Do the same for images table
    await knex.schema.table('images', (table) => {
        table.string('entity_type_temp', 20).nullable();
    });
    await knex.raw('UPDATE images SET entity_type_temp = entity_type');
    await knex.schema.table('images', (table) => {
        table.dropColumn('entity_type');
    });
    await knex.schema.table('images', (table) => {
        table.enum('entity_type', ['package', 'product', 'service', 'decoration']).notNullable().after('entity_id');
    });
    await knex.raw('UPDATE images SET entity_type = entity_type_temp');
    await knex.schema.table('images', (table) => {
        table.dropColumn('entity_type_temp');
    });
}
async function down(knex) {
    // Revert back to original enum (remove decoration)
    // Features table
    await knex.schema.table('features', (table) => {
        table.string('entity_type_temp', 20).nullable();
    });
    await knex.raw('UPDATE features SET entity_type_temp = entity_type');
    await knex.schema.table('features', (table) => {
        table.dropColumn('entity_type');
    });
    await knex.schema.table('features', (table) => {
        table.enum('entity_type', ['package', 'product', 'service']).notNullable().after('entity_id');
    });
    await knex.raw('UPDATE features SET entity_type = entity_type_temp WHERE entity_type_temp != "decoration"');
    await knex.schema.table('features', (table) => {
        table.dropColumn('entity_type_temp');
    });
    // Images table
    await knex.schema.table('images', (table) => {
        table.string('entity_type_temp', 20).nullable();
    });
    await knex.raw('UPDATE images SET entity_type_temp = entity_type');
    await knex.schema.table('images', (table) => {
        table.dropColumn('entity_type');
    });
    await knex.schema.table('images', (table) => {
        table.enum('entity_type', ['package', 'product', 'service']).notNullable().after('entity_id');
    });
    await knex.raw('UPDATE images SET entity_type = entity_type_temp WHERE entity_type_temp != "decoration"');
    await knex.schema.table('images', (table) => {
        table.dropColumn('entity_type_temp');
    });
}
//# sourceMappingURL=20251116142000_add_decoration_to_enums.js.map