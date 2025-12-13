import { User } from '../entities/User';

export interface IUserRepository {
  findAll(filters?: {
    keyword?: string;
    role?: string;
    isActive?: boolean;
    sortBy?: string;
    sortOrder?: 'asc' | 'desc';
  }): Promise<User[]>;
  findById(id: string): Promise<User | null>;
  findByEmail(email: string): Promise<User | null>;
  create(data: {
    email: string;
    password: string;
    fullName: string;
    phone: string | null;
    role: 'admin' | 'staff' | 'user';
  }): Promise<User>;
  update(id: string, data: Partial<User>): Promise<User | null>;
  delete(id: string): Promise<boolean>;
}
