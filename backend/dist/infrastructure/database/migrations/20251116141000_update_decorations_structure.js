"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.up = up;
exports.down = down;
async function up(knex) {
    // Check if features column exists and drop it
    const hasFeatures = await knex.schema.hasColumn('decorations', 'features');
    if (hasFeatures) {
        await knex.schema.table('decorations', (table) => {
            table.dropColumn('features');
        });
    }
    // Check if images column exists and drop it
    const hasImages = await knex.schema.hasColumn('decorations', 'images');
    if (hasImages) {
        await knex.schema.table('decorations', (table) => {
            table.dropColumn('images');
        });
    }
}
async function down(knex) {
    // Add columns back
    await knex.schema.table('decorations', (table) => {
        table.text('features').nullable();
        table.text('images').nullable();
    });
}
//# sourceMappingURL=20251116141000_update_decorations_structure.js.map