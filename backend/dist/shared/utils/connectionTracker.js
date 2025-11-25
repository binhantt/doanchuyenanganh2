"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.connectionTracker = void 0;
class ConnectionTracker {
    constructor() {
        this.connections = new Map();
        this.INACTIVE_TIMEOUT = 5 * 60 * 1000; // 5 minutes
    }
    // Add new connection
    addConnection(connectionId, data) {
        const connection = {
            id: connectionId,
            ...data,
            connectedAt: new Date(),
            lastActivity: new Date(),
        };
        this.connections.set(connectionId, connection);
        this.cleanupInactiveConnections();
    }
    // Update connection activity
    updateActivity(connectionId, endpoint) {
        const connection = this.connections.get(connectionId);
        if (connection) {
            connection.lastActivity = new Date();
            if (endpoint) {
                connection.endpoint = endpoint;
            }
        }
    }
    // Remove connection
    removeConnection(connectionId) {
        this.connections.delete(connectionId);
    }
    // Get all active connections
    getActiveConnections() {
        this.cleanupInactiveConnections();
        return Array.from(this.connections.values());
    }
    // Get connections by user type
    getConnectionsByType(userType) {
        this.cleanupInactiveConnections();
        return Array.from(this.connections.values()).filter((conn) => conn.userType === userType);
    }
    // Get connection count
    getConnectionCount() {
        this.cleanupInactiveConnections();
        return this.connections.size;
    }
    // Get connection stats
    getStats() {
        this.cleanupInactiveConnections();
        const connections = Array.from(this.connections.values());
        const byEndpoint = {};
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
    cleanupInactiveConnections() {
        const now = Date.now();
        for (const [id, connection] of this.connections.entries()) {
            if (now - connection.lastActivity.getTime() > this.INACTIVE_TIMEOUT) {
                this.connections.delete(id);
            }
        }
    }
    // Get connection by ID
    getConnection(connectionId) {
        return this.connections.get(connectionId);
    }
    // Clear all connections (for testing)
    clearAll() {
        this.connections.clear();
    }
}
// Singleton instance
exports.connectionTracker = new ConnectionTracker();
//# sourceMappingURL=connectionTracker.js.map