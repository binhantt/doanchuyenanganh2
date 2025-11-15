import { ITestimonialRepository } from '../../domain/repositories/ITestimonialRepository';
import { Testimonial } from '../../domain/entities/Testimonial';
import knex from 'knex';
import databaseConfig from '../config/database';

const db = knex(databaseConfig);

interface TestimonialRow {
  id: string;
  client_name: string;
  client_role: string;
  content: string;
  rating: number;
  event_date: Date;
  location: string;
  language: string;
  is_active: boolean;
  created_at: Date;
  updated_at: Date;
}

export class TestimonialRepository implements ITestimonialRepository {
  private readonly tableName = 'testimonials';

  private mapRowToEntity(row: TestimonialRow): Testimonial {
    return new Testimonial(
      row.id,
      row.client_name,
      row.client_role,
      row.content,
      row.rating,
      new Date(row.event_date),
      row.location,
      row.language,
      Boolean(row.is_active),
      new Date(row.created_at),
      new Date(row.updated_at)
    );
  }

  async findAll(): Promise<Testimonial[]> {
    const rows = await db<TestimonialRow>(this.tableName).select('*').orderBy('event_date', 'desc');
    return rows.map((row) => this.mapRowToEntity(row));
  }

  async findById(id: string): Promise<Testimonial | null> {
    const row = await db<TestimonialRow>(this.tableName).where({ id }).first();
    return row ? this.mapRowToEntity(row) : null;
  }

  async findActive(): Promise<Testimonial[]> {
    const rows = await db<TestimonialRow>(this.tableName)
      .where({ is_active: true })
      .orderBy('event_date', 'desc')
      .select('*');
    return rows.map((row) => this.mapRowToEntity(row));
  }

  async findByLanguage(language: string): Promise<Testimonial[]> {
    const rows = await db<TestimonialRow>(this.tableName)
      .where({ language, is_active: true })
      .orderBy('event_date', 'desc')
      .select('*');
    return rows.map((row) => this.mapRowToEntity(row));
  }

  async create(testimonial: Testimonial): Promise<Testimonial> {
    await db(this.tableName).insert({
      id: testimonial.id,
      client_name: testimonial.clientName,
      client_role: testimonial.clientRole,
      content: testimonial.content,
      rating: testimonial.rating,
      event_date: testimonial.eventDate,
      location: testimonial.location,
      language: testimonial.language,
      is_active: testimonial.isActive,
    });

    return testimonial;
  }

  async update(id: string, data: Partial<Testimonial>): Promise<Testimonial | null> {
    const updateData: any = {};

    if (data.clientName) updateData.client_name = data.clientName;
    if (data.clientRole) updateData.client_role = data.clientRole;
    if (data.content) updateData.content = data.content;
    if (data.rating !== undefined) updateData.rating = data.rating;
    if (data.eventDate) updateData.event_date = data.eventDate;
    if (data.location) updateData.location = data.location;
    if (data.language) updateData.language = data.language;
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
