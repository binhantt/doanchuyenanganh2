import { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
  // Step 1: Change column type to VARCHAR temporarily to allow any value
  await knex.raw(`
    ALTER TABLE users 
    MODIFY COLUMN role VARCHAR(20) NOT NULL DEFAULT 'staff'
  `);
  
  // Step 2: Update existing 'user' role to 'staff'
  await knex('users')
    .where('role', 'user')
    .update({ role: 'staff' });
  
  // Step 3: Now change to new ENUM with 'admin' and 'staff'
  await knex.raw(`
    ALTER TABLE users 
    MODIFY COLUMN role ENUM('admin', 'staff') NOT NULL DEFAULT 'staff'
  `);
}

export async function down(knex: Knex): Promise<void> {
  // Step 1: Change to VARCHAR
  await knex.raw(`
    ALTER TABLE users 
    MODIFY COLUMN role VARCHAR(20) NOT NULL DEFAULT 'user'
  `);
  
  // Step 2: Update 'staff' back to 'user'
  await knex('users')
    .where('role', 'staff')
    .update({ role: 'user' });
  
  // Step 3: Revert back to original enum values
  await knex.raw(`
    ALTER TABLE users 
    MODIFY COLUMN role ENUM('user', 'admin') NOT NULL DEFAULT 'user'
  `);
}
