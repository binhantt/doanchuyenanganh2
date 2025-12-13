import { Guest } from '../entities/Guest';

export interface IGuestRepository {
  findAll(): Promise<Guest[]>;
  findByInvitationId(invitationId: string): Promise<Guest[]>;
  findById(id: string): Promise<Guest | null>;
  findByShareUrl(shareUrl: string): Promise<Guest | null>;
  create(data: {
    invitationId: string;
    name: string;
    status?: 'pending' | 'accepted' | 'declined';
    shareUrl?: string;
  }): Promise<Guest>;
  update(id: string, data: Partial<Guest>): Promise<Guest | null>;
  delete(id: string): Promise<boolean>;
}
