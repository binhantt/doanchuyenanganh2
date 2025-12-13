import { Request, Response } from 'express';
import { GuestService } from '../../application/services/GuestService';
import { InvitationService } from '../../application/services/InvitationService';

export class GuestController {
  constructor(
    private readonly guestService: GuestService,
    private readonly invitationService?: InvitationService
  ) {}

  async getAllGuests(req: Request, res: Response): Promise<void> {
    try {
      console.log('=== Getting all guests ===');
      const guests = await this.guestService.getAllGuests();

      console.log('Total guests found:', guests.length);

      const guestsData = guests.map((g) => ({
        id: g.id,
        invitationId: g.invitationId,
        name: g.name,
        status: g.status,
        time: g.time,
        createdAt: g.createdAt,
        updatedAt: g.updatedAt,
      }));

      res.json({
        success: true,
        data: guestsData,
        count: guestsData.length,
      });
    } catch (error) {
      console.error('Error getting all guests:', error);
      res.status(500).json({
        success: false,
        message: 'Failed to fetch guests',
        error: error instanceof Error ? error.message : 'Unknown error',
      });
    }
  }

  async getGuestsByInvitationId(req: Request, res: Response): Promise<void> {
    try {
      const { invitationId } = req.params;

      console.log('Fetching guests for invitationId:', invitationId);

      // Kiểm tra xem invitationId là UUID hay shareUrl
      let actualInvitationId = invitationId;
      
      // Nếu không phải UUID format (36 ký tự với dấu gạch ngang), có thể là shareUrl
      const isUUID = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(invitationId);
      
      if (!isUUID && this.invitationService) {
        // Thử tìm invitation bằng shareUrl
        const invitation = await this.invitationService.getInvitationByShareUrl(invitationId);
        if (invitation) {
          actualInvitationId = invitation.id;
          console.log('Found invitation by shareUrl, using invitationId:', actualInvitationId);
        } else {
          // Thử tìm bằng slug
          const invitationBySlug = await this.invitationService.getInvitationBySlug(invitationId);
          if (invitationBySlug) {
            actualInvitationId = invitationBySlug.id;
            console.log('Found invitation by slug, using invitationId:', actualInvitationId);
          }
        }
      }

      const guests = await this.guestService.getGuestsByInvitationId(actualInvitationId);

      console.log('Found guests:', guests.length);
      if (guests.length > 0) {
        console.log('Sample guest:', guests[0]);
      }

      // Trả về đầy đủ thông tin guests
      const guestsData = guests.map((g) => ({
        id: g.id,
        invitationId: g.invitationId,
        name: g.name,
        status: g.status,
        time: g.time,
        createdAt: g.createdAt,
        updatedAt: g.updatedAt,
      }));

      res.json({
        success: true,
        data: guestsData,
        count: guestsData.length,
      });
    } catch (error) {
      console.error('Error fetching guests:', error);
      res.status(500).json({
        success: false,
        message: 'Failed to fetch guests',
        error: error instanceof Error ? error.message : 'Unknown error',
      });
    }
  }

  async getGuestsByShareUrl(req: Request, res: Response): Promise<void> {
    try {
      const { shareUrl } = req.params;

      console.log('=== Fetching guests for shareUrl ===');
      console.log('shareUrl:', shareUrl);

      if (!this.invitationService) {
        console.error('Invitation service not available');
        res.status(500).json({
          success: false,
          message: 'Invitation service not available',
        });
        return;
      }

      // Lấy invitation bằng shareUrl
      console.log('Looking for invitation with shareUrl:', shareUrl);
      const invitation = await this.invitationService.getInvitationByShareUrl(shareUrl);

      if (!invitation) {
        console.log('Invitation not found for shareUrl:', shareUrl);
        res.status(404).json({
          success: false,
          message: 'Invitation not found',
        });
        return;
      }

      console.log('Found invitation:', {
        id: invitation.id,
        shareUrl: invitation.shareUrl,
        groomName: invitation.groomName,
        brideName: invitation.brideName,
      });

      // Lấy guests từ invitationId
      console.log('Fetching guests for invitationId:', invitation.id);
      let guests = await this.guestService.getGuestsByInvitationId(invitation.id);

      console.log('Found guests:', guests.length);

      // Nếu không có guests, tự động tạo một guest mặc định
      if (guests.length === 0) {
        console.log('⚠️ No guests found, creating default guest...');
        const groomName = invitation.groom || invitation.groomName || 'Chú rể';
        const { guestName } = req.query;
        
        const defaultGuestName = guestName && typeof guestName === 'string' 
          ? guestName 
          : groomName;
        
        try {
          const defaultGuest = await this.guestService.createGuest(invitation.id, {
            name: defaultGuestName,
            status: 'pending',
          });
          console.log('✅ Created default guest:', {
            id: defaultGuest.id,
            name: defaultGuest.name,
            invitationId: defaultGuest.invitationId,
          });
          guests = [defaultGuest];
        } catch (error) {
          console.error('❌ Error creating default guest:', error);
          if (error instanceof Error) {
            console.error('Error details:', error.message);
            console.error('Error stack:', error.stack);
          }
          // Tiếp tục với guests rỗng nếu không tạo được
        }
      } else {
        if (guests.length > 0) {
          console.log('Sample guest:', {
            id: guests[0].id,
            name: guests[0].name,
            status: guests[0].status,
          });
        }
      }

      const guestsData = guests.map((g) => ({
        id: g.id,
        invitationId: g.invitationId,
        name: g.name,
        status: g.status,
        time: g.time,
        createdAt: g.createdAt,
        updatedAt: g.updatedAt,
      }));

      res.json({
        success: true,
        data: guestsData,
        count: guestsData.length,
      });
    } catch (error) {
      console.error('Error fetching guests by shareUrl:', error);
      if (error instanceof Error) {
        console.error('Error stack:', error.stack);
      }
      res.status(500).json({
        success: false,
        message: 'Failed to fetch guests',
        error: error instanceof Error ? error.message : 'Unknown error',
      });
    }
  }

  async createGuest(req: Request, res: Response): Promise<void> {
    try {
      const { invitationId } = req.params;
      const { name, status } = req.body;
      const userId = (req as any).user?.id;
      const userName = (req as any).user?.name || (req as any).user?.username || '';

      // Nếu không có name, tự động tạo từ groom_name + user name
      let guestName = name;
      if (!guestName && this.invitationService) {
        try {
          // Lấy invitation bằng id (không cần userId check)
          const invitation = await this.invitationService.getInvitationById(invitationId);
          
          if (invitation) {
            const groomName = invitation.groom || invitation.groomName || '';
            if (groomName && userName) {
              guestName = `${groomName} & ${userName}`;
            } else if (groomName) {
              guestName = groomName;
            } else if (userName) {
              guestName = userName;
            }
          }
        } catch (error) {
          console.error('Error fetching invitation for guest name:', error);
        }
      }

      if (!guestName) {
        res.status(400).json({
          success: false,
          message: 'Name is required or user must be authenticated',
        });
        return;
      }

      const guest = await this.guestService.createGuest(invitationId, {
        name: guestName,
        status,
      });

      res.status(201).json({
        success: true,
        data: guest,
        message: 'Guest created successfully',
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: 'Failed to create guest',
        error: error instanceof Error ? error.message : 'Unknown error',
      });
    }
  }
}