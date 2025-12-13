export class Guest {
  constructor(
    public readonly id: string,
    public readonly invitationId: string,
    public readonly name: string,
    public readonly status: 'pending' | 'accepted' | 'declined',
    public readonly shareUrl?: string,
    public readonly time?: Date,
    public readonly createdAt?: Date,
    public readonly updatedAt?: Date
  ) {}
}

