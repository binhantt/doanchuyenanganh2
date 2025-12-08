import { Knex } from 'knex';
import { v4 as uuidv4 } from 'uuid';
import bcrypt from 'bcrypt';

export async function seed(knex: Knex): Promise<void> {
  // Xóa users cũ (trừ admin đã tạo từ 000_admin_user.ts)
  await knex('users')
    .whereNot('email', 'admin@weddingplanner.vn')
    .del();

  // Hash passwords
  const adminPassword = await bcrypt.hash('admin123', 10);
  const staffPassword = await bcrypt.hash('staff123', 10);

  await knex('users').insert([
    {
      id: uuidv4(),
      email: 'admin@wedding.com',
      password: adminPassword,
      full_name: 'Admin User',
      phone: '0123456789',
      role: 'admin',
      is_active: true,
      email_verified_at: knex.fn.now(),
    },
    {
      id: uuidv4(),
      email: 'staff@example.com',
      password: staffPassword,
      full_name: 'Staff User',
      phone: '0987654321',
      role: 'staff',
      is_active: true,
      email_verified_at: knex.fn.now(),
    },
  ]);

  console.log('Users seeded:');
  console.log('- admin@wedding.com / admin123');
  console.log('- staff@example.com / staff123');
}
