import { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
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

export async function down(knex: Knex): Promise<void> {
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
