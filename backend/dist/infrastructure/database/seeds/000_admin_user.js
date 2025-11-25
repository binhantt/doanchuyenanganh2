"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.seed = seed;
const uuid_1 = require("uuid");
const bcrypt_1 = __importDefault(require("bcrypt"));
async function seed(knex) {
    // Check if admin already exists
    const existingAdmin = await knex('users').where({ email: 'admin@weddingplanner.vn' }).first();
    if (existingAdmin) {
        console.log('Admin user already exists');
        return;
    }
    // Hash password
    const hashedPassword = await bcrypt_1.default.hash('123', 10);
    // Insert admin user
    await knex('users').insert({
        id: (0, uuid_1.v4)(),
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
//# sourceMappingURL=000_admin_user.js.map