import { Request, Response } from 'express';
import { InvitationStyleResponse } from '../../application/dto/InvitationStyleDTO';

export class InvitationStyleController {
  async getDefaultStyle(req: Request, res: Response): Promise<void> {
    const sample: InvitationStyleResponse = {
      groomName: 'Anh Dũng',
      brideName: 'Ngọc Anh',
      story:
        'Chúng tôi đã cùng nhau đi qua nhiều chặng đường và mong muốn chia sẻ khoảnh khắc hạnh phúc này với bạn.',
      invitationMessage:
        'Trân trọng kính mời bạn đến dự lễ cưới của chúng tôi. Sự hiện diện của bạn là niềm vinh hạnh lớn.',
      eventDate: '2025-12-28',
      eventTime: '18:30',
      venue: 'Metropole Hà Nội, 15 Ngô Quyền, Hoàn Kiếm',
      coverImage:
        'https://images.unsplash.com/photo-1519225421980-715cb0215aed?w=1200&q=80',
      gallery: [
        'https://images.unsplash.com/photo-1519671482749-fd09be7ccebf?w=1200&q=80',
        'https://images.unsplash.com/photo-1519741497674-611481863552?w=1200&q=80',
        'https://images.unsplash.com/photo-1519225421980-715cb0215aed?w=1200&q=80',
      ],
      discountCode: 'WED10',
      shareUrl: 'wedding-studio-invite-demo',
    };

    res.json({ success: true, data: sample });
  }
}

