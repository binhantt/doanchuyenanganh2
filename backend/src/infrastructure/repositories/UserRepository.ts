import { db } from '../config/database';
import { User } from '../../domain/entities/User';
import { IUserRepository } from '../../domain/repositories/IUserRepository';
import { v4 as uuidv4 } from 'uuid';

export class UserRepository implements IUserRepository {
  private readonly tableName = 'users';

  async findAll(filters?: {
    keyword?: string;
    role?: string;
    isActive?: boolean;
    sortBy?: string;
    sortOrder?: 'asc' | 'desc';
  }): Promise<User[]> {
    let query = db(this.tableName);

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
    const columnMap: Record<string, string> = {
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

  async findByEmail(email: string): Promise<User | null> {
    const row = await db(this.tableName).where({ email }).first();
    return row ? this.mapToEntity(row) : null;
  }

  async findById(id: string): Promise<User | null> {
    const row = await db(this.tableName).where({ id }).first();
    return row ? this.mapToEntity(row) : null;
  }

  async create(data: {
    email: string;
    password: string;
    fullName: string;
    phone: string | null;
    role: 'admin' | 'staff';
  }): Promise<User> {
    const id = uuidv4();
    await db(this.tableName).insert({
      id,
      email: data.email,
      password: data.password,
      full_name: data.fullName,
      phone: data.phone,
      role: data.role,
      is_active: true,
    });

    const created = await this.findById(id);
    if (!created) throw new Error('Failed to create user');
    return created;
  }

  async update(id: string, data: Partial<User>): Promise<User | null> {
    const updateData: any = {};

    if (data.email) updateData.email = data.email;
    if (data.password) updateData.password = data.password;
    if (data.fullName) updateData.full_name = data.fullName;
    if (data.phone !== undefined) updateData.phone = data.phone;
    if (data.role) updateData.role = data.role;
    if (data.isActive !== undefined) updateData.is_active = data.isActive;

    updateData.updated_at = db.fn.now();

    const updated = await db(this.tableName).where({ id }).update(updateData);

    if (updated === 0) {
      return null;
    }

    return this.findById(id);
  }

  async delete(id: string): Promise<boolean> {
    const deleted = await db(this.tableName).where({ id }).del();
    return deleted > 0;
  }

  private mapToEntity(row: any): User {
    return new User(
      row.id,
      row.email,
      row.password,
      row.full_name,
      row.phone,
      row.role,
      row.is_active,
      row.email_verified_at,
      row.created_at,
      row.updated_at
    );
  }
}
