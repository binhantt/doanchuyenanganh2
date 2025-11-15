export class Consultation {
  constructor(
    public readonly id: string,
    public readonly clientName: string,
    public readonly clientEmail: string,
    public readonly clientPhone: string,
    public readonly weddingDate: Date,
    public readonly guestCount: number,
    public readonly venue: string,
    public readonly serviceType: string,
    public readonly budget: string,
    public readonly notes: string,
    public readonly status: 'pending' | 'confirmed' | 'completed' | 'cancelled' = 'pending',
    public readonly createdAt?: Date,
    public readonly updatedAt?: Date
  ) {}

  isPending(): boolean {
    return this.status === 'pending';
  }

  isConfirmed(): boolean {
    return this.status === 'confirmed';
  }

  getDisplayDate(): string {
    return this.weddingDate.toLocaleDateString('vi-VN', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  }
}
