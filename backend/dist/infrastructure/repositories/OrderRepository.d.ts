import { IOrderRepository } from '../../domain/repositories/IOrderRepository';
import { Order } from '../../domain/entities/Order';
export declare class OrderRepository implements IOrderRepository {
    private readonly tableName;
    private loadOrderItems;
    private mapRowToEntity;
    findAll(filters?: {
        keyword?: string;
        status?: string;
        sortBy?: string;
        sortOrder?: 'asc' | 'desc';
    }): Promise<Order[]>;
    findById(id: string): Promise<Order | null>;
    findByEmail(email: string): Promise<Order[]>;
    findByStatus(status: string): Promise<Order[]>;
    findByDateRange(startDate: Date, endDate: Date): Promise<Order[]>;
    create(order: Order): Promise<Order>;
    update(id: string, data: Partial<Order>): Promise<Order | null>;
    delete(id: string): Promise<boolean>;
}
//# sourceMappingURL=OrderRepository.d.ts.map