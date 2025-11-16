import { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
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

export async function down(knex: Knex): Promise<void> {
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
