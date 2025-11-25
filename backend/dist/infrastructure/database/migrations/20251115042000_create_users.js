"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.up = up;
exports.down = down;
async function up(knex) {
    return knex.schema.createTable('users', (table) => {
        table.uuid('id').primary();
        table.string('email', 255).notNullable().unique();
        table.string('password', 255).notNullable();
        table.string('full_name', 100).notNullable();
        table.string('phone', 20).nullable();
        table.enum('role', ['user', 'admin']).defaultTo('user');
        table.boolean('is_active').defaultTo(true);
        table.timestamp('email_verified_at').nullable();
        table.timestamps(true, true);
        table.index('email');
        table.index('role');
    });
}
async function down(knex) {
    return knex.schema.dropTable('users');
}
//# sourceMappingURL=20251115042000_create_users.js.map