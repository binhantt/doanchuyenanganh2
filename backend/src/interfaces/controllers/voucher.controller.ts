import { Request, Response } from 'express';
import { IVoucherService } from '../../application/interfaces/IVoucherService';
import { Voucher } from '../../domain/entities/Voucher';
import { VoucherDTO } from '../../application/dto/VoucherDTO';

// Helper function to convert Voucher entity to simple DTO
function toVoucherDTO(voucher: Voucher): VoucherDTO {
  return {
    id: voucher.id,
    code: voucher.code,
    title: voucher.name,
    description: voucher.description || '',
    discountType: voucher.discountType,
    discountValue: voucher.discountValue,
    maxDiscount: voucher.maxDiscountAmount || undefined,
    minOrderAmount: voucher.minOrderValue || undefined,
    startDate: voucher.startDate?.toISOString() || '',
    endDate: voucher.endDate?.toISOString() || '',
    isActive: voucher.isActive,
    createdAt: voucher.createdAt?.toISOString() || '',
    updatedAt: voucher.updatedAt?.toISOString() || '',
  };
}

export class VoucherController {
  constructor(private readonly voucherService: IVoucherService) {}

  async getAllVouchers(req: Request, res: Response): Promise<void> {
    try {
      const vouchers = await this.voucherService.getAllVouchers();
      res.json({
        success: true,
        data: vouchers.map(toVoucherDTO),
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
        data: vouchers.map(toVoucherDTO),
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
        data: toVoucherDTO(voucher),
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
        data: toVoucherDTO(voucher),
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
        title,
        description,
        discountType,
        discountValue,
        maxDiscount,
        minOrderAmount,
        startDate,
        endDate,
        isActive,
      } = req.body;

      if (!code || !title || !discountType || !discountValue) {
        res.status(400).json({
          success: false,
          message: 'Missing required fields',
        });
        return;
      }

      const voucher = await this.voucherService.createVoucher({
        code,
        name: title,
        description,
        discountType,
        discountValue: Number(discountValue),
        maxDiscountAmount: maxDiscount ? Number(maxDiscount) : null,
        minOrderValue: minOrderAmount ? Number(minOrderAmount) : null,
        usageLimit: null,
        usagePerCustomer: null,
        startDate: startDate ? new Date(startDate) : null,
        endDate: endDate ? new Date(endDate) : null,
        isActive: isActive !== undefined ? Boolean(isActive) : true,
      });

      res.status(201).json({
        success: true,
        data: toVoucherDTO(voucher),
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
      if (req.body.title) updateData.name = req.body.title;
      if (req.body.description !== undefined) updateData.description = req.body.description;
      if (req.body.discountType) updateData.discountType = req.body.discountType;
      if (req.body.discountValue !== undefined) updateData.discountValue = Number(req.body.discountValue);
      if (req.body.maxDiscount !== undefined)
        updateData.maxDiscountAmount = req.body.maxDiscount ? Number(req.body.maxDiscount) : null;
      if (req.body.minOrderAmount !== undefined)
        updateData.minOrderValue = req.body.minOrderAmount ? Number(req.body.minOrderAmount) : null;
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
        data: toVoucherDTO(voucher),
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
