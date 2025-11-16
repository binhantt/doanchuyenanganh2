import { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
  // Create images table
  await knex.schema.createTable('images', (table) => {
    table.uuid('id').primary();
    table.uuid('entity_id').notNullable(); // ID của package/product/service/decoration
    table.enum('entity_type', ['package', 'product', 'service', 'decoration']).notNullable();
    table.string('url', 500).notNullable();
    table.string('alt_text', 200).nullable();
    table.integer('display_order').defaultTo(0);
    table.boolean('is_primary').defaultTo(false); // Ảnh chính
    table.timestamps(true, true);

    // Indexes
    table.index('entity_id');
    table.index('entity_type');
    table.index(['entity_id', 'entity_type']);
    table.index('is_primary');
  });

  // Migrate existing images from packages
  const packages = await knex('packages').select('id', 'images');
  for (const pkg of packages) {
    if (pkg.images) {
      const imageUrls = JSON.parse(pkg.images);
      for (let i = 0; i < imageUrls.length; i++) {
        await knex('images').insert({
          id: knex.raw('UUID()'),
          entity_id: pkg.id,
          entity_type: 'package',
          url: imageUrls[i],
          display_order: i,
          is_primary: i === 0,
        });
      }
    }
  }

  // Migrate existing images from products
  const products = await knex('products').select('id', 'images');
  for (const product of products) {
    if (product.images) {
      const imageUrls = JSON.parse(product.images);
      for (let i = 0; i < imageUrls.length; i++) {
        await knex('images').insert({
          id: knex.raw('UUID()'),
          entity_id: product.id,
          entity_type: 'product',
          url: imageUrls[i],
          display_order: i,
          is_primary: i === 0,
        });
      }
    }
  }

  // Migrate existing images from services
  const services = await knex('services').select('id', 'images');
  for (const service of services) {
    if (service.images) {
      const imageUrls = JSON.parse(service.images);
      for (let i = 0; i < imageUrls.length; i++) {
        await knex('images').insert({
          id: knex.raw('UUID()'),
          entity_id: service.id,
          entity_type: 'service',
          url: imageUrls[i],
          display_order: i,
          is_primary: i === 0,
        });
      }
    }
  }

  // Drop images columns from original tables
  await knex.schema.table('packages', (table) => {
    table.dropColumn('images');
  });

  await knex.schema.table('products', (table) => {
    table.dropColumn('images');
  });

  await knex.schema.table('services', (table) => {
    table.dropColumn('images');
  });
}

export async function down(knex: Knex): Promise<void> {
  // Add images columns back
  await knex.schema.table('packages', (table) => {
    table.text('images').nullable();
  });

  await knex.schema.table('products', (table) => {
    table.text('images').nullable();
  });

  await knex.schema.table('services', (table) => {
    table.text('images').nullable();
  });

  // Migrate images back to JSON arrays
  const images = await knex('images')
    .select('*')
    .orderBy('display_order', 'asc');

  // Group by entity
  const imagesByEntity: Record<string, any[]> = {};
  for (const img of images) {
    const key = `${img.entity_type}_${img.entity_id}`;
    if (!imagesByEntity[key]) {
      imagesByEntity[key] = [];
    }
    imagesByEntity[key].push(img.url);
  }

  // Update packages
  for (const [key, urls] of Object.entries(imagesByEntity)) {
    const [entityType, entityId] = key.split('_');
    if (entityType === 'package') {
      await knex('packages')
        .where('id', entityId)
        .update({ images: JSON.stringify(urls) });
    } else if (entityType === 'product') {
      await knex('products')
        .where('id', entityId)
        .update({ images: JSON.stringify(urls) });
    } else if (entityType === 'service') {
      await knex('services')
        .where('id', entityId)
        .update({ images: JSON.stringify(urls) });
    }
  }

  // Drop images table
  await knex.schema.dropTableIfExists('images');
}
