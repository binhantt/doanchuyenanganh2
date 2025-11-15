import { Knex } from 'knex';
import { v4 as uuidv4 } from 'uuid';

export async function seed(knex: Knex): Promise<void> {
  await knex('users').del();

  await knex('users').insert([
    {
      id: uuidv4(),
      email: 'admin@wedding.com',
      password: '$2b$10$YourHashedPasswordHere',
      full_name: 'Admin User',
      phone: '0123456789',
      role: 'admin',
      is_active: true,
      email_verified_at: knex.fn.now(),
    },
    {
      id: uuidv4(),
      email: 'user@example.com',
      password: '$2b$10$YourHashedPasswordHere',
      full_name: 'Test User',
      phone: '0987654321',
      role: 'user',
      is_active: true,
      email_verified_at: knex.fn.now(),
    },
  ]);
}
