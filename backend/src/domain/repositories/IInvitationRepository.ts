import { Invitation } from '../entities/Invitation';

export interface IInvitationRepository {
  findAll(userId: string): Promise<Invitation[]>;
  findById(id: string): Promise<Invitation | null>;
  findByShareUrl(shareUrl: string): Promise<Invitation | null>;
  findBySlug(slug: string): Promise<Invitation | null>;
  create(data: {
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
  }): Promise<Invitation>;
  update(id: string, data: Partial<Invitation>): Promise<Invitation | null>;
  delete(id: string): Promise<boolean>;
}
