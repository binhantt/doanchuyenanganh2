export class FAQ {
  constructor(
    public readonly id: string,
    public readonly question: string,
    public readonly answer: string,
    public readonly category: string,
    public readonly language: string,
    public readonly displayOrder: number,
    public readonly isActive: boolean = true,
    public readonly createdAt?: Date,
    public readonly updatedAt?: Date
  ) {}

  isVisible(): boolean {
    return this.isActive;
  }
}
