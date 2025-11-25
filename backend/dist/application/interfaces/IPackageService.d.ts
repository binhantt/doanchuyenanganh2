import { Package } from '../../domain/entities/Package';
import { CreatePackageDTO, UpdatePackageDTO } from '../dto/PackageDTO';
export interface IPackageService {
    getAllPackages(filters?: {
        keyword?: string;
        isActive?: boolean;
        isPopular?: boolean;
        sortBy?: string;
        sortOrder?: 'asc' | 'desc';
    }): Promise<Package[]>;
    getPackageById(id: string): Promise<Package | null>;
    getPackageBySlug(slug: string): Promise<Package | null>;
    getPopularPackages(): Promise<Package[]>;
    createPackage(data: CreatePackageDTO): Promise<Package>;
    updatePackage(id: string, data: UpdatePackageDTO): Promise<Package | null>;
    deletePackage(id: string): Promise<boolean>;
}
//# sourceMappingURL=IPackageService.d.ts.map