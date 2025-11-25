import { User } from '../../domain/entities/User';
import { IUserRepository } from '../../domain/repositories/IUserRepository';
export declare class UserRepository implements IUserRepository {
    private readonly tableName;
    findAll(filters?: {
        keyword?: string;
        role?: string;
        isActive?: boolean;
        sortBy?: string;
        sortOrder?: 'asc' | 'desc';
    }): Promise<User[]>;
    findByEmail(email: string): Promise<User | null>;
    findById(id: string): Promise<User | null>;
    create(data: {
        email: string;
        password: string;
        fullName: string;
        phone: string | null;
        role: 'admin' | 'staff';
    }): Promise<User>;
    update(id: string, data: Partial<User>): Promise<User | null>;
    delete(id: string): Promise<boolean>;
    private mapToEntity;
}
//# sourceMappingURL=UserRepository.d.ts.map