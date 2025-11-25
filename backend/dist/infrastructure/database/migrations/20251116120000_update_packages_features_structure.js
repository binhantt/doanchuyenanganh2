"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.up = up;
exports.down = down;
async function up(knex) {
    // Migrate existing data first
    const packages = await knex('packages').select('*');
    for (const pkg of packages) {
        const oldFeatures = JSON.parse(pkg.features);
        const newFeatures = {
            included: oldFeatures,
            excluded: [],
            highlights: oldFeatures.slice(0, 3), // First 3 as highlights
        };
        await knex('packages')
            .where('id', pkg.id)
            .update({
            features: JSON.stringify(newFeatures),
        });
    }
}
async function down(knex) {
    // Revert to old structure
    const packages = await knex('packages').select('*');
    for (const pkg of packages) {
        const newFeatures = JSON.parse(pkg.features);
        const oldFeatures = newFeatures.included || [];
        await knex('packages')
            .where('id', pkg.id)
            .update({
            features: JSON.stringify(oldFeatures),
        });
    }
}
//# sourceMappingURL=20251116120000_update_packages_features_structure.js.map