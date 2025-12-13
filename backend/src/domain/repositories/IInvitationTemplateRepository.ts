import { InvitationTemplate } from '../entities/InvitationTemplate';

export interface IInvitationTemplateRepository {
  findAll(filters?: {
    category?: string;
    isActive?: boolean;
  }): Promise<InvitationTemplate[]>;
  
  findById(id: number): Promise<InvitationTemplate | null>;
  
  incrementUsageCount(id: number): Promise<void>;
}

