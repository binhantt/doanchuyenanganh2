import { Request, Response } from 'express';
import { IVoucherService } from '../../application/interfaces/IVoucherService';

export class VoucherController {
  constructor(private readonly voucherService: IVoucherService) {}

  async getAllVouchers(req: Request, res: Response): Promise<void> {
    try {
      const vouchers = await this.voucherService.getAllVouchers();
      res.json({
        success: true,
        data: vouchers,
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: 'Failed to fetch vouchers',
        error: error instanceof Error ? error.message : 'Unknown error',
      });
    }
  }

  async getActiveVouchers(req: Request, res: Response): Promise<void> {
    try {
      const vouchers = await this.voucherService.getActiveVouchers();
      res.json({
        success: true,
        data: vouchers,
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: 'Failed to fetch active vouchers',
        error: error instanceof Error ? error.message : 'Unknown error',
      });
    }
  }

  async getVoucherById(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;
      const voucher = await this.voucherService.getVoucherById(id);

      if (!voucher) {
        res.status(404).json({
          success: false,
          message: 'Voucher not found',
        });
        return;
      }

      res.json({
        success: true,
        data: voucher,
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: 'Failed to fetch voucher',
        error: error instanceof Error ? error.message : 'Unknown error',
      });
    }
  }

  async getVoucherByCode(req: Request, res: Response): Promise<void> {
    try {
      const { code } = req.params;
      const voucher = await this.voucherService.getVoucherByCode(code);

      if (!voucher) {
        res.status(404).json({
          success: false,
          message: 'Voucher not found',
        });
        return;
      }

      res.json({
        success: true,
        data: voucher,
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: 'Failed to fetch voucher',
        error: error instanceof Error ? error.message : 'Unknown error',
      });
    }
  }

  async validateVoucher(req: Request, res: Response): Promise<void> {
    try {
      const { code, orderAmount } = req.body;

      if (!code || orderAmount === undefined) {
        res.status(400).json({
          success: false,
          message: 'Missing required fields: code and orderAmount',
        });
        return;
      }

      const voucher = await this.voucherService.getVoucherByCode(code.toUpperCase());

      if (!voucher) {
        res.json({
          success: true,
          data: {
            valid: false,
            discountAmount: 0,
            finalAmount: orderAmount,
            message: 'Mã giảm giá không tồn tại',
          },
        });
        return;
      }

      // Use voucher entity methods for validation
      if (!voucher.canBeUsedForOrder(orderAmount)) {
        let message = 'Mã giảm giá không hợp lệ';
        
        if (!voucher.isActive) {
          message = 'Mã giảm giá không còn hoạt động';
        } else if (voucher.endDate && new Date() > voucher.endDate) {
          message = 'Mã giảm giá đã hết hạn';
        } else if (voucher.usageLimit && voucher.usedCount >= voucher.usageLimit) {
          message = 'Mã giảm giá đã hết lượt sử dụng';
        } else if (voucher.minOrderValue && orderAmount < voucher.minOrderValue) {
          message = `Đơn hàng phải tối thiểu ${new Intl.NumberFormat('vi-VN').format(
            voucher.minOrderValue
          )} VNĐ`;
        }

        res.json({
          success: true,
          data: {
            valid: false,
            voucher,
            discountAmount: 0,
            finalAmount: orderAmount,
            message,
          },
        });
        return;
      }

      // Calculate discount using voucher entity method
      const discountAmount = voucher.calculateDiscount(orderAmount);
      const finalAmount = orderAmount - discountAmount;

      res.json({
        success: true,
        data: {
          valid: true,
          voucher,
          discountAmount,
          finalAmount,
          message: 'Mã giảm giá hợp lệ',
        },
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: 'Failed to validate voucher',
        error: error instanceof Error ? error.message : 'Unknown error',
      });
    }
  }

  async createVoucher(req: Request, res: Response): Promise<void> {
    try {
      const {
        code,
        name,
        description,
        discountType,
        discountValue,
        maxDiscountAmount,
        minOrderValue,
        usageLimit,
        usagePerCustomer,
        startDate,
        endDate,
        isActive,
      } = req.body;

      if (!code || !name || !discountType || !discountValue) {
        res.status(400).json({
          success: false,
          message: 'Missing required fields',
        });
        return;
      }

      const voucher = await this.voucherService.createVoucher({
        code,
        name,
        description,
        discountType,
        discountValue: Number(discountValue),
        maxDiscountAmount: maxDiscountAmount ? Number(maxDiscountAmount) : null,
        minOrderValue: minOrderValue ? Number(minOrderValue) : null,
        usageLimit: usageLimit ? Number(usageLimit) : null,
        usagePerCustomer: usagePerCustomer ? Number(usagePerCustomer) : null,
        startDate: startDate ? new Date(startDate) : null,
        endDate: endDate ? new Date(endDate) : null,
        isActive: isActive !== undefined ? Boolean(isActive) : true,
      });

      res.status(201).json({
        success: true,
        message: 'Voucher created successfully',
        data: voucher,
      });
    } catch (error) {
      res.status(400).json({
        success: false,
        message: 'Failed to create voucher',
        error: error instanceof Error ? error.message : 'Unknown error',
      });
    }
  }

  async updateVoucher(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;
      const updateData: any = {};

      if (req.body.code) updateData.code = req.body.code;
      if (req.body.name) updateData.name = req.body.name;
      if (req.body.description !== undefined) updateData.description = req.body.description;
      if (req.body.discountType) updateData.discountType = req.body.discountType;
      if (req.body.discountValue !== undefined) updateData.discountValue = Number(req.body.discountValue);
      if (req.body.maxDiscountAmount !== undefined)
        updateData.maxDiscountAmount = req.body.maxDiscountAmount ? Number(req.body.maxDiscountAmount) : null;
      if (req.body.minOrderValue !== undefined)
        updateData.minOrderValue = req.body.minOrderValue ? Number(req.body.minOrderValue) : null;
      if (req.body.usageLimit !== undefined)
        updateData.usageLimit = req.body.usageLimit ? Number(req.body.usageLimit) : null;
      if (req.body.usagePerCustomer !== undefined)
        updateData.usagePerCustomer = req.body.usagePerCustomer ? Number(req.body.usagePerCustomer) : null;
      if (req.body.startDate !== undefined) updateData.startDate = req.body.startDate ? new Date(req.body.startDate) : null;
      if (req.body.endDate !== undefined) updateData.endDate = req.body.endDate ? new Date(req.body.endDate) : null;
      if (req.body.isActive !== undefined) updateData.isActive = Boolean(req.body.isActive);

      const voucher = await this.voucherService.updateVoucher(id, updateData);

      if (!voucher) {
        res.status(404).json({
          success: false,
          message: 'Voucher not found',
        });
        return;
      }

      res.json({
        success: true,
        message: 'Voucher updated successfully',
        data: voucher,
      });
    } catch (error) {
      res.status(400).json({
        success: false,
        message: 'Failed to update voucher',
        error: error instanceof Error ? error.message : 'Unknown error',
      });
    }
  }

  async deleteVoucher(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;
      const deleted = await this.voucherService.deleteVoucher(id);

      if (!deleted) {
        res.status(404).json({
          success: false,
          message: 'Voucher not found',
        });
        return;
      }

      res.json({
        success: true,
        message: 'Voucher deleted successfully',
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: 'Failed to delete voucher',
        error: error instanceof Error ? error.message : 'Unknown error',
      });
    }
  }
}
