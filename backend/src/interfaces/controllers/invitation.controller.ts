import { Request, Response } from 'express';
import { InvitationService } from '../../application/services/InvitationService';
import { Invitation } from '../../domain/entities/Invitation';
import { GuestService } from '../../application/services/GuestService';

export class InvitationController {
  constructor(
    private readonly invitationService: InvitationService,
    private readonly guestService?: GuestService
  ) {}

  private async createDefaultGuest(invitationId: string, groomName: string, userName: string) {
    if (!this.guestService) {
      console.log('Guest service not available, skipping guest creation');
      return;
    }

    try {
      const guestName = userName ? `${groomName} & ${userName}` : groomName;
      console.log('Creating default guest with:', { invitationId, guestName });
      const guest = await this.guestService.createGuest(invitationId, {
        name: guestName,
        status: 'pending',
      });
      console.log('✅ Created default guest successfully:', {
        id: guest.id,
        name: guest.name,
        invitationId: guest.invitationId,
      });
    } catch (error) {
      console.error('❌ Error creating default guest:', error);
      if (error instanceof Error) {
        console.error('Error details:', error.message);
        console.error('Error stack:', error.stack);
      }
      // Không throw error để không ảnh hưởng đến việc tạo invitation
    }
  }

  async getUserInvitations(req: Request, res: Response): Promise<void> {
    try {
      const userId = (req as any).user?.id;
      if (!userId) {
        res.status(401).json({
          success: false,
          message: 'Unauthorized',
        });
        return;
      }

      const invitations = await this.invitationService.getUserInvitations(userId);

      res.json({
        success: true,
        data: invitations,
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: 'Failed to fetch invitations',
        error: error instanceof Error ? error.message : 'Unknown error',
      });
    }
  }

  async getInvitationById(req: Request, res: Response): Promise<void> {
    try {
      const userId = (req as any).user?.id;
      const { id } = req.params;

      if (!userId) {
        res.status(401).json({
          success: false,
          message: 'Unauthorized',
        });
        return;
      }

      const invitation = await this.invitationService.getInvitationById(id, userId);

      if (!invitation) {
        res.status(404).json({
          success: false,
          message: 'Invitation not found',
        });
        return;
      }

      res.json({
        success: true,
        data: invitation,
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: 'Failed to fetch invitation',
        error: error instanceof Error ? error.message : 'Unknown error',
      });
    }
  }

  private async formatInvitationResponse(invitation: Invitation, guestName?: string) {
    // Lấy danh sách guests từ database với đầy đủ thông tin
    let guests: any[] = [];
    if (this.guestService) {
      try {
        const guestsList = await this.guestService.getGuestsByInvitationId(invitation.id);
        guests = guestsList.map((g) => ({
          id: g.id,
          invitationId: g.invitationId,
          name: g.name,
          status: g.status,
          time: g.time,
          createdAt: g.createdAt,
          updatedAt: g.updatedAt,
        }));
      } catch (error) {
        console.error('Error fetching guests:', error);
      }
    }

    return {
      id: invitation.id,
      groom: invitation.groom || invitation.groomName,
      bride: invitation.bride || invitation.brideName,
      date: invitation.date || invitation.weddingDate,
      location: invitation.location || invitation.venue,
      message: invitation.invitationMessage || invitation.customText || invitation.message || '',
      invitationMessage: invitation.invitationMessage || invitation.customText || '',
      story: invitation.story || '',
      coverImage: invitation.coverImage || '',
      sideImage: invitation.avatarImage || invitation.coverImage || '',
      coupleImage: invitation.avatarImage || invitation.coverImage || '',
      locationImage: invitation.locationImage || invitation.coverImage || '',
      gallery: invitation.gallery || [],
      storyImages: invitation.gallery || [],
      guestName: guestName || '', // Chỉ sử dụng guestName từ query để mỗi lời mời chỉ có một người nhận
      guests: guests, // Danh sách guests từ database
      mapSrc: invitation.venueAddress ? `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(invitation.venueAddress)}` : null,
      slug: invitation.slug || invitation.shareUrl,
      // New image fields
      brideImage: invitation.brideImage || '',
      groomImage: invitation.groomImage || '',
      weddingImages: invitation.weddingImages || [],
      organization: invitation.organization || '',
    };
  }

