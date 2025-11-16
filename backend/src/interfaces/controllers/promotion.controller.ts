import { Request, Response } from 'express';
import { IPromotionService } from '../../application/interfaces/IPromotionService';
import { CreatePromotionDTO, UpdatePromotionDTO } from '../../application/dto/PromotionDTO';

export class PromotionController {
  constructor(private readonly promotionService: IPromotionService) {}

  async list(req: Request, res: Response): Promise<Response> {
    try {
      const onlyActive = req.query.active === 'true';

      let promotions;

      if (onlyActive) {
        promotions = await this.promotionService.getActivePromotions();
      } else {
        promotions = await this.promotionService.getAllPromotions();
      }

      return res.status(200).json({
        success: true,
        data: promotions,
        count: promotions.length,
      });
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: error instanceof Error ? error.message : 'Internal server error',
      });
    }
  }

  async getById(req: Request, res: Response): Promise<Response> {
    try {
      const { id } = req.params;
      const promotion = await this.promotionService.getPromotionById(id);

      if (!promotion) {
        return res.status(404).json({
          success: false,
          message: 'Promotion not found',
        });
      }

      return res.status(200).json({
        success: true,
        data: promotion,
      });
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: error instanceof Error ? error.message : 'Internal server error',
      });
    }
  }

  async getByCode(req: Request, res: Response): Promise<Response> {
    try {
      const { code } = req.params;
      const promotion = await this.promotionService.getPromotionByCode(code);

      if (!promotion) {
        return res.status(404).json({
          success: false,
          message: 'Promotion code not found',
        });
      }

      return res.status(200).json({
        success: true,
        data: promotion,
      });
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: error instanceof Error ? error.message : 'Internal server error',
      });
    }
  }

  async getByService(req: Request, res: Response): Promise<Response> {
    try {
      const { serviceId } = req.params;
      const promotions = await this.promotionService.getPromotionsByService(serviceId);

      return res.status(200).json({
        success: true,
        data: promotions,
        count: promotions.length,
      });
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: error instanceof Error ? error.message : 'Internal server error',
      });
    }
  }

  async getByPackage(req: Request, res: Response): Promise<Response> {
    try {
      const { packageId } = req.params;
      const promotions = await this.promotionService.getPromotionsByPackage(packageId);

      return res.status(200).json({
        success: true,
        data: promotions,
        count: promotions.length,
      });
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: error instanceof Error ? error.message : 'Internal server error',
      });
    }
  }

  async create(req: Request, res: Response): Promise<Response> {
    try {
      const input: CreatePromotionDTO = req.body;
      const promotion = await this.promotionService.createPromotion({
        code: input.code,
        title: input.title,
        description: input.description,
        discountType: input.discountType,
        discountValue: input.discountValue,
        maxDiscount: input.maxDiscount,
        minOrderAmount: input.minOrderAmount,
        applicableServices: input.applicableServices,
        applicablePackages: input.applicablePackages,
        startDate: new Date(input.startDate),
        endDate: new Date(input.endDate),
        isActive: input.isActive,
      });

      return res.status(201).json({
        success: true,
        data: promotion,
        message: 'Promotion created successfully',
      });
    } catch (error) {
      return res.status(400).json({
        success: false,
        message: error instanceof Error ? error.message : 'Failed to create promotion',
      });
    }
  }

  async update(req: Request, res: Response): Promise<Response> {
    try {
      const { id } = req.params;
      const input: UpdatePromotionDTO = req.body;

      const updateData: any = {};
      if (input.code) updateData.code = input.code;
      if (input.title) updateData.title = input.title;
      if (input.description) updateData.description = input.description;
      if (input.discountType) updateData.discountType = input.discountType;
      if (input.discountValue !== undefined) updateData.discountValue = input.discountValue;
      if (input.maxDiscount !== undefined) updateData.maxDiscount = input.maxDiscount;
      if (input.minOrderAmount !== undefined) updateData.minOrderAmount = input.minOrderAmount;
      if (input.applicableServices) updateData.applicableServices = input.applicableServices;
      if (input.applicablePackages) updateData.applicablePackages = input.applicablePackages;
      if (input.startDate) updateData.startDate = new Date(input.startDate);
      if (input.endDate) updateData.endDate = new Date(input.endDate);
      if (input.isActive !== undefined) updateData.isActive = input.isActive;

      const promotion = await this.promotionService.updatePromotion(id, updateData);

      if (!promotion) {
        return res.status(404).json({
          success: false,
          message: 'Promotion not found',
        });
      }

      return res.status(200).json({
        success: true,
        data: promotion,
        message: 'Promotion updated successfully',
      });
    } catch (error) {
      return res.status(400).json({
        success: false,
        message: error instanceof Error ? error.message : 'Failed to update promotion',
      });
    }
  }

  async delete(req: Request, res: Response): Promise<Response> {
    try {
      const { id } = req.params;
      const deleted = await this.promotionService.deletePromotion(id);

      if (!deleted) {
        return res.status(404).json({
          success: false,
          message: 'Promotion not found',
        });
      }

      return res.status(200).json({
        success: true,
        message: 'Promotion deleted successfully',
      });
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: error instanceof Error ? error.message : 'Internal server error',
      });
    }
  }
}
