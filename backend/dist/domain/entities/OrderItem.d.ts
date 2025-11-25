export declare class OrderItem {
    readonly id: string;
    readonly orderId: string;
    readonly productId: string | null;
    readonly packageId: string | null;
    readonly serviceId: string | null;
    readonly itemType: 'product' | 'package' | 'service' | 'menu';
    readonly itemName: string;
    readonly description: string | null;
    readonly quantity: number;
    readonly unitPrice: number;
    readonly subtotal: number;
    readonly createdAt?: Date | undefined;
    readonly updatedAt?: Date | undefined;
    constructor(id: string, orderId: string, productId: string | null, packageId: string | null, serviceId: string | null, itemType: 'product' | 'package' | 'service' | 'menu', itemName: string, description: string | null, quantity: number, unitPrice: number, subtotal: number, createdAt?: Date | undefined, updatedAt?: Date | undefined);
    isProduct(): boolean;
    isPackage(): boolean;
    isService(): boolean;
    getRelatedId(): string | null;
}
//# sourceMappingURL=OrderItem.d.ts.map