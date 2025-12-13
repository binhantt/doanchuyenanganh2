import { db } from '../config/database';
import { Invitation } from '../../domain/entities/Invitation';
import { IInvitationRepository } from '../../domain/repositories/IInvitationRepository';
import { v4 as uuidv4 } from 'uuid';

export class InvitationRepository implements IInvitationRepository {
  private readonly tableName = 'invitations';

  async findAll(userId: string): Promise<Invitation[]> {
    const rows = await db(this.tableName)
      .where({ user_id: userId })
      .orderBy('created_at', 'desc')
      .select('*');
    return rows.map((row) => this.mapToEntity(row));
  }

  async findById(id: string): Promise<Invitation | null> {
    const row = await db(this.tableName).where({ id }).first();
    return row ? this.mapToEntity(row) : null;
  }

  async findByShareUrl(shareUrl: string): Promise<Invitation | null> {
    const row = await db(this.tableName).where({ share_url: shareUrl }).first();
    return row ? this.mapToEntity(row) : null;
  }

  async findBySlug(slug: string): Promise<Invitation | null> {
    const row = await db(this.tableName).where({ slug }).first();
    return row ? this.mapToEntity(row) : null;
  }

  async create(data: {
    userId: string;
    templateId: number;
    groomName: string;
    brideName: string;
    story?: string | null;
    invitationMessage?: string | null;
    weddingDate: string;
    weddingTime: string;
    venue: string;
    venueAddress: string;
    recipientName: string;
    message: string | null;
    coverImage?: string | null;
    avatarImage?: string | null;
    gallery?: string[] | null;
    discountCode?: string | null;
    brideImage?: string | null;
    groomImage?: string | null;
    weddingImages?: string[] | null;
    locationImage?: string | null;
    organization?: string | null;
  }): Promise<Invitation> {
    const id = uuidv4();
    const shareUrl = this.generateShareUrl();

    await db(this.tableName).insert({
      id,
      user_id: data.userId,
      template_id: data.templateId,
      groom_name: data.groomName,
      bride_name: data.brideName,
      story: data.story || null,
      invitation_message: data.invitationMessage || null,
      wedding_date: data.weddingDate,
      wedding_time: data.weddingTime,
      venue: data.venue,
      venue_address: data.venueAddress,
      recipient_name: data.recipientName,
      message: data.message,
      cover_image: data.coverImage || null,
      avatar_image: data.avatarImage || null,
      gallery: data.gallery && Array.isArray(data.gallery) && data.gallery.length > 0 ? JSON.stringify(data.gallery) : null,
      discount_code: data.discountCode || null,
      bride_image: data.brideImage || null,
      groom_image: data.groomImage || null,
      wedding_images: data.weddingImages && Array.isArray(data.weddingImages) && data.weddingImages.length > 0 ? JSON.stringify(data.weddingImages) : null,
      location_image: data.locationImage || null,
      organization: data.organization || null,
      share_url: shareUrl,
      is_active: true,
    });

    const created = await this.findById(id);
    if (!created) throw new Error('Failed to create invitation');
    return created;
  }

  async update(id: string, data: Partial<Invitation>): Promise<Invitation | null> {
    const updateData: any = {};

    if (data.groomName) updateData.groom_name = data.groomName;
    if (data.brideName) updateData.bride_name = data.brideName;
    if (data.story !== undefined) updateData.story = data.story;
    if (data.invitationMessage !== undefined)
      updateData.invitation_message = data.invitationMessage;
    if (data.weddingDate) updateData.wedding_date = data.weddingDate;
    if (data.weddingTime) updateData.wedding_time = data.weddingTime;
    if (data.venue) updateData.venue = data.venue;
    if (data.venueAddress) updateData.venue_address = data.venueAddress;
    if (data.recipientName) updateData.recipient_name = data.recipientName;
    if (data.message !== undefined) updateData.message = data.message;
    if (data.coverImage !== undefined) updateData.cover_image = data.coverImage;
    if (data.avatarImage !== undefined) updateData.avatar_image = data.avatarImage;
    if (data.gallery !== undefined)
      updateData.gallery = data.gallery && Array.isArray(data.gallery) && data.gallery.length > 0 ? JSON.stringify(data.gallery) : null;
    if (data.discountCode !== undefined) updateData.discount_code = data.discountCode;
    if (data.isActive !== undefined) updateData.is_active = data.isActive;
    if (data.bride !== undefined) updateData.bride = data.bride;
    if (data.groom !== undefined) updateData.groom = data.groom;
    if (data.date !== undefined) updateData.date = data.date;
    if (data.location !== undefined) updateData.location = data.location;
    if (data.customText !== undefined) updateData.custom_text = data.customText;
    if (data.slug !== undefined) updateData.slug = data.slug;
    if (data.brideImage !== undefined) updateData.bride_image = data.brideImage;
    if (data.groomImage !== undefined) updateData.groom_image = data.groomImage;
    if (data.weddingImages !== undefined)
      updateData.wedding_images = data.weddingImages && Array.isArray(data.weddingImages) && data.weddingImages.length > 0 ? JSON.stringify(data.weddingImages) : null;
    if (data.locationImage !== undefined) updateData.location_image = data.locationImage;
    if (data.organization !== undefined) updateData.organization = data.organization;

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

  private generateShareUrl(): string {
    return uuidv4().substring(0, 8);
  }

  private mapToEntity(row: any): Invitation {
    return new Invitation(
      row.id,
      row.user_id,
      row.template_id,
      row.groom_name,
      row.bride_name,
      row.story,
      row.invitation_message,
      row.wedding_date,
      row.wedding_time,
      row.venue,
      row.venue_address,
      row.recipient_name,
      row.message,
      row.cover_image,
      row.avatar_image,
      row.gallery ? (typeof row.gallery === 'string' ? (row.gallery.trim() ? JSON.parse(row.gallery) : null) : row.gallery) : null,
      row.discount_code || null,
      row.share_url,
      row.is_active,
      row.created_at,
      row.updated_at,
      row.bride || null,
      row.groom || null,
      row.date || null,
      row.location || null,
      row.custom_text || null,
      row.slug || null,
      row.bride_image || null,
      row.groom_image || null,
      row.wedding_images ? (typeof row.wedding_images === 'string' ? JSON.parse(row.wedding_images) : row.wedding_images) : null,
      row.location_image || null,
      row.organization || null
    );
  }
}
