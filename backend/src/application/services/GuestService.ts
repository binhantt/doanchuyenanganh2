import { GuestRepository } from '../../infrastructure/repositories/GuestRepository';
import { Guest } from '../../domain/entities/Guest';

export class GuestService {
  constructor(private readonly guestRepository: GuestRepository) {}

  async getAllGuests(): Promise<Guest[]> {
    return this.guestRepository.findAll();
  }

  async getGuestsByInvitationId(invitationId: string): Promise<Guest[]> {
    return this.guestRepository.findByInvitationId(invitationId);
  }

  async getGuestById(id: string): Promise<Guest | null> {
    return this.guestRepository.findById(id);
  }

  async getGuestByShareUrl(shareUrl: string): Promise<Guest | null> {
    return this.guestRepository.findByShareUrl(shareUrl);
  }

  async createGuest(
    invitationId: string,
    data: {
      name: string;
      status?: 'pending' | 'accepted' | 'declined';
      shareUrl?: string;
    }
  ): Promise<Guest> {
    return this.guestRepository.create({
      invitationId,
      name: data.name,
      status: data.status,
      shareUrl: data.shareUrl,
    });
  }

  async updateGuest(
    id: string,
    data: {
      name?: string;
      status?: 'pending' | 'accepted' | 'declined';
    }
  ): Promise<Guest | null> {
    return this.guestRepository.update(id, data);
  }

  async deleteGuest(id: string): Promise<boolean> {
    return this.guestRepository.delete(id);
  }
}

