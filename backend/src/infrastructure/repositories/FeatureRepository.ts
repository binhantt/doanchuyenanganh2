import { IFeatureRepository } from '../../domain/repositories/IFeatureRepository';
import { Feature, EntityType, FeatureType } from '../../domain/entities/Feature';
import { db } from '../database/connection';

interface FeatureRow {
  id: string;
  entity_id: string;
  entity_type: EntityType;
  feature_text: string;
  feature_type: FeatureType;
  display_order: number;
  created_at: Date;
  updated_at: Date;
}

export class FeatureRepository implements IFeatureRepository {
  private readonly tableName = 'features';

  private mapRowToEntity(row: FeatureRow): Feature {
    return new Feature(
      row.id,
      row.entity_id,
      row.entity_type,
      row.feature_text,
      row.feature_type,
      row.display_order,
      new Date(row.created_at),
      new Date(row.updated_at)
    );
  }

  async findByEntity(entityId: string, entityType: EntityType): Promise<Feature[]> {
    const rows = await db<FeatureRow>(this.tableName)
      .where({ entity_id: entityId, entity_type: entityType })
      .orderBy('display_order', 'asc')
      .select('*');
    return rows.map((row) => this.mapRowToEntity(row));
  }

  async findByEntityAndType(
    entityId: string,
    entityType: EntityType,
    featureType: FeatureType
  ): Promise<Feature[]> {
    const rows = await db<FeatureRow>(this.tableName)
      .where({ entity_id: entityId, entity_type: entityType, feature_type: featureType })
      .orderBy('display_order', 'asc')
      .select('*');
    return rows.map((row) => this.mapRowToEntity(row));
  }

  async create(feature: Feature): Promise<Feature> {
    await db(this.tableName).insert({
      id: feature.id,
      entity_id: feature.entityId,
      entity_type: feature.entityType,
      feature_text: feature.featureText,
      feature_type: feature.featureType,
      display_order: feature.displayOrder,
    });
    return feature;
  }

  async createMany(features: Feature[]): Promise<Feature[]> {
    const rows = features.map((feature) => ({
      id: feature.id,
      entity_id: feature.entityId,
      entity_type: feature.entityType,
      feature_text: feature.featureText,
      feature_type: feature.featureType,
      display_order: feature.displayOrder,
    }));

    await db(this.tableName).insert(rows);
    return features;
  }

  async update(id: string, data: Partial<Feature>): Promise<Feature | null> {
    const updateData: any = {};

    if (data.featureText) updateData.feature_text = data.featureText;
    if (data.featureType) updateData.feature_type = data.featureType;
    if (data.displayOrder !== undefined) updateData.display_order = data.displayOrder;

    updateData.updated_at = db.fn.now();

    const updated = await db(this.tableName).where({ id }).update(updateData);

    if (updated === 0) {
      return null;
    }

    const row = await db<FeatureRow>(this.tableName).where({ id }).first();
    return row ? this.mapRowToEntity(row) : null;
  }

  async delete(id: string): Promise<boolean> {
    const deleted = await db(this.tableName).where({ id }).del();
    return deleted > 0;
  }

  async deleteByEntity(entityId: string, entityType: EntityType): Promise<boolean> {
    const deleted = await db(this.tableName)
      .where({ entity_id: entityId, entity_type: entityType })
      .del();
    return deleted > 0;
  }
}
