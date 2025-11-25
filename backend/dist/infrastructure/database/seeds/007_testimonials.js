"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.seed = seed;
const uuid_1 = require("uuid");
async function seed(knex) {
    // Deletes ALL existing entries
    await knex('testimonials').del();
    // Inserts seed entries
    await knex('testimonials').insert([
        {
            id: (0, uuid_1.v4)(),
            client_name: 'Pham Thu Ha & Le Quang Minh',
            client_role: 'Bride & Groom',
            content: 'Amazing service! From decoration to lighting, sound, and catering — everything was outstanding. Our guests were full of compliments. We were truly satisfied and will definitely recommend your service to our friends.',
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
//# sourceMappingURL=007_testimonials.js.map