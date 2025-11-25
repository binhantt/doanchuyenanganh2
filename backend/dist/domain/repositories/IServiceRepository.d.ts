import { Service } from '../entities/Service';
export interface IServiceRepository {
    findAll(): Promise<Service[]>;
    findById(id: string): Promise<Service | null>;
    findBySlug(slug: string): Promise<Service | null>;
    findActive(): Promise<Service[]>;
    create(service: Service): Promise<Service>;
    update(id: string, data: Partial<Service>): Promise<Service | null>;
    delete(id: string): Promise<boolean>;
}
//# sourceMappingURL=IServiceRepository.d.ts.map