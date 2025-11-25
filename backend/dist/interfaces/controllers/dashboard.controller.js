"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DashboardController = void 0;
const database_1 = require("../../infrastructure/config/database");
class DashboardController {
    async getStats(req, res) {
        try {
            // Get total orders
            const ordersCount = await (0, database_1.db)('orders').count('* as count').first();
            // Get total revenue
            const revenueResult = await (0, database_1.db)('orders')
                .sum('final_amount as total')
                .first();
            // Get total products
            const productsCount = await (0, database_1.db)('products').count('* as count').first();
            // Get total customers (unique emails from orders)
            const customersCount = await (0, database_1.db)('orders')
                .countDistinct('client_email as count')
                .first();
            // Get pending orders count
            const pendingOrders = await (0, database_1.db)('orders')
                .where('status', 'pending')
                .count('* as count')
                .first();
            // Get inactive products (since stock_quantity doesn't exist)
            const inactiveProducts = await (0, database_1.db)('products')
                .where('is_active', false)
                .count('* as count')
                .first();
            // Get recent orders
            const recentOrders = await (0, database_1.db)('orders')
                .select('id', 'client_name', 'client_email', 'final_amount', 'status', 'created_at')
                .orderBy('created_at', 'desc')
                .limit(5);
            res.json({
                success: true,
                data: {
                    stats: {
                        totalOrders: ordersCount?.count || 0,
                        revenue: revenueResult?.total || 0,
                        totalProducts: productsCount?.count || 0,
                        totalCustomers: customersCount?.count || 0,
                    },
                    quickStats: {
                        pendingOrders: pendingOrders?.count || 0,
                        inactiveProducts: inactiveProducts?.count || 0,
                    },
                    recentOrders: recentOrders.map(order => ({
                        id: order.id,
                        code: order.id.substring(0, 8).toUpperCase(),
                        customer: order.client_name,
                        email: order.client_email,
                        total: order.final_amount,
                        status: order.status,
                        createdAt: order.created_at,
                    })),
                },
            });
        }
        catch (error) {
            res.status(500).json({
                success: false,
                message: 'Failed to fetch dashboard stats',
                error: error instanceof Error ? error.message : 'Unknown error',
            });
        }
    }
}
exports.DashboardController = DashboardController;
//# sourceMappingURL=dashboard.controller.js.map