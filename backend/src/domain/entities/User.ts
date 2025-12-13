export class User {
  constructor(
    public readonly id: string,
    public readonly email: string,
    public readonly password: string,
    public readonly fullName: string,
    public readonly phone: string | null,
    public readonly role: 'admin' | 'staff' | 'user',
    public readonly isActive: boolean = true,
    public readonly emailVerifiedAt: Date | null = null,
    public readonly createdAt?: Date,
    public readonly updatedAt?: Date
  ) {}

  isAdmin(): boolean {
    return this.role === 'admin';
  }

  isStaff(): boolean {
    return this.role === 'staff';
  }

  isUser(): boolean {
    return this.role === 'user';
  }

  isVerified(): boolean {
    return this.emailVerifiedAt !== null;
  }
}
