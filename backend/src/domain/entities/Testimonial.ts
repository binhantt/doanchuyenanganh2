export class Testimonial {
  constructor(
    public readonly id: string,
    public readonly clientName: string,
    public readonly clientRole: string,
    public readonly content: string,
    public readonly rating: number,
    public readonly eventDate: Date,
    public readonly location: string,
    public readonly language: string,
    public readonly isActive: boolean = true,
    public readonly createdAt?: Date,
    public readonly updatedAt?: Date
  ) {}

  isVisible(): boolean {
    return this.isActive;
  }

  getDisplayDate(): string {
    return this.eventDate.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
    });
  }
}
