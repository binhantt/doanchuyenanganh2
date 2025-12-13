import { Request, Response } from 'express';
import { AuthService } from '../../application/services/AuthService';

export class AuthController {
  constructor(private readonly authService: AuthService) {}

  async login(req: Request, res: Response): Promise<void> {
    try {
      const { email, password } = req.body;

      if (!email || !password) {
        res.status(400).json({
          success: false,
          message: 'Email and password are required',
        });
        return;
      }

      const result = await this.authService.login(email, password);

      if (!result) {
        res.status(401).json({
          success: false,
          message: 'Invalid email or password',
        });
        return;
      }

      res.json({
        success: true,
        data: {
          token: result.token,
          user: {
            id: result.user.id,
            email: result.user.email,
            fullName: result.user.fullName,
            role: result.user.role,
          },
        },
      });
    } catch (error) {
      // Handle specific error for inactive account
      if (error instanceof Error && error.message.includes('vô hiệu hóa')) {
        res.status(403).json({
          success: false,
          message: error.message,
        });
        return;
      }

      res.status(500).json({
        success: false,
        message: 'Login failed',
        error: error instanceof Error ? error.message : 'Unknown error',
      });
    }
  }

  async register(req: Request, res: Response): Promise<void> {
    try {
      const { email, password, fullName, phone } = req.body;

      // Validate required fields
      if (!email || !password || !fullName) {
        res.status(400).json({
          success: false,
          message: 'Email, password và họ tên là bắt buộc',
        });
        return;
      }

      // Validate email format
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email)) {
        res.status(400).json({
          success: false,
          message: 'Email không hợp lệ',
        });
        return;
      }

      // Validate password length
      if (password.length < 6) {
        res.status(400).json({
          success: false,
          message: 'Mật khẩu phải có ít nhất 6 ký tự',
        });
        return;
      }

      const result = await this.authService.register({
        email,
        password,
        fullName,
        phone: phone || null,
      });

      res.status(201).json({
        success: true,
        data: {
          token: result.token,
          user: {
            id: result.user.id,
            email: result.user.email,
            fullName: result.user.fullName,
            role: result.user.role,
          },
        },
        message: 'Đăng ký thành công!',
      });
    } catch (error) {
      if (error instanceof Error && error.message.includes('đã tồn tại')) {
        res.status(409).json({
          success: false,
          message: error.message,
        });
        return;
      }

      res.status(500).json({
        success: false,
        message: 'Đăng ký thất bại',
        error: error instanceof Error ? error.message : 'Unknown error',
      });
    }
  }

  async verify(req: Request, res: Response): Promise<void> {
    try {
      const token = req.headers.authorization?.replace('Bearer ', '');

      if (!token) {
        res.status(401).json({
          success: false,
          message: 'No token provided',
        });
        return;
      }

      const user = await this.authService.verifyToken(token);

      if (!user) {
        res.status(401).json({
          success: false,
          message: 'Invalid token',
        });
        return;
      }

      res.json({
        success: true,
        data: {
          user: {
            id: user.id,
            email: user.email,
            fullName: user.fullName,
            role: user.role,
          },
        },
      });
    } catch (error) {
      res.status(401).json({
        success: false,
        message: 'Token verification failed',
      });
    }
  }
}
