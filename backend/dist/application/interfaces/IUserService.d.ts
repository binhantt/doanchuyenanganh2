import { User } from '../../domain/entities/User';
export interface IUserService {
    getAllUsers(filters?: {
        keyword?: string;
        role?: string;
        isActive?: boolean;
        sortBy?: string;
        sortOrder?: 'asc' | 'desc';
    }): Promise<Omit<User, 'password'>[]>;
    getUserById(id: string): Promise<Omit<User, 'password'> | null>;
    getUserByEmail(email: string): Promise<User | null>;
    createUser(data: {
        email: string;
        password: string;
        fullName: string;
        phone: string | null;
        role: 'admin' | 'staff';
    }): Promise<Omit<User, 'password'>>;
    updateUser(id: string, data: Partial<User>): Promise<Omit<User, 'password'> | null>;
    deleteUser(id: string): Promise<boolean>;
    toggleUserStatus(id: string): Promise<Omit<User, 'password'> | null>;
}
//# sourceMappingURL=IUserService.d.ts.map