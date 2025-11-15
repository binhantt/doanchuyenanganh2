import { Request, Response } from 'express';
import { IConsultationService } from '../../application/interfaces/IConsultationService';

export class ConsultationController {
  constructor(private readonly consultationService: IConsultationService) {}

  async getAllConsultations(req: Request, res: Response): Promise<void> {
    try {
      const consultations = await this.consultationService.getAllConsultations();
      res.json({
        success: true,
        data: consultations,
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: 'Failed to fetch consultations',
        error: error instanceof Error ? error.message : 'Unknown error',
      });
    }
  }

  async getConsultationById(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;
      const consultation = await this.consultationService.getConsultationById(id);

      if (!consultation) {
        res.status(404).json({
          success: false,
          message: 'Consultation not found',
        });
        return;
      }

      res.json({
        success: true,
        data: consultation,
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: 'Failed to fetch consultation',
        error: error instanceof Error ? error.message : 'Unknown error',
      });
    }
  }

  async getConsultationsByEmail(req: Request, res: Response): Promise<void> {
    try {
      const { email } = req.params;
      const consultations = await this.consultationService.getConsultationsByEmail(email);
      res.json({
        success: true,
        data: consultations,
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: 'Failed to fetch consultations',
        error: error instanceof Error ? error.message : 'Unknown error',
      });
    }
  }

  async getConsultationsByStatus(req: Request, res: Response): Promise<void> {
    try {
      const { status } = req.params;
      const consultations = await this.consultationService.getConsultationsByStatus(status);
      res.json({
        success: true,
        data: consultations,
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: 'Failed to fetch consultations',
        error: error instanceof Error ? error.message : 'Unknown error',
      });
    }
  }

  async bookConsultation(req: Request, res: Response): Promise<void> {
    try {
      const { clientName, clientEmail, clientPhone, weddingDate, guestCount, venue, serviceType, budget, notes } = req.body;

      if (!clientName || !clientEmail || !clientPhone || !weddingDate || !serviceType || !budget) {
        res.status(400).json({
          success: false,
          message: 'Missing required fields',
        });
        return;
      }

      const consultation = await this.consultationService.bookConsultation({
        clientName,
        clientEmail,
        clientPhone,
        weddingDate: new Date(weddingDate),
        guestCount: Number(guestCount),
        venue,
        serviceType,
        budget,
        notes,
      });

      res.status(201).json({
        success: true,
        message: 'Consultation booked successfully',
        data: consultation,
      });
    } catch (error) {
      res.status(400).json({
        success: false,
        message: 'Failed to book consultation',
        error: error instanceof Error ? error.message : 'Unknown error',
      });
    }
  }

  async updateConsultation(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;
      const consultation = await this.consultationService.updateConsultation(id, req.body);

      if (!consultation) {
        res.status(404).json({
          success: false,
          message: 'Consultation not found',
        });
        return;
      }

      res.json({
        success: true,
        data: consultation,
      });
    } catch (error) {
      res.status(400).json({
        success: false,
        message: 'Failed to update consultation',
        error: error instanceof Error ? error.message : 'Unknown error',
      });
    }
  }

  async deleteConsultation(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;
      const deleted = await this.consultationService.deleteConsultation(id);

      if (!deleted) {
        res.status(404).json({
          success: false,
          message: 'Consultation not found',
        });
        return;
      }

      res.json({
        success: true,
        message: 'Consultation deleted successfully',
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: 'Failed to delete consultation',
        error: error instanceof Error ? error.message : 'Unknown error',
      });
    }
  }
}
