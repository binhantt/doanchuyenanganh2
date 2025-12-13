import { db } from '../config/database';
import { InvitationTemplate } from '../../domain/entities/InvitationTemplate';
import { IInvitationTemplateRepository } from '../../domain/repositories/IInvitationTemplateRepository';

export class InvitationTemplateRepository implements IInvitationTemplateRepository {
  private readonly tableName = 'invitation_templates';

  async findAll(filters?: {
    category?: string;
    isActive?: boolean;
  }): Promise<InvitationTemplate[]> {
    let query = db(this.tableName);

    if (filters?.category) {
      query = query.where({ category: filters.category });
    }

    if (filters?.isActive !== undefined) {
      query = query.where({ is_active: filters.isActive });
    }

    const rows = await query.orderBy('usage_count', 'desc').select('*');
    return rows.map((row) => this.mapToEntity(row));
  }

  async findById(id: number): Promise<InvitationTemplate | null> {
    const row = await db(this.tableName).where({ id }).first();
    return row ? this.mapToEntity(row) : null;
  }

  async incrementUsageCount(id: number): Promise<void> {
    await db(this.tableName)
      .where({ id })
      .increment('usage_count', 1);
  }

  private mapToEntity(row: any): InvitationTemplate {
    let designConfig = null;
    if (row.design_config) {
      try {
        designConfig = typeof row.design_config === 'string' 
          ? JSON.parse(row.design_config) 
          : row.design_config;
      } catch (e) {
        console.error('Failed to parse design_config:', e);
        designConfig = null;
      }
    }

    let configJson = null;
    if (row.config_json) {
      try {
        configJson = typeof row.config_json === 'string' 
          ? JSON.parse(row.config_json) 
          : row.config_json;
      } catch (e) {
        console.error('Failed to parse config_json:', e);
        configJson = null;
      }
    }

    return new InvitationTemplate(
      row.id,
      row.name,
      row.description,
      row.thumbnail_url,
      row.preview_url || null,
      configJson,
      parseFloat(row.price) || 0,
      designConfig,
      row.category,
      row.is_active !== undefined ? Boolean(row.is_active) : true,
      row.usage_count || 0,
      row.created_at,
      row.updated_at
    );
  }
}
