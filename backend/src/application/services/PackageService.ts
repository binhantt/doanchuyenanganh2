import { Package } from '../../domain/entities/Package';
import { IPackageRepository } from '../../domain/repositories/IPackageRepository';
import { IPackageService } from '../interfaces/IPackageService';
import { CreatePackageDTO, UpdatePackageDTO } from '../dto/PackageDTO';
import { v4 as uuidv4 } from 'uuid';

export class PackageService implements IPackageService {
  constructor(private readonly packageRepository: IPackageRepository) {}

  async getAllPackages(filters?: {
    keyword?: string;
    isActive?: boolean;
    isPopular?: boolean;
    sortBy?: string;
    sortOrder?: 'asc' | 'desc';
  }): Promise<Package[]> {
    return await this.packageRepository.findAll(filters);
  }

  async getPackageById(id: string): Promise<Package | null> {
    return await this.packageRepository.findById(id);
  }

  async getPackageBySlug(slug: string): Promise<Package | null> {
    return await this.packageRepository.findBySlug(slug);
  }

  async getPopularPackages(): Promise<Package[]> {
    return await this.packageRepository.findPopular();
  }

  async createPackage(data: CreatePackageDTO): Promise<Package> {
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

    const pkg = new Package(
      uuidv4(),
      data.name,
      data.slug,
      data.description,
      data.price,
      data.features,
      data.images || [],
      data.isPopular ?? false,
      data.isActive ?? true
    );

    return await this.packageRepository.create(pkg);
  }

  async updatePackage(id: string, data: UpdatePackageDTO): Promise<Package | null> {
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

  async deletePackage(id: string): Promise<boolean> {
    const existing = await this.packageRepository.findById(id);
    if (!existing) {
      return false;
    }

    return await this.packageRepository.delete(id);
  }
}
