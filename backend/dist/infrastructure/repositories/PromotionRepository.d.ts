import { IPromotionRepository } from '../../domain/repositories/IPromotionRepository';
import { Promotion } from '../../domain/entities/Promotion';
export declare class PromotionRepository implements IPromotionRepository {
    private readonly tableName;
    private mapRowToEntity;
    findAll(filters?: {
        keyword?: string;
        discountType?: string;
        isActive?: boolean;
        sortBy?: string;
        sortOrder?: 'asc' | 'desc';
    }): Promise<Promotion[]>;
    findById(id: string): Promise<Promotion | null>;
    findByCode(code: string): Promise<Promotion | null>;
    findActive(): Promise<Promotion[]>;
    findByService(serviceId: string): Promise<Promotion[]>;
    findByPackage(packageId: string): Promise<Promotion[]>;
    create(promotion: Promotion): Promise<Promotion>;
    update(id: string, data: Partial<Promotion>): Promise<Promotion | null>;
    delete(id: string): Promise<boolean>;
}
//# sourceMappingURL=PromotionRepository.d.ts.map