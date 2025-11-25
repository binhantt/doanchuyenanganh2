import { UserRepository } from '../../infrastructure/repositories/UserRepository';
import { User } from '../../domain/entities/User';
export declare class AuthService {
    private readonly userRepository;
    constructor(userRepository: UserRepository);
    login(email: string, password: string): Promise<{
        token: string;
        user: User;
    } | null>;
    verifyToken(token: string): Promise<User | null>;
}
//# sourceMappingURL=AuthService.d.ts.map