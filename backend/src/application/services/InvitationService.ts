import { InvitationRepository } from '../../infrastructure/repositories/InvitationRepository';
import { Invitation } from '../../domain/entities/Invitation';

export class InvitationService {
  constructor(private readonly invitationRepository: InvitationRepository) {}

  async getUserInvitations(userId: string): Promise<Invitation[]> {
    return this.invitationRepository.findAll(userId);
  }

  async getInvitationById(id: string, userId?: string): Promise<Invitation | null> {
    const invitation = await this.invitationRepository.findById(id);
    if (!invitation) {
      return null;
    }
    // Nếu có userId, kiểm tra quyền sở hữu
    if (userId && invitation.userId !== userId) {
      return null;
    }
    return invitation;
  }

  async getInvitationByShareUrl(shareUrl: string): Promise<Invitation | null> {
    return this.invitationRepository.findByShareUrl(shareUrl);
  }

  async getInvitationBySlug(slug: string): Promise<Invitation | null> {
    return this.invitationRepository.findBySlug(slug);
  }

  async createInvitation(
    userId: string,
    data: {
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
      message?: string;
      coverImage?: string;
      avatarImage?: string;
      gallery?: string[] | null;
      discountCode?: string | null;
    }
  ): Promise<Invitation> {
    return this.invitationRepository.create({
      userId,
      templateId: data.templateId,
      groomName: data.groomName,
      brideName: data.brideName,
      story: data.story,
      invitationMessage: data.invitationMessage,
      weddingDate: data.weddingDate,
      weddingTime: data.weddingTime,
      venue: data.venue,
      venueAddress: data.venueAddress,
      recipientName: data.recipientName,
      message: data.message || null,
      coverImage: data.coverImage || null,
      avatarImage: data.avatarImage || null,
      gallery: data.gallery || null,
      discountCode: data.discountCode || null,
    });
  }

  async updateInvitation(
    id: string,
    userId: string,
    data: Partial<Invitation>
  ): Promise<Invitation | null> {
    const invitation = await this.invitationRepository.findById(id);
    if (!invitation || invitation.userId !== userId) {
      return null;
    }
    return this.invitationRepository.update(id, data);
  }

  async deleteInvitation(id: string, userId: string): Promise<boolean> {
    const invitation = await this.invitationRepository.findById(id);
    if (!invitation || invitation.userId !== userId) {
      return false;
    }
    return this.invitationRepository.delete(id);
  }
}
