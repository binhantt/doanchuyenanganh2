import { Order } from '../entities/Order';
export interface IOrderRepository {
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
//# sourceMappingURL=IOrderRepository.d.ts.map