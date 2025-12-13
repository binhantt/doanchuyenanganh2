import { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
  // Extend invitation_templates with preview_url & config_json
  const hasPreview = await knex.schema.hasColumn('invitation_templates', 'preview_url');
  if (!hasPreview) {
    await knex.schema.table('invitation_templates', (table) => {
      table.text('preview_url').nullable().after('description');
    });
  }
  const hasConfig = await knex.schema.hasColumn('invitation_templates', 'config_json');
  if (!hasConfig) {
    await knex.schema.table('invitation_templates', (table) => {
      table.json('config_json').nullable().after('preview_url');
    });
  }

  // Extend invitations with wedding info + slug
  const columnsToAdd: Array<{ name: string; cb: (table: Knex.AlterTableBuilder) => void }> = [
    { name: 'bride', cb: (t) => t.string('bride', 255).nullable().after('bride_name') },
    { name: 'groom', cb: (t) => t.string('groom', 255).nullable().after('bride') },
    { name: 'date', cb: (t) => t.date('date').nullable().after('groom') },
    { name: 'location', cb: (t) => t.string('location', 255).nullable().after('date') },
    { name: 'custom_text', cb: (t) => t.text('custom_text').nullable().after('location') },
    { name: 'slug', cb: (t) => t.string('slug', 255).nullable().unique().after('share_url') },
  ];

  for (const col of columnsToAdd) {
    const exists = await knex.schema.hasColumn('invitations', col.name);
    if (!exists) {
      await knex.schema.table('invitations', (table) => col.cb(table));
    }
  }

  // Guests table
  const guestsExists = await knex.schema.hasTable('guests');
  if (!guestsExists) {
    await knex.schema.createTable('guests', (table) => {
      table.uuid('id').primary();
      table.uuid('invitation_id').notNullable();
      table.string('name', 255).notNullable();
      table.string('status', 50).notNullable().defaultTo('pending'); // pending/accepted/declined
      table.timestamp('time').defaultTo(knex.fn.now());
      table.timestamps(true, true);

      table.foreign('invitation_id').references('id').inTable('invitations').onDelete('CASCADE');
      table.index('invitation_id');
      table.index(['invitation_id', 'status']);
    });
  }
}

export async function down(knex: Knex): Promise<void> {
  // Drop guests
  const guestsExists = await knex.schema.hasTable('guests');
  if (guestsExists) {
    await knex.schema.dropTable('guests');
  }

  // Remove added columns in invitations
  const invitationCols = ['bride', 'groom', 'date', 'location', 'custom_text', 'slug'];
  for (const col of invitationCols) {
    const exists = await knex.schema.hasColumn('invitations', col);
    if (exists) {
      await knex.schema.table('invitations', (table) => {
        table.dropColumn(col);
      });
    }
  }

  // Remove added columns in invitation_templates
  const templateCols = ['preview_url', 'config_json'];
  for (const col of templateCols) {
    const exists = await knex.schema.hasColumn('invitation_templates', col);
    if (exists) {
      await knex.schema.table('invitation_templates', (table) => {
        table.dropColumn(col);
      });
    }
  }
}

