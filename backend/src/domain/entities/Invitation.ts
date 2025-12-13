export class Invitation {
  constructor(
    public readonly id: string,
    public readonly userId: string,
    public readonly templateId: number,
    public readonly groomName: string,
    public readonly brideName: string,
    public readonly story: string | null,
    public readonly invitationMessage: string | null,
    public readonly weddingDate: string,
    public readonly weddingTime: string,
    public readonly venue: string,
    public readonly venueAddress: string,
    public readonly recipientName: string,
    public readonly message: string | null,
    public readonly coverImage: string | null,
    public readonly avatarImage: string | null,
    public readonly gallery: string[] | null,
    public readonly discountCode: string | null,
    public readonly shareUrl: string,
    public readonly isActive: boolean = true,
    public readonly createdAt?: Date,
    public readonly updatedAt?: Date,
    // Additional fields from migration
    public readonly bride: string | null = null,
    public readonly groom: string | null = null,
    public readonly date: string | null = null,
    public readonly location: string | null = null,
    public readonly customText: string | null = null,
    public readonly slug: string | null = null,
    // Image fields
    public readonly brideImage: string | null = null,
    public readonly groomImage: string | null = null,
    public readonly weddingImages: string[] | null = null,
    public readonly locationImage: string | null = null,
    public readonly organization: string | null = null
  ) {}
}
