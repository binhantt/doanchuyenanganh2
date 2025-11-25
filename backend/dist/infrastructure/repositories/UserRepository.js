"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserRepository = void 0;
const database_1 = require("../config/database");
const User_1 = require("../../domain/entities/User");
const uuid_1 = require("uuid");
class UserRepository {
    constructor() {
        this.tableName = 'users';
    }
    async findAll(filters) {
        let query = (0, database_1.db)(this.tableName);
        if (filters?.keyword) {
            query = query.where((builder) => {
                builder
                    .where('email', 'like', `%${filters.keyword}%`)
                    .orWhere('full_name', 'like', `%${filters.keyword}%`)
                    .orWhere('phone', 'like', `%${filters.keyword}%`);
            });
        }
        if (filters?.role) {
            query = query.where('role', filters.role);
        }
        if (filters?.isActive !== undefined) {
            query = query.where('is_active', filters.isActive);
        }
        // Map camelCase to snake_case for database columns
        const columnMap = {
            createdAt: 'created_at',
            updatedAt: 'updated_at',
            fullName: 'full_name',
            isActive: 'is_active',
            emailVerifiedAt: 'email_verified_at'
        };
        const sortBy = filters?.sortBy || 'created_at';
        const sortOrder = filters?.sortOrder || 'desc';
        const dbColumn = columnMap[sortBy] || sortBy;
        const rows = await query.orderBy(dbColumn, sortOrder).select('*');
        return rows.map((row) => this.mapToEntity(row));
    }
    async findByEmail(email) {
        // Normalize email: trim and lowercase
        const normalizedEmail = email.trim().toLowerCase();
        console.log('🔍 [UserRepository] Searching for email:', normalizedEmail);
        const row = await (0, database_1.db)(this.tableName)
            .whereRaw('LOWER(email) = ?', [normalizedEmail])
            .first();
        console.log('🔍 [UserRepository] Query result:', row ? 'Found' : 'Not found');
        if (row) {
            console.log('🔍 [UserRepository] Raw data:', {
                id: row.id,
                email: row.email,
                full_name: row.full_name,
                role: row.role,
                is_active: row.is_active,
                password_exists: !!row.password,
                password_length: row.password?.length
            });
        }
        return row ? this.mapToEntity(row) : null;
    }
    async findById(id) {
        const row = await (0, database_1.db)(this.tableName).where({ id }).first();
        return row ? this.mapToEntity(row) : null;
    }
    async create(data) {
        const id = (0, uuid_1.v4)();
        await (0, database_1.db)(this.tableName).insert({
            id,
            email: data.email,
            password: data.password,
            full_name: data.fullName,
            phone: data.phone,
            role: data.role,
            is_active: true,
        });
        const created = await this.findById(id);
        if (!created)
            throw new Error('Failed to create user');
        return created;
    }
    async update(id, data) {
        const updateData = {};
        if (data.email)
            updateData.email = data.email;
        if (data.password)
            updateData.password = data.password;
        if (data.fullName)
            updateData.full_name = data.fullName;
        if (data.phone !== undefined)
            updateData.phone = data.phone;
        if (data.role)
            updateData.role = data.role;
        if (data.isActive !== undefined)
            updateData.is_active = data.isActive;
        updateData.updated_at = database_1.db.fn.now();
        const updated = await (0, database_1.db)(this.tableName).where({ id }).update(updateData);
        if (updated === 0) {
            return null;
        }
        return this.findById(id);
    }
    async delete(id) {
        const deleted = await (0, database_1.db)(this.tableName).where({ id }).del();
        return deleted > 0;
    }
    mapToEntity(row) {
        return new User_1.User(row.id, row.email, row.password, row.full_name, row.phone, row.role, row.is_active, row.email_verified_at, row.created_at, row.updated_at);
    }
}
exports.UserRepository = UserRepository;
//# sourceMappingURL=UserRepository.js.map