import { Package } from '../entities/Package';

export interface IPackageRepository {
  findAll(): Promise<Package[]>;
  findById(id: string): Promise<Package | null>;
  findBySlug(slug: string): Promise<Package | null>;
  findActive(): Promise<Package[]>;
  findPopular(): Promise<Package[]>;
  create(pkg: Package): Promise<Package>;
  update(id: string, data: Partial<Package>): Promise<Package | null>;
  delete(id: string): Promise<boolean>;
}
