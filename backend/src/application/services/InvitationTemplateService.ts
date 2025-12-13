import { InvitationTemplateRepository } from '../../infrastructure/repositories/InvitationTemplateRepository';
import { InvitationTemplate } from '../../domain/entities/InvitationTemplate';

export class InvitationTemplateService {
  constructor(
    private readonly templateRepository: InvitationTemplateRepository
  ) {}

  async getAllTemplates(filters?: {
    category?: string;
  }): Promise<InvitationTemplate[]> {
    return this.templateRepository.findAll({
      ...filters,
      isActive: true,
    });
  }

  async getTemplateById(id: number): Promise<InvitationTemplate | null> {
    return this.templateRepository.findById(id);
  }

  async incrementUsage(id: number): Promise<void> {
    await this.templateRepository.incrementUsageCount(id);
  }
}
