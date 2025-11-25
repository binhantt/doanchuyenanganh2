import { IServiceRepository } from '../../domain/repositories/IServiceRepository';
import { Service } from '../../domain/entities/Service';
export declare class ServiceRepository implements IServiceRepository {
    private readonly tableName;
    private mapRowToEntity;
    private loadFeaturesAndImages;
    findAll(): Promise<Service[]>;
    findById(id: string): Promise<Service | null>;
    findBySlug(slug: string): Promise<Service | null>;
    findActive(): Promise<Service[]>;
    create(service: Service): Promise<Service>;
    update(id: string, data: Partial<Service>): Promise<Service | null>;
    delete(id: string): Promise<boolean>;
}
//# sourceMappingURL=ServiceRepository.d.ts.map