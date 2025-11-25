import { Promotion } from '../entities/Promotion';
export interface IPromotionRepository {
    findAll(): Promise<Promotion[]>;
    findById(id: string): Promise<Promotion | null>;
    findByCode(code: string): Promise<Promotion | null>;
    findActive(): Promise<Promotion[]>;
    findByService(serviceId: string): Promise<Promotion[]>;
    findByPackage(packageId: string): Promise<Promotion[]>;
    create(promotion: Promotion): Promise<Promotion>;
    update(id: string, data: Partial<Promotion>): Promise<Promotion | null>;
    delete(id: string): Promise<boolean>;
}
//# sourceMappingURL=IPromotionRepository.d.ts.map