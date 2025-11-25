"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.up = up;
exports.down = down;
async function up(knex) {
    // Add images column if it doesn't exist
    const hasImages = await knex.schema.hasColumn('services', 'images');
    if (!hasImages) {
        await knex.schema.table('services', (table) => {
            table.text('images').notNullable().defaultTo('[]');
        });
    }
    // Migrate existing data to new features structure
    const services = await knex('services').select('*');
    for (const service of services) {
        const oldFeatures = JSON.parse(service.features);
        const newFeatures = {
            included: oldFeatures,
            excluded: [],
            highlights: oldFeatures.slice(0, 3),
        };
        await knex('services')
            .where('id', service.id)
            .update({
            features: JSON.stringify(newFeatures),
        });
    }
}
async function down(knex) {
    // Revert features structure
    const services = await knex('services').select('*');
    for (const service of services) {
        const newFeatures = JSON.parse(service.features);
        const oldFeatures = newFeatures.included || [];
        await knex('services')
            .where('id', service.id)
            .update({
            features: JSON.stringify(oldFeatures),
        });
    }
    // Remove images column
    await knex.schema.table('services', (table) => {
        table.dropColumn('images');
    });
}
//# sourceMappingURL=20251116105000_update_services_structure.js.map