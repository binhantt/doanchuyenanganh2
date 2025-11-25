interface Connection {
    id: string;
    userId?: string;
    orderId?: string;
    userType: 'admin' | 'customer' | 'guest';
    ip: string;
    userAgent: string;
    connectedAt: Date;
    lastActivity: Date;
    endpoint?: string;
}
declare class ConnectionTracker {
    private connections;
    private readonly INACTIVE_TIMEOUT;
    addConnection(connectionId: string, data: Omit<Connection, 'id' | 'connectedAt' | 'lastActivity'>): void;
    updateActivity(connectionId: string, endpoint?: string): void;
    removeConnection(connectionId: string): void;
    getActiveConnections(): Connection[];
    getConnectionsByType(userType: 'admin' | 'customer' | 'guest'): Connection[];
    getConnectionCount(): number;
    getStats(): {
        total: number;
        admin: number;
        customer: number;
        guest: number;
        byEndpoint: Record<string, number>;
    };
    private cleanupInactiveConnections;
    getConnection(connectionId: string): Connection | undefined;
    clearAll(): void;
}
export declare const connectionTracker: ConnectionTracker;
export {};
//# sourceMappingURL=connectionTracker.d.ts.map