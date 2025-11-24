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

class ConnectionTracker {
  private connections: Map<string, Connection> = new Map();
  private readonly INACTIVE_TIMEOUT = 5 * 60 * 1000; // 5 minutes

  // Add new connection
  addConnection(connectionId: string, data: Omit<Connection, 'id' | 'connectedAt' | 'lastActivity'>): void {
    const connection: Connection = {
      id: connectionId,
      ...data,
      connectedAt: new Date(),
      lastActivity: new Date(),
    };
    this.connections.set(connectionId, connection);
    this.cleanupInactiveConnections();
  }

  // Update connection activity
  updateActivity(connectionId: string, endpoint?: string): void {
    const connection = this.connections.get(connectionId);
    if (connection) {
      connection.lastActivity = new Date();
      if (endpoint) {
        connection.endpoint = endpoint;
      }
    }
  }

  // Remove connection
  removeConnection(connectionId: string): void {
    this.connections.delete(connectionId);
  }

  // Get all active connections
  getActiveConnections(): Connection[] {
    this.cleanupInactiveConnections();
    return Array.from(this.connections.values());
  }

  // Get connections by user type
  getConnectionsByType(userType: 'admin' | 'customer' | 'guest'): Connection[] {
    this.cleanupInactiveConnections();
    return Array.from(this.connections.values()).filter((conn) => conn.userType === userType);
  }

  // Get connection count
  getConnectionCount(): number {
    this.cleanupInactiveConnections();
    return this.connections.size;
  }

  // Get connection stats
  getStats(): {
    total: number;
    admin: number;
    customer: number;
    guest: number;
    byEndpoint: Record<string, number>;
  } {
    this.cleanupInactiveConnections();
    const connections = Array.from(this.connections.values());

    const byEndpoint: Record<string, number> = {};
    connections.forEach((conn) => {
      if (conn.endpoint) {
        byEndpoint[conn.endpoint] = (byEndpoint[conn.endpoint] || 0) + 1;
      }
    });

    return {
      total: connections.length,
      admin: connections.filter((c) => c.userType === 'admin').length,
      customer: connections.filter((c) => c.userType === 'customer').length,
      guest: connections.filter((c) => c.userType === 'guest').length,
      byEndpoint,
    };
  }

  // Clean up inactive connections
  private cleanupInactiveConnections(): void {
    const now = Date.now();
    for (const [id, connection] of this.connections.entries()) {
      if (now - connection.lastActivity.getTime() > this.INACTIVE_TIMEOUT) {
        this.connections.delete(id);
      }
    }
  }

  // Get connection by ID
  getConnection(connectionId: string): Connection | undefined {
    return this.connections.get(connectionId);
  }

  // Clear all connections (for testing)
  clearAll(): void {
    this.connections.clear();
  }
}

// Singleton instance
export const connectionTracker = new ConnectionTracker();
