import { Decoration } from '../../domain/entities/Decoration';
import { IDecorationRepository } from '../../domain/repositories/IDecorationRepository';
import { IDecorationService } from '../interfaces/IDecorationService';
import { CreateDecorationDTO, UpdateDecorationDTO } from '../dto/DecorationDTO';
import { v4 as uuidv4 } from 'uuid';

export class DecorationService implements IDecorationService {
  constructor(private readonly decorationRepository: IDecorationRepository) {}

  async getAllDecorations(onlyActive: boolean = false): Promise<Decoration[]> {
    if (onlyActive) {
      return await this.decorationRepository.findActive();
    }
    return await this.decorationRepository.findAll();
  }

  async getDecorationById(id: string): Promise<Decoration | null> {
    return await this.decorationRepository.findById(id);
  }

  async getDecorationBySlug(slug: string): Promise<Decoration | null> {
    return await this.decorationRepository.findBySlug(slug);
  }

  async getDecorationsByTheme(theme: string): Promise<Decoration[]> {
    return await this.decorationRepository.findByTheme(theme);
  }

  async getDecorationsByStyle(style: string): Promise<Decoration[]> {
    return await this.decorationRepository.findByStyle(style);
  }

  async createDecoration(data: CreateDecorationDTO): Promise<Decoration> {
    // Business validation
    if (data.basePrice < 0) {
      throw new Error('Base price must be non-negative');
    }

    if (data.features.length === 0) {
      throw new Error('Decoration must have at least one feature');
    }

    // Check if slug already exists
    const existing = await this.decorationRepository.findBySlug(data.slug);
    if (existing) {
      throw new Error(`Decoration with slug "${data.slug}" already exists`);
    }

    // Create entity
    const decoration = new Decoration(
      uuidv4(),
      data.name,
      data.slug,
      data.description,
      data.theme,
      data.style,
      data.basePrice,
      data.features,
      data.images,
      data.isActive ?? true
    );

    return await this.decorationRepository.create(decoration);
  }

  async updateDecoration(id: string, data: UpdateDecorationDTO): Promise<Decoration | null> {
    const existing = await this.decorationRepository.findById(id);
    if (!existing) {
      return null;
    }

    if (data.basePrice !== undefined && data.basePrice < 0) {
      throw new Error('Base price must be non-negative');
    }

    if (data.features !== undefined && data.features.length === 0) {
      throw new Error('Decoration must have at least one feature');
    }

    if (data.slug && data.slug !== existing.slug) {
      const slugExists = await this.decorationRepository.findBySlug(data.slug);
      if (slugExists) {
        throw new Error(`Decoration with slug "${data.slug}" already exists`);
      }
    }

    return await this.decorationRepository.update(id, data);
  }

  async deleteDecoration(id: string): Promise<boolean> {
    const existing = await this.decorationRepository.findById(id);
    if (!existing) {
      return false;
    }

    return await this.decorationRepository.delete(id);
  }
}
