import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { UserRepository } from '../../infrastructure/repositories/UserRepository';
import { User } from '../../domain/entities/User';

export class AuthService {
  constructor(private readonly userRepository: UserRepository) {}

  async login(email: string, password: string): Promise<{ token: string; user: User } | null> {
    console.log('\n========== LOGIN ATTEMPT ==========');
    console.log('📧 Original Email:', email);
    console.log('� Poassword Length:', password.length);
    console.log('🔑 Password (first 3 chars):', password.substring(0, 3) + '***');
    
    // Trim and lowercase email to avoid whitespace/case issues
    const normalizedEmail = email.trim().toLowerCase();
    console.log('📧 Normalized Email:', normalizedEmail);
    
    const user = await this.userRepository.findByEmail(normalizedEmail);
    
    if (user) {
      console.log('\n✅ USER FOUND IN DATABASE:');
      console.log('  - ID:', user.id);
      console.log('  - Email:', user.email);
      console.log('  - Full Name:', user.fullName);
      console.log('  - Role:', user.role);
      console.log('  - Is Active:', user.isActive);
      console.log('  - Has Password:', !!user.password);
      console.log('  - Password Hash Length:', user.password?.length);
      console.log('  - Password Hash (first 10):', user.password?.substring(0, 10) + '...');
      console.log('  - Is Bcrypt Hash:', user.password?.startsWith('$2'));
    } else {
      console.log('\n❌ USER NOT FOUND IN DATABASE');
      console.log('  - Searched email:', normalizedEmail);
      return null;
    }
    
    // Check if user is active
    if (!user.isActive) {
      console.log('\n❌ USER IS INACTIVE');
      throw new Error('Tài khoản đã bị vô hiệu hóa. Vui lòng liên hệ quản trị viên.');
    }

    console.log('\n🔐 CHECKING PASSWORD...');
    console.log('  - Input password length:', password.length);
    console.log('  - Stored hash length:', user.password.length);
    console.log('  - Hash algorithm:', user.password.substring(0, 4));
    
    const isPasswordValid = await bcrypt.compare(password, user.password);
    console.log('  - Password match:', isPasswordValid);
    
    if (!isPasswordValid) {
      console.log('\n❌ PASSWORD DOES NOT MATCH');
      console.log('===================================\n');
      return null;
    }
    
    console.log('\n✅ LOGIN SUCCESSFUL');
    console.log('===================================\n');

    const token = jwt.sign(
      {
        id: user.id,
        email: user.email,
        role: user.role,
      },
      process.env.JWT_SECRET || 'your-secret-key',
      { expiresIn: '7d' }
    );

    return { token, user };
  }

  async verifyToken(token: string): Promise<User | null> {
    try {
      const decoded = jwt.verify(
        token,
        process.env.JWT_SECRET || 'your-secret-key'
      ) as any;

      const user = await this.userRepository.findById(decoded.id);
      
      // Check if user exists and is active
      if (!user || !user.isActive) {
        return null;
      }
      
      return user;
    } catch (error) {
      return null;
    }
  }
}
