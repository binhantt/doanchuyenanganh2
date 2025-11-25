"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PackageController = void 0;
class PackageController {
    constructor(packageService) {
        this.packageService = packageService;
    }
    // For app - Get all packages
    async getAllPackages(req, res) {
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
            const filters = {};
            if (keyword)
                filters.keyword = keyword;
            if (active !== undefined)
                filters.isActive = active === 'true';
            if (sortBy)
                filters.sortBy = sortBy;
            if (sortOrder)
                filters.sortOrder = sortOrder;
            const packages = await this.packageService.getAllPackages(filters);
            res.status(200).json({
                success: true,
                data: packages,
                count: packages.length,
            });
        }
        catch (error) {
            res.status(500).json({
                success: false,
                message: error instanceof Error ? error.message : 'Có lỗi xảy ra',
            });
        }
    }
    // For app - Get package by ID
    async getPackageById(req, res) {
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
        }
        catch (error) {
            res.status(500).json({
                success: false,
                message: error instanceof Error ? error.message : 'Có lỗi xảy ra',
            });
        }
    }
    // Admin methods
    async list(req, res) {
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
            const filters = {};
            if (keyword)
                filters.keyword = keyword;
            if (active !== undefined)
                filters.isActive = active === 'true';
            if (sortBy)
                filters.sortBy = sortBy;
            if (sortOrder)
                filters.sortOrder = sortOrder;
            const packages = await this.packageService.getAllPackages(filters);
            return res.status(200).json({
                success: true,
                data: packages,
                count: packages.length,
            });
        }
        catch (error) {
            return res.status(500).json({
                success: false,
                message: error instanceof Error ? error.message : 'Internal server error',
            });
        }
    }
    async getById(req, res) {
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
        }
        catch (error) {
            return res.status(500).json({
                success: false,
                message: error instanceof Error ? error.message : 'Internal server error',
            });
        }
    }
    async getBySlug(req, res) {
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
        }
        catch (error) {
            return res.status(500).json({
                success: false,
                message: error instanceof Error ? error.message : 'Internal server error',
            });
        }
    }
    async create(req, res) {
        try {
            const input = req.body;
            const pkg = await this.packageService.createPackage(input);
            return res.status(201).json({
                success: true,
                data: pkg,
                message: 'Package created successfully',
            });
        }
        catch (error) {
            return res.status(500).json({
                success: false,
                message: error instanceof Error ? error.message : 'Internal server error',
            });
        }
    }
    async update(req, res) {
        try {
            const { id } = req.params;
            const input = req.body;
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
        }
        catch (error) {
            return res.status(500).json({
                success: false,
                message: error instanceof Error ? error.message : 'Internal server error',
            });
        }
    }
    async delete(req, res) {
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
        }
        catch (error) {
            return res.status(500).json({
                success: false,
                message: error instanceof Error ? error.message : 'Internal server error',
            });
        }
    }
}
exports.PackageController = PackageController;
//# sourceMappingURL=package.controller.js.map