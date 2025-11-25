"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PackageService = void 0;
const Package_1 = require("../../domain/entities/Package");
const uuid_1 = require("uuid");
class PackageService {
    constructor(packageRepository) {
        this.packageRepository = packageRepository;
    }
    async getAllPackages(filters) {
        return await this.packageRepository.findAll(filters);
    }
    async getPackageById(id) {
        return await this.packageRepository.findById(id);
    }
    async getPackageBySlug(slug) {
        return await this.packageRepository.findBySlug(slug);
    }
    async getPopularPackages() {
        return await this.packageRepository.findPopular();
    }
    async createPackage(data) {
        if (data.price < 0) {
            throw new Error('Price must be non-negative');
        }
        if (!data.features.included || data.features.included.length === 0) {
            throw new Error('Package must have at least one included feature');
        }
        const existing = await this.packageRepository.findBySlug(data.slug);
        if (existing) {
            throw new Error(`Package with slug "${data.slug}" already exists`);
        }
        const pkg = new Package_1.Package((0, uuid_1.v4)(), data.name, data.slug, data.description, data.price, data.features, data.images || [], data.isPopular ?? false, data.isActive ?? true);
        return await this.packageRepository.create(pkg);
    }
    async updatePackage(id, data) {
        const existing = await this.packageRepository.findById(id);
        if (!existing) {
            return null;
        }
        if (data.price !== undefined && data.price < 0) {
            throw new Error('Price must be non-negative');
        }
        if (data.features !== undefined && (!data.features.included || data.features.included.length === 0)) {
            throw new Error('Package must have at least one included feature');
        }
        if (data.slug && data.slug !== existing.slug) {
            const slugExists = await this.packageRepository.findBySlug(data.slug);
            if (slugExists) {
                throw new Error(`Package with slug "${data.slug}" already exists`);
            }
        }
        return await this.packageRepository.update(id, data);
    }
    async deletePackage(id) {
        const existing = await this.packageRepository.findById(id);
        if (!existing) {
            return false;
        }
        return await this.packageRepository.delete(id);
    }
}
exports.PackageService = PackageService;
//# sourceMappingURL=PackageService.js.map