  async getInvitationByShareUrl(req: Request, res: Response): Promise<void> {
    try {
      const { shareUrl } = req.params;
      let { guestName } = req.query;

      // Thử tìm invitation bằng shareUrl
      let invitation = await this.invitationService.getInvitationByShareUrl(shareUrl);

      // Nếu không tìm thấy, thử tìm bằng guest shareUrl
      if (!invitation && this.guestService) {
        const guest = await this.guestService.getGuestByShareUrl(shareUrl);
        if (guest) {
          invitation = await this.invitationService.getInvitationById(guest.invitationId);
          // Ưu tiên guestName từ query, nếu không có thì dùng tên guest
          if (!guestName && guest.name) {
            guestName = guest.name;
          }
        }
      }

      if (!invitation) {
        res.status(404).json({
          success: false,
          message: 'Invitation not found',
        });
        return;
      }

      const response = await this.formatInvitationResponse(invitation, (guestName as string) || undefined);

      res.json({
        success: true,
        data: response,
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: 'Failed to fetch invitation',
        error: error instanceof Error ? error.message : 'Unknown error',
      });
    }
  }

  async getInvitationBySlug(req: Request, res: Response): Promise<void> {
    try {
      const { slug } = req.params;
      const { guestName } = req.query;

      const invitation = await this.invitationService.getInvitationBySlug(slug);

      if (!invitation) {
        res.status(404).json({
          success: false,
          message: 'Invitation not found',
        });
        return;
      }

      const response = await this.formatInvitationResponse(invitation, guestName as string);

      res.json({
        success: true,
        data: response,
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: 'Failed to fetch invitation',
        error: error instanceof Error ? error.message : 'Unknown error',
      });
    }
  }

  async createInvitation(req: Request, res: Response): Promise<void> {
    try {
      const userId = (req as any).user?.id;
      if (!userId) {
        res.status(401).json({
          success: false,
          message: 'Unauthorized',
        });
        return;
      }

      const {
        templateId,
        groomName,
        brideName,
        story,
        invitationMessage,
        weddingDate,
        weddingTime,
        venue,
        venueAddress,
        recipientName,
        message,
        coverImage,
        avatarImage,
        gallery,
        discountCode,
        brideImage,
        groomImage,
        weddingImages,
        locationImage,
        organization,
      } = req.body;

      if (
        !templateId ||
        !groomName ||
        !brideName ||
        !weddingDate ||
        !weddingTime ||
        !venue ||
        !venueAddress ||
        !recipientName
      ) {
        res.status(400).json({
          success: false,
          message: 'Missing required fields',
        });
        return;
      }

      const invitation = await this.invitationService.createInvitation(userId, {
        templateId,
        groomName,
        brideName,
        story,
        invitationMessage,
        weddingDate,
        weddingTime,
        venue,
        venueAddress,
        recipientName,
        message,
        coverImage,
        avatarImage,
        gallery,
        discountCode,
        brideImage,
        groomImage,
        weddingImages,
        locationImage,
        organization,
      });

      // Tự động tạo guest với tên là recipientName (không tạo nếu không có recipientName)
      // Guest sẽ được tạo từ frontend với danh sách recipientNames
      console.log('Invitation created successfully:', invitation.id);
      
      // Không tạo default guest nữa, để frontend tự tạo với danh sách recipientNames

      res.status(201).json({
        success: true,
        data: invitation,
        message: 'Invitation created successfully',
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: 'Failed to create invitation',
        error: error instanceof Error ? error.message : 'Unknown error',
      });
    }
  }

  async updateInvitation(req: Request, res: Response): Promise<void> {
    try {
      const userId = (req as any).user?.id;
      const { id } = req.params;

      if (!userId) {
        res.status(401).json({
          success: false,
          message: 'Unauthorized',
        });
        return;
      }

      const invitation = await this.invitationService.updateInvitation(
        id,
        userId,
        req.body
      );

      if (!invitation) {
        res.status(404).json({
          success: false,
          message: 'Invitation not found',
        });
        return;
      }

      res.json({
        success: true,
        data: invitation,
        message: 'Invitation updated successfully',
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: 'Failed to update invitation',
        error: error instanceof Error ? error.message : 'Unknown error',
      });
    }
  }

  async deleteInvitation(req: Request, res: Response): Promise<void> {
    try {
      const userId = (req as any).user?.id;
      const { id } = req.params;

      if (!userId) {
        res.status(401).json({
          success: false,
          message: 'Unauthorized',
        });
        return;
      }

      const deleted = await this.invitationService.deleteInvitation(id, userId);

      if (!deleted) {
        res.status(404).json({
          success: false,
          message: 'Invitation not found',
        });
        return;
      }

      res.json({
        success: true,
        message: 'Invitation deleted successfully',
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: 'Failed to delete invitation',
        error: error instanceof Error ? error.message : 'Unknown error',
      });
    }
  }
}
