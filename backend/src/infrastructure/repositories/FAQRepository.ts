import { IFAQRepository } from '../../domain/repositories/IFAQRepository';
import { FAQ } from '../../domain/entities/FAQ';
import knex from 'knex';
import databaseConfig from '../config/database';

const db = knex(databaseConfig);

interface FAQRow {
  id: string;
  question: string;
  answer: string;
  category: string;
  language: string;
  display_order: number;
  is_active: boolean;
  created_at: Date;
  updated_at: Date;
}

export class FAQRepository implements IFAQRepository {
  private readonly tableName = 'faqs';

  private mapRowToEntity(row: FAQRow): FAQ {
    return new FAQ(
      row.id,
      row.question,
      row.answer,
      row.category,
      row.language,
      row.display_order,
      Boolean(row.is_active),
      new Date(row.created_at),
      new Date(row.updated_at)
    );
  }

  async findAll(): Promise<FAQ[]> {
    const rows = await db<FAQRow>(this.tableName).select('*').orderBy('display_order', 'asc');
    return rows.map((row) => this.mapRowToEntity(row));
  }

  async findById(id: string): Promise<FAQ | null> {
    const row = await db<FAQRow>(this.tableName).where({ id }).first();
    return row ? this.mapRowToEntity(row) : null;
  }

  async findActive(): Promise<FAQ[]> {
    const rows = await db<FAQRow>(this.tableName)
      .where({ is_active: true })
      .orderBy('display_order', 'asc')
      .select('*');
    return rows.map((row) => this.mapRowToEntity(row));
  }

  async findByCategory(category: string): Promise<FAQ[]> {
    const rows = await db<FAQRow>(this.tableName)
      .where({ category, is_active: true })
      .orderBy('display_order', 'asc')
      .select('*');
    return rows.map((row) => this.mapRowToEntity(row));
  }

  async findByLanguage(language: string): Promise<FAQ[]> {
    const rows = await db<FAQRow>(this.tableName)
      .where({ language, is_active: true })
      .orderBy('display_order', 'asc')
      .select('*');
    return rows.map((row) => this.mapRowToEntity(row));
  }

  async findByCategoryAndLanguage(category: string, language: string): Promise<FAQ[]> {
    const rows = await db<FAQRow>(this.tableName)
      .where({ category, language, is_active: true })
      .orderBy('display_order', 'asc')
      .select('*');
    return rows.map((row) => this.mapRowToEntity(row));
  }

  async create(faq: FAQ): Promise<FAQ> {
    await db(this.tableName).insert({
      id: faq.id,
      question: faq.question,
      answer: faq.answer,
      category: faq.category,
      language: faq.language,
      display_order: faq.displayOrder,
      is_active: faq.isActive,
    });

    return faq;
  }

  async update(id: string, data: Partial<FAQ>): Promise<FAQ | null> {
    const updateData: any = {};

    if (data.question) updateData.question = data.question;
    if (data.answer) updateData.answer = data.answer;
    if (data.category) updateData.category = data.category;
    if (data.language) updateData.language = data.language;
    if (data.displayOrder !== undefined) updateData.display_order = data.displayOrder;
    if (data.isActive !== undefined) updateData.is_active = data.isActive;

    updateData.updated_at = db.fn.now();

    const updated = await db(this.tableName).where({ id }).update(updateData);

    if (updated === 0) {
      return null;
    }

    return this.findById(id);
  }

  async delete(id: string): Promise<boolean> {
    const deleted = await db(this.tableName).where({ id }).del();
    return deleted > 0;
  }
}
