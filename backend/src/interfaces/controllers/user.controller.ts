import { Request, Response } from 'express';
import { IUserService } from '../../application/interfaces/IUserService';

export class UserController {
  constructor(private readonly userService: IUserService) {}

  async getAllUsers(req: Request, res: Response): Promise<void> {
    try {
      const { keyword, role, isActive, sortBy, sortOrder } = req.query;

      const filters: any = {};
      if (keyword) filters.keyword = keyword as string;
      if (role) filters.role = role as string;
      if (isActive !== undefined) filters.isActive = isActive === 'true';
      if (sortBy) filters.sortBy = sortBy as string;
      if (sortOrder) filters.sortOrder = sortOrder as 'asc' | 'desc';

      const users = await this.userService.getAllUsers(filters);
      res.json({
        success: true,
        data: users,
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: 'Failed to fetch users',
        error: error instanceof Error ? error.message : 'Unknown error',
      });
    }
  }

  async getUserById(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;
      const user = await this.userService.getUserById(id);

      if (!user) {
        res.status(404).json({
          success: false,
          message: 'User not found',
        });
        return;
      }

      res.json({
        success: true,
        data: user,
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: 'Failed to fetch user',
        error: error instanceof Error ? error.message : 'Unknown error',
      });
    }
  }

  async createUser(req: Request, res: Response): Promise<void> {
    try {
      const { email, password, fullName, phone, role } = req.body;

      console.log('Create user request:', { email, fullName, phone, role, hasPassword: !!password });

      if (!email || !password || !fullName || !role) {
        console.log('Missing required fields:', { email: !!email, password: !!password, fullName: !!fullName, role: !!role });
        res.status(400).json({
          success: false,
          message: 'Missing required fields: email, password, fullName, and role are required',
        });
        return;
      }

      if (role !== 'admin' && role !== 'staff') {
        res.status(400).json({
          success: false,
          message: 'Invalid role. Must be either "admin" or "staff"',
        });
        return;
      }

      const user = await this.userService.createUser({
        email,
        password,
        fullName,
        phone: phone || null,
        role,
      });

      res.status(201).json({
        success: true,
        data: user,
        message: 'User created successfully',
      });
    } catch (error) {
      console.error('Create user error:', error);
      res.status(400).json({
        success: false,
        message: error instanceof Error ? error.message : 'Failed to create user',
      });
    }
  }

  async updateUser(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;
      const user = await this.userService.updateUser(id, req.body);

      if (!user) {
        res.status(404).json({
          success: false,
          message: 'User not found',
        });
        return;
      }

      res.json({
        success: true,
        data: user,
        message: 'User updated successfully',
      });
    } catch (error) {
      res.status(400).json({
        success: false,
        message: 'Failed to update user',
        error: error instanceof Error ? error.message : 'Unknown error',
      });
    }
  }

  async deleteUser(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;
      const deleted = await this.userService.deleteUser(id);

      if (!deleted) {
        res.status(404).json({
          success: false,
          message: 'User not found',
        });
        return;
      }

      res.json({
        success: true,
        message: 'User deleted successfully',
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: 'Failed to delete user',
        error: error instanceof Error ? error.message : 'Unknown error',
      });
    }
  }

  async toggleUserStatus(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;
      const user = await this.userService.toggleUserStatus(id);

      if (!user) {
        res.status(404).json({
          success: false,
          message: 'User not found',
        });
        return;
      }

      res.json({
        success: true,
        data: user,
        message: 'User status updated successfully',
      });
    } catch (error) {
      res.status(400).json({
        success: false,
        message: 'Failed to update user status',
        error: error instanceof Error ? error.message : 'Unknown error',
      });
    }
  }
}
