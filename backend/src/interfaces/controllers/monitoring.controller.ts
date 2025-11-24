import { Request, Response } from 'express';
import { connectionTracker } from '../../shared/utils/connectionTracker';

export class MonitoringController {
  // Get all active connections
  async getActiveConnections(req: Request, res: Response): Promise<void> {
    try {
      const connections = connectionTracker.getActiveConnections();

      res.json({
        success: true,
        data: connections.map((conn) => ({
          id: conn.id,
          userType: conn.userType,
          userId: conn.userId,
          orderId: conn.orderId,
          ip: conn.ip,
          userAgent: conn.userAgent,
          connectedAt: conn.connectedAt,
          lastActivity: conn.lastActivity,
          endpoint: conn.endpoint,
          duration: Math.floor((Date.now() - conn.connectedAt.getTime()) / 1000), // seconds
        })),
        count: connections.length,
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: 'Có lỗi xảy ra khi lấy danh sách kết nối',
      });
    }
  }

  // Get connection statistics
  async getConnectionStats(req: Request, res: Response): Promise<void> {
    try {
      const stats = connectionTracker.getStats();

      res.json({
        success: true,
        data: {
          ...stats,
          timestamp: new Date(),
        },
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: 'Có lỗi xảy ra khi lấy thống kê',
      });
    }
  }

  // Get connections by type
  async getConnectionsByType(req: Request, res: Response): Promise<void> {
    try {
      const { type } = req.params;

      if (!['admin', 'customer', 'guest'].includes(type)) {
        res.status(400).json({
          success: false,
          message: 'Loại kết nối không hợp lệ',
        });
        return;
      }

      const connections = connectionTracker.getConnectionsByType(
        type as 'admin' | 'customer' | 'guest'
      );

      res.json({
        success: true,
        data: connections,
        count: connections.length,
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: 'Có lỗi xảy ra',
      });
    }
  }

  // Get real-time dashboard data
  async getDashboard(req: Request, res: Response): Promise<void> {
    try {
      const stats = connectionTracker.getStats();
      const connections = connectionTracker.getActiveConnections();

      // Calculate average session duration
      const now = Date.now();
      const avgDuration =
        connections.length > 0
          ? connections.reduce(
              (sum, conn) => sum + (now - conn.connectedAt.getTime()),
              0
            ) /
            connections.length /
            1000
          : 0;

      // Get most active endpoints
      const endpointStats = Object.entries(stats.byEndpoint)
        .sort(([, a], [, b]) => b - a)
        .slice(0, 10)
        .map(([endpoint, count]) => ({ endpoint, count }));

      res.json({
        success: true,
        data: {
          totalConnections: stats.total,
          connectionsByType: {
            admin: stats.admin,
            customer: stats.customer,
            guest: stats.guest,
          },
          averageSessionDuration: Math.floor(avgDuration),
          topEndpoints: endpointStats,
          recentConnections: connections
            .sort((a, b) => b.connectedAt.getTime() - a.connectedAt.getTime())
            .slice(0, 10)
            .map((conn) => ({
              userType: conn.userType,
              endpoint: conn.endpoint,
              connectedAt: conn.connectedAt,
              duration: Math.floor((now - conn.connectedAt.getTime()) / 1000),
            })),
          timestamp: new Date(),
        },
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: 'Có lỗi xảy ra',
      });
    }
  }
}
