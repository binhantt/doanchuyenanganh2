import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { UserRepository } from '../../infrastructure/repositories/UserRepository';
import { User } from '../../domain/entities/User';

export class AuthService {
  constructor(private readonly userRepository: UserRepository) {}

  async login(email: string, password: string): Promise<{ token: string; user: User } | null> {
    console.log('\n========== LOGIN DEBUG ==========');
    console.log('Input email:', email);
    console.log('Input password:', password);
    console.log('Normalized email:', email.trim().toLowerCase());
    
    // Tìm user theo email
    const user = await this.userRepository.findByEmail(email.trim().toLowerCase());
    
    console.log('User found:', !!user);
    if (!user) {
      console.log('❌ Login failed: User not found -', email);
      console.log('=================================\n');
      return null;
    }
    
    console.log('User details:', {
      id: user.id,
      email: user.email,
      fullName: user.fullName,
      role: user.role,
      isActive: user.isActive,
      hasPassword: !!user.password,
      passwordLength: user.password?.length,
      passwordPrefix: user.password?.substring(0, 10)
    });
    
    // Kiểm tra tài khoản có active không
    if (!user.isActive) {
      throw new Error('Tài khoản đã bị vô hiệu hóa. Vui lòng liên hệ quản trị viên.');
    }

    // So sánh mật khẩu với bcrypt
    console.log('Comparing password...');
    const isPasswordValid = await bcrypt.compare(password, user.password);
    console.log('Password valid:', isPasswordValid);
    
    if (!isPasswordValid) {
      console.log('❌ Login failed: Wrong password -', email);
      console.log('=================================\n');
      return null;
    }
    
    console.log('✅ Login successful:', email);
    console.log('=================================\n');

    // Tạo JWT token
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
