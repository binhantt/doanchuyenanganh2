import { Request, Response } from 'express';
import { IOrderService } from '../../application/interfaces/IOrderService';

export class OrderController {
  constructor(private readonly orderService: IOrderService) {}

  async getAllOrders(req: Request, res: Response): Promise<void> {
    try {
      const orders = await this.orderService.getAllOrders();
      res.json({
        success: true,
        data: orders,
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: 'Failed to fetch orders',
        error: error instanceof Error ? error.message : 'Unknown error',
      });
    }
  }

  async getOrderById(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;
      const order = await this.orderService.getOrderById(id);

      if (!order) {
        res.status(404).json({
          success: false,
          message: 'Order not found',
        });
        return;
      }

      res.json({
        success: true,
        data: order,
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: 'Failed to fetch order',
        error: error instanceof Error ? error.message : 'Unknown error',
      });
    }
  }

  async getOrdersByEmail(req: Request, res: Response): Promise<void> {
    try {
      const { email } = req.params;
      const orders = await this.orderService.getOrdersByEmail(email);
      res.json({
        success: true,
        data: orders,
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: 'Failed to fetch orders',
        error: error instanceof Error ? error.message : 'Unknown error',
      });
    }
  }

  async getOrdersByStatus(req: Request, res: Response): Promise<void> {
    try {
      const { status } = req.params;
      const orders = await this.orderService.getOrdersByStatus(status);
      res.json({
        success: true,
        data: orders,
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: 'Failed to fetch orders',
        error: error instanceof Error ? error.message : 'Unknown error',
      });
    }
  }

  async createOrder(req: Request, res: Response): Promise<void> {
    try {
      const { clientName, clientEmail, clientPhone, weddingDate, guestCount, venue, notes, items, paymentMethod } = req.body;

      if (!clientName || !clientEmail || !clientPhone || !weddingDate || !paymentMethod || !items) {
        res.status(400).json({
          success: false,
          message: 'Missing required fields',
        });
        return;
      }

      const order = await this.orderService.createOrder({
        clientName,
        clientEmail,
        clientPhone,
        weddingDate: new Date(weddingDate),
        guestCount: Number(guestCount),
        venue,
        notes,
        items,
        paymentMethod,
      });

      res.status(201).json({
        success: true,
        message: 'Order created successfully',
        data: order,
      });
    } catch (error) {
      res.status(400).json({
        success: false,
        message: 'Failed to create order',
        error: error instanceof Error ? error.message : 'Unknown error',
      });
    }
  }

  async updateOrder(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;
      const order = await this.orderService.updateOrder(id, req.body);

      if (!order) {
        res.status(404).json({
          success: false,
          message: 'Order not found',
        });
        return;
      }

      res.json({
        success: true,
        data: order,
      });
    } catch (error) {
      res.status(400).json({
        success: false,
        message: 'Failed to update order',
        error: error instanceof Error ? error.message : 'Unknown error',
      });
    }
  }

  async deleteOrder(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;
      const deleted = await this.orderService.deleteOrder(id);

      if (!deleted) {
        res.status(404).json({
          success: false,
          message: 'Order not found',
        });
        return;
      }

      res.json({
        success: true,
        message: 'Order deleted successfully',
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: 'Failed to delete order',
        error: error instanceof Error ? error.message : 'Unknown error',
      });
    }
  }
}
