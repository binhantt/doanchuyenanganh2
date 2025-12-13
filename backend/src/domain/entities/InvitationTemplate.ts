export class InvitationTemplate {
  constructor(
    public readonly id: number,
    public readonly name: string,
    public readonly description: string | null,
    public readonly thumbnailUrl: string | null,
    public readonly previewUrl: string | null,
    public readonly configJson: any | null,
    public readonly price: number,
    public readonly designConfig: any,
    public readonly category: string | null,
    public readonly isActive: boolean,
    public readonly usageCount: number,
    public readonly createdAt?: Date,
    public readonly updatedAt?: Date
  ) {}
}





