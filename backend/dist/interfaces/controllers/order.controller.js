"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrderController = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
class OrderController {
    constructor(orderService) {
        this.orderService = orderService;
    }
    // Verify order - Login for app
    async verifyOrder(req, res) {
        try {
            const { orderCode, customerName } = req.body;
            if (!orderCode || !customerName) {
                res.status(400).json({
                    success: false,
                    message: 'Mã đơn hàng và tên khách hàng là bắt buộc',
                });
                return;
            }
            // Find order by client name (case insensitive)
            const orders = await this.orderService.getAllOrders({
                keyword: customerName,
            });
            // Filter by order ID (which acts as order code)
            const order = orders.find((o) => o.id.toUpperCase().includes(orderCode.toUpperCase()) &&
                o.clientName.toLowerCase() === customerName.toLowerCase());
            if (!order) {
                res.status(404).json({
                    success: false,
                    message: 'Không tìm thấy đơn hàng hoặc thông tin không khớp',
                });
                return;
            }
            // Generate token
            const secret = process.env.JWT_SECRET || 'wedding-app-secret-key';
            const token = jsonwebtoken_1.default.sign({ orderId: order.id, type: 'customer' }, secret, { expiresIn: '30d' });
            res.json({
                success: true,
                token,
                order: {
                    id: order.id,
                    orderCode: order.id.substring(0, 8).toUpperCase(),
                    customerName: order.clientName,
                    productName: order.items.map((i) => i.productName).join(', ') || 'Dịch vụ cưới',
                    status: order.status,
                    weddingDate: order.weddingDate,
                    venue: order.venue,
                    totalAmount: order.totalAmount,
                    depositAmount: order.depositAmount,
                    createdAt: order.createdAt,
                },
            });
        }
        catch (error) {
            console.error('Verify order error:', error);
            res.status(500).json({
                success: false,
                message: 'Có lỗi xảy ra. Vui lòng thử lại.',
            });
        }
    }
    // Register new order - Sign up for app
    async registerOrder(req, res) {
        try {
            const { clientName, clientEmail, clientPhone, weddingDate, guestCount, venue, notes, items, paymentMethod, } = req.body;
            // Validation
            if (!clientName || !clientEmail || !clientPhone || !weddingDate) {
                res.status(400).json({
                    success: false,
                    message: 'Vui lòng điền đầy đủ thông tin bắt buộc',
                });
                return;
            }
            if (!items || items.length === 0) {
                res.status(400).json({
                    success: false,
                    message: 'Vui lòng chọn ít nhất một sản phẩm/dịch vụ',
                });
                return;
            }
            // Create order
            const order = await this.orderService.createOrder({
                clientName,
                clientEmail,
                clientPhone,
                weddingDate: new Date(weddingDate),
                guestCount: guestCount || 50,
                venue: venue || '',
                notes: notes || '',
                items,
                paymentMethod: paymentMethod || 'bank_transfer',
            });
            // Generate token
            const secret = process.env.JWT_SECRET || 'wedding-app-secret-key';
            const token = jsonwebtoken_1.default.sign({ orderId: order.id, type: 'customer' }, secret, { expiresIn: '30d' });
            res.status(201).json({
                success: true,
                message: 'Đăng ký thành công! Mã đơn hàng của bạn đã được tạo.',
                token,
                order: {
                    id: order.id,
                    orderCode: order.id.substring(0, 8).toUpperCase(),
                    customerName: order.clientName,
                    productName: order.items.map((i) => i.productName).join(', '),
                    status: order.status,
                    weddingDate: order.weddingDate,
                    venue: order.venue,
                    totalAmount: order.totalAmount,
                    depositAmount: order.depositAmount,
                    createdAt: order.createdAt,
                },
            });
        }
        catch (error) {
            console.error('Register order error:', error);
            res.status(500).json({
                success: false,
                message: error.message || 'Có lỗi xảy ra. Vui lòng thử lại.',
            });
        }
    }
    // Get order by ID
    async getOrderById(req, res) {
        try {
            const { id } = req.params;
            const order = await this.orderService.getOrderById(id);
            if (!order) {
                res.status(404).json({
                    success: false,
                    message: 'Không tìm thấy đơn hàng',
                });
                return;
            }
            res.json({
                success: true,
                data: {
                    id: order.id,
                    orderCode: order.id.substring(0, 8).toUpperCase(),
                    customerName: order.clientName,
                    email: order.clientEmail,
                    phone: order.clientPhone,
                    weddingDate: order.weddingDate,
                    guestCount: order.guestCount,
                    venue: order.venue,
                    notes: order.notes,
                    items: order.items,
                    paymentMethod: order.paymentMethod,
                    totalAmount: order.totalAmount,
                    depositAmount: order.depositAmount,
                    status: order.status,
                    discountAmount: order.discountAmount,
                    finalAmount: order.finalAmount,
                    createdAt: order.createdAt,
                    updatedAt: order.updatedAt,
                },
            });
        }
        catch (error) {
            console.error('Get order error:', error);
            res.status(500).json({
                success: false,
                message: 'Có lỗi xảy ra. Vui lòng thử lại.',
            });
        }
    }
    // Create new order (same as register but without auto-login)
    async createOrder(req, res) {
        try {
            const { clientName, clientEmail, clientPhone, weddingDate, guestCount, venue, notes, items, paymentMethod, promotionCode, } = req.body;
            const order = await this.orderService.createOrder({
                clientName,
                clientEmail,
                clientPhone,
                weddingDate: new Date(weddingDate),
                guestCount: guestCount || 50,
                venue: venue || '',
                notes: notes || '',
                items,
                paymentMethod: paymentMethod || 'bank_transfer',
                promotionCode,
            });
            res.status(201).json({
                success: true,
                message: 'Tạo đơn hàng thành công',
                data: order,
            });
        }
        catch (error) {
            console.error('Create order error:', error);
            res.status(500).json({
                success: false,
                message: error.message || 'Có lỗi xảy ra. Vui lòng thử lại.',
            });
        }
    }
    // Get orders by email
    async getOrdersByEmail(req, res) {
        try {
            const { email } = req.params;
            if (!email) {
                res.status(400).json({
                    success: false,
                    message: 'Email là bắt buộc',
                });
                return;
            }
            const orders = await this.orderService.getOrdersByEmail(email);
            res.json({
                success: true,
                data: orders.map((order) => ({
                    id: order.id,
                    orderCode: order.id.substring(0, 8).toUpperCase(),
                    customerName: order.clientName,
                    weddingDate: order.weddingDate,
                    venue: order.venue,
                    totalAmount: order.totalAmount,
                    status: order.status,
                    createdAt: order.createdAt,
                })),
            });
        }
        catch (error) {
            console.error('Get orders by email error:', error);
            res.status(500).json({
                success: false,
                message: 'Có lỗi xảy ra. Vui lòng thử lại.',
            });
        }
    }
    // Apply voucher
    async applyVoucher(req, res) {
        try {
            const { voucherCode, totalAmount } = req.body;
            if (!voucherCode || !totalAmount) {
                res.status(400).json({
                    success: false,
                    message: 'Mã voucher và tổng tiền là bắt buộc',
                });
                return;
            }
            const result = await this.orderService.applyVoucher(voucherCode, totalAmount);
            if (!result.valid) {
                res.status(400).json({
                    success: false,
                    message: result.message,
                });
                return;
            }
            res.json({
                success: true,
                message: 'Áp dụng mã giảm giá thành công',
                data: {
                    voucherCode: result.voucherCode,
                    discountAmount: result.discountAmount,
                    finalAmount: result.finalAmount,
                    discountType: result.discountType,
                    discountValue: result.discountValue,
                },
            });
        }
        catch (error) {
            console.error('Apply voucher error:', error);
            res.status(500).json({
                success: false,
                message: 'Có lỗi xảy ra. Vui lòng thử lại.',
            });
        }
    }
    // Admin methods
    // Get all orders
    async getAllOrders(req, res) {
        try {
            const { keyword, status, sortBy, sortOrder } = req.query;
            const filters = {};
            if (keyword)
                filters.keyword = keyword;
            if (status)
                filters.status = status;
            if (sortBy)
                filters.sortBy = sortBy;
            if (sortOrder)
                filters.sortOrder = sortOrder;
            const orders = await this.orderService.getAllOrders(filters);
            res.json({
                success: true,
                data: orders,
                count: orders.length,
            });
        }
        catch (error) {
            console.error('Get all orders error:', error);
            res.status(500).json({
                success: false,
                message: 'Có lỗi xảy ra',
            });
        }
    }
    // Get orders by status
    async getOrdersByStatus(req, res) {
        try {
            const { status } = req.params;
            const orders = await this.orderService.getOrdersByStatus(status);
            res.json({
                success: true,
                data: orders,
                count: orders.length,
            });
        }
        catch (error) {
            console.error('Get orders by status error:', error);
            res.status(500).json({
                success: false,
                message: 'Có lỗi xảy ra',
            });
        }
    }
    // Update order status
    async updateOrderStatus(req, res) {
        try {
            const { id } = req.params;
            const { status } = req.body;
            if (!status) {
                res.status(400).json({
                    success: false,
                    message: 'Trạng thái là bắt buộc',
                });
                return;
            }
            const validStatuses = ['pending', 'confirmed', 'paid', 'completed', 'cancelled'];
            if (!validStatuses.includes(status)) {
                res.status(400).json({
                    success: false,
                    message: 'Trạng thái không hợp lệ',
                });
                return;
            }
            const order = await this.orderService.updateOrder(id, { status });
            if (!order) {
                res.status(404).json({
                    success: false,
                    message: 'Không tìm thấy đơn hàng',
                });
                return;
            }
            res.json({
                success: true,
                message: 'Cập nhật trạng thái thành công',
                data: order,
            });
        }
        catch (error) {
            console.error('Update order status error:', error);
            res.status(500).json({
                success: false,
                message: 'Có lỗi xảy ra',
            });
        }
    }
    // Update order
    async updateOrder(req, res) {
        try {
            const { id } = req.params;
            const updateData = req.body;
            const order = await this.orderService.updateOrder(id, updateData);
            if (!order) {
                res.status(404).json({
                    success: false,
                    message: 'Không tìm thấy đơn hàng',
                });
                return;
            }
            res.json({
                success: true,
                message: 'Cập nhật đơn hàng thành công',
                data: order,
            });
        }
        catch (error) {
            console.error('Update order error:', error);
            res.status(500).json({
                success: false,
                message: 'Có lỗi xảy ra',
            });
        }
    }
    // Delete order
    async deleteOrder(req, res) {
        try {
            const { id } = req.params;
            const deleted = await this.orderService.deleteOrder(id);
            if (!deleted) {
                res.status(404).json({
                    success: false,
                    message: 'Không tìm thấy đơn hàng',
                });
                return;
            }
            res.json({
                success: true,
                message: 'Xóa đơn hàng thành công',
            });
        }
        catch (error) {
            console.error('Delete order error:', error);
            res.status(500).json({
                success: false,
                message: 'Có lỗi xảy ra',
            });
        }
    }
}
exports.OrderController = OrderController;
//# sourceMappingURL=order.controller.js.map