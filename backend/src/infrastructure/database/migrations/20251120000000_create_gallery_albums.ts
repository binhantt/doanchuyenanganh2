import { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
  // Create gallery_albums table first (without foreign key to galleries yet)
  await knex.schema.createTable('gallery_albums', (table) => {
    table.uuid('id').primary();
    table.string('name', 200).notNullable();
    table.text('description').nullable();
    table.uuid('cover_image_id').nullable(); // Will add foreign key later
    table.integer('display_order').defaultTo(0);
    table.boolean('is_active').defaultTo(true);
    table.timestamps(true, true);

    table.index('is_active');
    table.index('display_order');
  });

  // Add album_id column to galleries table (without foreign key yet)
  await knex.schema.alterTable('galleries', (table) => {
    table.uuid('album_id').nullable();
    table.index('album_id');
  });

  // Now add foreign keys after both tables exist
  await knex.schema.alterTable('gallery_albums', (table) => {
    // Foreign key to galleries table for cover image
    table.foreign('cover_image_id')
      .references('id')
      .inTable('galleries')
      .onDelete('SET NULL');
  });

  await knex.schema.alterTable('galleries', (table) => {
    // Foreign key to gallery_albums table
    table.foreign('album_id')
      .references('id')
      .inTable('gallery_albums')
      .onDelete('SET NULL');
  });
}

export async function down(knex: Knex): Promise<void> {
  // Drop foreign keys first
  await knex.schema.alterTable('galleries', (table) => {
    table.dropForeign(['album_id']);
  });

  await knex.schema.alterTable('gallery_albums', (table) => {
    table.dropForeign(['cover_image_id']);
  });

  // Remove album_id column from galleries
  await knex.schema.alterTable('galleries', (table) => {
    table.dropIndex(['album_id']);
    table.dropColumn('album_id');
  });

  // Drop gallery_albums table
  await knex.schema.dropTable('gallery_albums');
}

