import { Request, Response } from 'express';
import { IServiceService } from '../../application/interfaces/IServiceService';
import { CreateServiceDTO, UpdateServiceDTO } from '../../application/dto/ServiceDTO';

export class ServiceController {
  constructor(private readonly serviceService: IServiceService) {}

  async list(req: Request, res: Response): Promise<Response> {
    try {
      const onlyActive = req.query.active === 'true';
      const services = await this.serviceService.getAllServices(onlyActive);
      
      return res.status(200).json({
        success: true,
        data: services,
        count: services.length,
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
      const service = await this.serviceService.getServiceById(id);

      if (!service) {
        return res.status(404).json({
          success: false,
          message: 'Service not found',
        });
      }

      return res.status(200).json({
        success: true,
        data: service,
      });
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: error instanceof Error ? error.message : 'Internal server error',
      });
    }
  }

  async getBySlug(req: Request, res: Response): Promise<Response> {
    try {
      const { slug } = req.params;
      const service = await this.serviceService.getServiceBySlug(slug);

      if (!service) {
        return res.status(404).json({
          success: false,
          message: 'Service not found',
        });
      }

      return res.status(200).json({
        success: true,
        data: service,
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
      const input: CreateServiceDTO = req.body;
      const service = await this.serviceService.createService(input);

      return res.status(201).json({
        success: true,
        data: service,
        message: 'Service created successfully',
      });
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: error instanceof Error ? error.message : 'Internal server error',
      });
    }
  }

  async update(req: Request, res: Response): Promise<Response> {
    try {
      const { id } = req.params;
      const input: UpdateServiceDTO = req.body;
      const service = await this.serviceService.updateService(id, input);

      if (!service) {
        return res.status(404).json({
          success: false,
          message: 'Service not found',
        });
      }

      return res.status(200).json({
        success: true,
        data: service,
        message: 'Service updated successfully',
      });
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: error instanceof Error ? error.message : 'Internal server error',
      });
    }
  }

  async delete(req: Request, res: Response): Promise<Response> {
    try {
      const { id } = req.params;
      const deleted = await this.serviceService.deleteService(id);

      if (!deleted) {
        return res.status(404).json({
          success: false,
          message: 'Service not found',
        });
      }

      return res.status(200).json({
        success: true,
        message: 'Service deleted successfully',
      });
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: error instanceof Error ? error.message : 'Internal server error',
      });
    }
  }
}
