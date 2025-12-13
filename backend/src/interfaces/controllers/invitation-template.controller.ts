import { Request, Response } from 'express';
import { InvitationTemplateService } from '../../application/services/InvitationTemplateService';

export class InvitationTemplateController {
  constructor(private readonly templateService: InvitationTemplateService) {}

  async getAllTemplates(req: Request, res: Response): Promise<void> {
    try {
      const templates = await this.templateService.getAllTemplates();
      res.json({ success: true, data: templates });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: 'Failed to fetch invitation templates',
        error: error instanceof Error ? error.message : 'Unknown error',
      });
    }
  }

  async getTemplateById(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;
      const templateId = Number(id);
      const template = await this.templateService.getTemplateById(templateId);
      if (!template) {
        res.status(404).json({ success: false, message: 'Template not found' });
        return;
      }
      res.json({ success: true, data: template });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: 'Failed to fetch template',
        error: error instanceof Error ? error.message : 'Unknown error',
      });
    }
  }
}

