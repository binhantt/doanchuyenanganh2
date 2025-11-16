import { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
  // Create features table
  await knex.schema.createTable('features', (table) => {
    table.uuid('id').primary();
    table.uuid('entity_id').notNullable(); // ID của package/product/service
    table.enum('entity_type', ['package', 'product', 'service', 'decoration']).notNullable();
    table.string('feature_text', 500).notNullable();
    table.enum('feature_type', ['included', 'excluded', 'highlight']).notNullable();
    table.integer('display_order').defaultTo(0);
    table.timestamps(true, true);

    // Indexes
    table.index('entity_id');
    table.index('entity_type');
    table.index(['entity_id', 'entity_type']);
    table.index('feature_type');
  });

  // Migrate existing features from packages
  const packages = await knex('packages').select('id', 'features');
  for (const pkg of packages) {
    if (pkg.features) {
      const featuresObj = JSON.parse(pkg.features);
      let order = 0;

      // Insert included features
      if (featuresObj.included) {
        for (const feature of featuresObj.included) {
          await knex('features').insert({
            id: knex.raw('UUID()'),
            entity_id: pkg.id,
            entity_type: 'package',
            feature_text: feature,
            feature_type: 'included',
            display_order: order++,
          });
        }
      }

      // Insert excluded features
      if (featuresObj.excluded) {
        for (const feature of featuresObj.excluded) {
          await knex('features').insert({
            id: knex.raw('UUID()'),
            entity_id: pkg.id,
            entity_type: 'package',
            feature_text: feature,
            feature_type: 'excluded',
            display_order: order++,
          });
        }
      }

      // Insert highlight features
      if (featuresObj.highlights) {
        for (const feature of featuresObj.highlights) {
          await knex('features').insert({
            id: knex.raw('UUID()'),
            entity_id: pkg.id,
            entity_type: 'package',
            feature_text: feature,
            feature_type: 'highlight',
            display_order: order++,
          });
        }
      }
    }
  }

  // Migrate existing features from products
  const products = await knex('products').select('id', 'features');
  for (const product of products) {
    if (product.features) {
      const featuresObj = JSON.parse(product.features);
      let order = 0;

      if (featuresObj.included) {
        for (const feature of featuresObj.included) {
          await knex('features').insert({
            id: knex.raw('UUID()'),
            entity_id: product.id,
            entity_type: 'product',
            feature_text: feature,
            feature_type: 'included',
            display_order: order++,
          });
        }
      }

      if (featuresObj.excluded) {
        for (const feature of featuresObj.excluded) {
          await knex('features').insert({
            id: knex.raw('UUID()'),
            entity_id: product.id,
            entity_type: 'product',
            feature_text: feature,
            feature_type: 'excluded',
            display_order: order++,
          });
        }
      }

      if (featuresObj.highlights) {
        for (const feature of featuresObj.highlights) {
          await knex('features').insert({
            id: knex.raw('UUID()'),
            entity_id: product.id,
            entity_type: 'product',
            feature_text: feature,
            feature_type: 'highlight',
            display_order: order++,
          });
        }
      }
    }
  }

  // Migrate existing features from services
  const services = await knex('services').select('id', 'features');
  for (const service of services) {
    if (service.features) {
      const featuresObj = JSON.parse(service.features);
      let order = 0;

      if (featuresObj.included) {
        for (const feature of featuresObj.included) {
          await knex('features').insert({
            id: knex.raw('UUID()'),
            entity_id: service.id,
            entity_type: 'service',
            feature_text: feature,
            feature_type: 'included',
            display_order: order++,
          });
        }
      }

      if (featuresObj.excluded) {
        for (const feature of featuresObj.excluded) {
          await knex('features').insert({
            id: knex.raw('UUID()'),
            entity_id: service.id,
            entity_type: 'service',
            feature_text: feature,
            feature_type: 'excluded',
            display_order: order++,
          });
        }
      }

      if (featuresObj.highlights) {
        for (const feature of featuresObj.highlights) {
          await knex('features').insert({
            id: knex.raw('UUID()'),
            entity_id: service.id,
            entity_type: 'service',
            feature_text: feature,
            feature_type: 'highlight',
            display_order: order++,
          });
        }
      }
    }
  }

  // Drop features columns from original tables
  await knex.schema.table('packages', (table) => {
    table.dropColumn('features');
  });

  await knex.schema.table('products', (table) => {
    table.dropColumn('features');
  });

  await knex.schema.table('services', (table) => {
    table.dropColumn('features');
  });
}

export async function down(knex: Knex): Promise<void> {
  // Add features columns back
  await knex.schema.table('packages', (table) => {
    table.text('features').nullable();
  });

  await knex.schema.table('products', (table) => {
    table.text('features').nullable();
  });

  await knex.schema.table('services', (table) => {
    table.text('features').nullable();
  });

  // Migrate features back to JSON
  const features = await knex('features')
    .select('*')
    .orderBy('display_order', 'asc');

  // Group by entity
  const featuresByEntity: Record<string, any> = {};
  for (const feature of features) {
    const key = `${feature.entity_type}_${feature.entity_id}`;
    if (!featuresByEntity[key]) {
      featuresByEntity[key] = { included: [], excluded: [], highlights: [] };
    }

    if (feature.feature_type === 'included') {
      featuresByEntity[key].included.push(feature.feature_text);
    } else if (feature.feature_type === 'excluded') {
      featuresByEntity[key].excluded.push(feature.feature_text);
    } else if (feature.feature_type === 'highlight') {
      featuresByEntity[key].highlights.push(feature.feature_text);
    }
  }

  // Update entities
  for (const [key, featuresObj] of Object.entries(featuresByEntity)) {
    const [entityType, entityId] = key.split('_');
    if (entityType === 'package') {
      await knex('packages')
        .where('id', entityId)
        .update({ features: JSON.stringify(featuresObj) });
    } else if (entityType === 'product') {
      await knex('products')
        .where('id', entityId)
        .update({ features: JSON.stringify(featuresObj) });
    } else if (entityType === 'service') {
      await knex('services')
        .where('id', entityId)
        .update({ features: JSON.stringify(featuresObj) });
    }
  }

  // Drop features table
  await knex.schema.dropTableIfExists('features');
}
