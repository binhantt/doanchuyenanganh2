"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.seed = seed;
const uuid_1 = require("uuid");
async function seed(knex) {
    await knex('users').del();
    await knex('users').insert([
        {
            id: (0, uuid_1.v4)(),
            email: 'admin@wedding.com',
            password: '$2b$10$YourHashedPasswordHere',
            full_name: 'Admin User',
            phone: '0123456789',
            role: 'admin',
            is_active: true,
            email_verified_at: knex.fn.now(),
        },
        {
            id: (0, uuid_1.v4)(),
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
//# sourceMappingURL=002_users.js.map