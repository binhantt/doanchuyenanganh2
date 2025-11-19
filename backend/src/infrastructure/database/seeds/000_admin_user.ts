import { Knex } from 'knex';
import { v4 as uuidv4 } from 'uuid';
import bcrypt from 'bcrypt';

export async function seed(knex: Knex): Promise<void> {
  // Check if admin already exists
  const existingAdmin = await knex('users').where({ email: 'admin@weddingplanner.vn' }).first();
  
  if (existingAdmin) {
    console.log('Admin user already exists');
    return;
  }

  // Hash password
  const hashedPassword = await bcrypt.hash('123', 10);

  // Insert admin user
  await knex('users').insert({
    id: uuidv4(),
    email: 'admin@weddingplanner.vn',
    password: hashedPassword,
    full_name: 'Administrator',
    phone: '0123456789',
    role: 'admin',
    is_active: true,
    email_verified_at: new Date(),
  });

  console.log('Admin user created: admin@weddingplanner.vn / 123');
}
