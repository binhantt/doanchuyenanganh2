import { Package } from '../../domain/entities/Package';
import { IPackageRepository } from '../../domain/repositories/IPackageRepository';
import { IPackageService } from '../interfaces/IPackageService';
import { CreatePackageDTO, UpdatePackageDTO } from '../dto/PackageDTO';
export declare class PackageService implements IPackageService {
    private readonly packageRepository;
    constructor(packageRepository: IPackageRepository);
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
//# sourceMappingURL=PackageService.d.ts.map