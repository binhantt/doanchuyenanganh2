import { Knex } from 'knex';
import { v4 as uuidv4 } from 'uuid';

export async function seed(knex: Knex): Promise<void> {
  // Deletes ALL existing entries
  await knex('testimonials').del();

  // Inserts seed entries
  await knex('testimonials').insert([
    {
      id: uuidv4(),
      client_name: 'Pham Thu Ha & Le Quang Minh',
      client_role: 'Bride & Groom',
      content:
        'Amazing service! From decoration to lighting, sound, and catering — everything was outstanding. Our guests were full of compliments. We were truly satisfied and will definitely recommend your service to our friends.',
      rating: 5,
      event_date: new Date('2024-09-01'),
      location: 'Ho Chi Minh City',
      language: 'en',
      is_active: true,
      created_at: new Date(),
      updated_at: new Date(),
    },
  ]);
}
