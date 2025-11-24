import { Request, Response } from 'express';
import { IPackageService } from '../../application/interfaces/IPackageService';
import { CreatePackageDTO, UpdatePackageDTO } from '../../application/dto/PackageDTO';

export class PackageController {
  constructor(private readonly packageService: IPackageService) {}

  // For app - Get all packages
  async getAllPackages(req: Request, res: Response): Promise<void> {
    try {
      const { keyword, active, popular, sortBy, sortOrder } = req.query;

      if (popular === 'true') {
        const packages = await this.packageService.getPopularPackages();
        res.status(200).json({
          success: true,
          data: packages,
          count: packages.length,
        });
        return;
      }

      const filters: any = {};
      if (keyword) filters.keyword = keyword as string;
      if (active !== undefined) filters.isActive = active === 'true';
      if (sortBy) filters.sortBy = sortBy as string;
      if (sortOrder) filters.sortOrder = sortOrder as 'asc' | 'desc';

      const packages = await this.packageService.getAllPackages(filters);

      res.status(200).json({
        success: true,
        data: packages,
        count: packages.length,
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: error instanceof Error ? error.message : 'Có lỗi xảy ra',
      });
    }
  }

  // For app - Get package by ID
  async getPackageById(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;
      const pkg = await this.packageService.getPackageById(id);

      if (!pkg) {
        res.status(404).json({
          success: false,
          message: 'Không tìm thấy gói dịch vụ',
        });
        return;
      }

      res.status(200).json({
        success: true,
        data: pkg,
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: error instanceof Error ? error.message : 'Có lỗi xảy ra',
      });
    }
  }

  // Admin methods
  async list(req: Request, res: Response): Promise<Response> {
    try {
      const { keyword, active, popular, sortBy, sortOrder } = req.query;

      if (popular === 'true') {
        const packages = await this.packageService.getPopularPackages();
        return res.status(200).json({
          success: true,
          data: packages,
          count: packages.length,
        });
      }

      const filters: any = {};
      if (keyword) filters.keyword = keyword as string;
      if (active !== undefined) filters.isActive = active === 'true';
      if (sortBy) filters.sortBy = sortBy as string;
      if (sortOrder) filters.sortOrder = sortOrder as 'asc' | 'desc';

      const packages = await this.packageService.getAllPackages(filters);

      return res.status(200).json({
        success: true,
        data: packages,
        count: packages.length,
      });
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: error instanceof Error ? error.message : 'Internal server error',
      });
    }
  }

  async getById(req: Request, res: Response): Promise<Response> {
    try {
      const { id } = req.params;
      const pkg = await this.packageService.getPackageById(id);

      if (!pkg) {
        return res.status(404).json({
          success: false,
          message: 'Package not found',
        });
      }

      return res.status(200).json({
        success: true,
        data: pkg,
      });
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: error instanceof Error ? error.message : 'Internal server error',
      });
    }
  }

  async getBySlug(req: Request, res: Response): Promise<Response> {
    try {
      const { slug } = req.params;
      const pkg = await this.packageService.getPackageBySlug(slug);

      if (!pkg) {
        return res.status(404).json({
          success: false,
          message: 'Package not found',
        });
      }

      return res.status(200).json({
        success: true,
        data: pkg,
      });
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: error instanceof Error ? error.message : 'Internal server error',
      });
    }
  }

  async create(req: Request, res: Response): Promise<Response> {
    try {
      const input: CreatePackageDTO = req.body;
      const pkg = await this.packageService.createPackage(input);

      return res.status(201).json({
        success: true,
        data: pkg,
        message: 'Package created successfully',
      });
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: error instanceof Error ? error.message : 'Internal server error',
      });
    }
  }

  async update(req: Request, res: Response): Promise<Response> {
    try {
      const { id } = req.params;
      const input: UpdatePackageDTO = req.body;
      const pkg = await this.packageService.updatePackage(id, input);

      if (!pkg) {
        return res.status(404).json({
          success: false,
          message: 'Package not found',
        });
      }

      return res.status(200).json({
        success: true,
        data: pkg,
        message: 'Package updated successfully',
      });
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: error instanceof Error ? error.message : 'Internal server error',
      });
    }
  }

  async delete(req: Request, res: Response): Promise<Response> {
    try {
      const { id } = req.params;
      const deleted = await this.packageService.deletePackage(id);

      if (!deleted) {
        return res.status(404).json({
          success: false,
          message: 'Package not found',
        });
      }

      return res.status(200).json({
        success: true,
        message: 'Package deleted successfully',
      });
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: error instanceof Error ? error.message : 'Internal server error',
      });
    }
  }
}
