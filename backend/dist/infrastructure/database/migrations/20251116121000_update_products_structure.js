"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.up = up;
exports.down = down;
async function up(knex) {
    // Rename is_featured to is_popular
    const hasIsFeatured = await knex.schema.hasColumn('products', 'is_featured');
    if (hasIsFeatured) {
        await knex.schema.table('products', (table) => {
            table.renameColumn('is_featured', 'is_popular');
        });
    }
    // Remove material and stock_quantity columns if they exist
    const hasMaterial = await knex.schema.hasColumn('products', 'material');
    const hasStockQuantity = await knex.schema.hasColumn('products', 'stock_quantity');
    if (hasMaterial || hasStockQuantity) {
        await knex.schema.table('products', (table) => {
            if (hasMaterial)
                table.dropColumn('material');
            if (hasStockQuantity)
                table.dropColumn('stock_quantity');
        });
    }
    // Migrate existing data to new features structure
    const products = await knex('products').select('*');
    for (const product of products) {
        const oldFeatures = JSON.parse(product.features);
        const newFeatures = {
            included: oldFeatures,
            excluded: [],
            highlights: oldFeatures.slice(0, 3),
        };
        await knex('products')
            .where('id', product.id)
            .update({
            features: JSON.stringify(newFeatures),
        });
    }
}
async function down(knex) {
    // Revert features structure
    const products = await knex('products').select('*');
    for (const product of products) {
        const newFeatures = JSON.parse(product.features);
        const oldFeatures = newFeatures.included || [];
        await knex('products')
            .where('id', product.id)
            .update({
            features: JSON.stringify(oldFeatures),
        });
    }
    // Add back material and stock_quantity columns
    await knex.schema.table('products', (table) => {
        table.string('material', 100).notNullable().defaultTo('');
        table.integer('stock_quantity').defaultTo(0);
    });
    // Rename is_popular back to is_featured
    await knex.schema.table('products', (table) => {
        table.renameColumn('is_popular', 'is_featured');
    });
}
//# sourceMappingURL=20251116121000_update_products_structure.js.map