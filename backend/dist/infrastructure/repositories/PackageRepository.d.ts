import { IPackageRepository } from '../../domain/repositories/IPackageRepository';
import { Package } from '../../domain/entities/Package';
export declare class PackageRepository implements IPackageRepository {
    private readonly tableName;
    private loadFeaturesAndImages;
    private mapRowToEntity;
    findAll(filters?: {
        keyword?: string;
        isActive?: boolean;
        isPopular?: boolean;
        sortBy?: string;
        sortOrder?: 'asc' | 'desc';
    }): Promise<Package[]>;
    findById(id: string): Promise<Package | null>;
    findBySlug(slug: string): Promise<Package | null>;
    findActive(): Promise<Package[]>;
    findPopular(): Promise<Package[]>;
    create(pkg: Package): Promise<Package>;
    update(id: string, data: Partial<Package>): Promise<Package | null>;
    delete(id: string): Promise<boolean>;
}
//# sourceMappingURL=PackageRepository.d.ts.map