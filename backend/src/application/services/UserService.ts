import { IUserService } from '../interfaces/IUserService';
import { IUserRepository } from '../../domain/repositories/IUserRepository';
import { User } from '../../domain/entities/User';
import bcrypt from 'bcrypt';

export class UserService implements IUserService {
  constructor(private readonly userRepository: IUserRepository) {}

  async getAllUsers(filters?: {
    keyword?: string;
    role?: string;
    isActive?: boolean;
    sortBy?: string;
    sortOrder?: 'asc' | 'desc';
  }): Promise<Omit<User, 'password'>[]> {
    const users = await this.userRepository.findAll(filters);
    return users.map(this.excludePassword);
  }

  async getUserById(id: string): Promise<Omit<User, 'password'> | null> {
    const user = await this.userRepository.findById(id);
    return user ? this.excludePassword(user) : null;
  }

  async getUserByEmail(email: string): Promise<User | null> {
    return this.userRepository.findByEmail(email);
  }

  async createUser(data: {
    email: string;
    password: string;
    fullName: string;
    phone: string | null;
    role: 'admin' | 'staff';
  }): Promise<Omit<User, 'password'>> {
    // Check if email already exists
    const existing = await this.userRepository.findByEmail(data.email);
    if (existing) {
      throw new Error('Email already exists');
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(data.password, 10);

    const user = await this.userRepository.create({
      ...data,
      password: hashedPassword,
    });

    return this.excludePassword(user);
  }

  async updateUser(
    id: string,
    data: Partial<User>
  ): Promise<Omit<User, 'password'> | null> {
    const existing = await this.userRepository.findById(id);
    if (!existing) {
      return null;
    }

    // If updating email, check uniqueness
    if (data.email && data.email !== existing.email) {
      const emailExists = await this.userRepository.findByEmail(data.email);
      if (emailExists) {
        throw new Error('Email already exists');
      }
    }

    // Create update data object
    const updateData: any = { ...data };

    // If updating password, hash it
    if (updateData.password) {
      updateData.password = await bcrypt.hash(updateData.password, 10);
    }

    const updated = await this.userRepository.update(id, updateData);
    return updated ? this.excludePassword(updated) : null;
  }

  async deleteUser(id: string): Promise<boolean> {
    return this.userRepository.delete(id);
  }

  async toggleUserStatus(id: string): Promise<Omit<User, 'password'> | null> {
    const user = await this.userRepository.findById(id);
    if (!user) {
      return null;
    }

    const updated = await this.userRepository.update(id, {
      isActive: !user.isActive,
    });

    return updated ? this.excludePassword(updated) : null;
  }

  private excludePassword(user: User): Omit<User, 'password'> {
    const { password, ...userWithoutPassword } = user;
    return userWithoutPassword as Omit<User, 'password'>;
  }
}
