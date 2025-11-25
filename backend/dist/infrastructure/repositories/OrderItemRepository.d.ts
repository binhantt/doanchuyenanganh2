import { OrderItem } from '../../domain/entities/OrderItem';
export declare class OrderItemRepository {
    private readonly tableName;
    private mapRowToEntity;
    findByOrderId(orderId: string): Promise<OrderItem[]>;
    findById(id: string): Promise<OrderItem | null>;
    create(item: OrderItem): Promise<OrderItem>;
    createBulk(items: OrderItem[]): Promise<OrderItem[]>;
    update(id: string, data: Partial<OrderItem>): Promise<OrderItem | null>;
    delete(id: string): Promise<boolean>;
    deleteByOrderId(orderId: string): Promise<boolean>;
}
//# sourceMappingURL=OrderItemRepository.d.ts.map