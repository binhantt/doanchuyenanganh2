import { Request, Response } from 'express';
import { OrderService } from '../../application/services/OrderService';
export declare class OrderController {
    private orderService;
    constructor(orderService: OrderService);
    verifyOrder(req: Request, res: Response): Promise<void>;
    registerOrder(req: Request, res: Response): Promise<void>;
    getOrderById(req: Request, res: Response): Promise<void>;
    createOrder(req: Request, res: Response): Promise<void>;
    getOrdersByEmail(req: Request, res: Response): Promise<void>;
    applyVoucher(req: Request, res: Response): Promise<void>;
    getAllOrders(req: Request, res: Response): Promise<void>;
    getOrdersByStatus(req: Request, res: Response): Promise<void>;
    updateOrderStatus(req: Request, res: Response): Promise<void>;
    updateOrder(req: Request, res: Response): Promise<void>;
    deleteOrder(req: Request, res: Response): Promise<void>;
}
//# sourceMappingURL=order.controller.d.ts.map