export class Admin {
  constructor(
    public readonly id: string,
    public readonly username: string,
    public readonly password: string,
    public readonly email: string,
    public readonly role: 'admin' | 'super_admin' = 'admin',
    public readonly createdAt?: Date,
    public readonly updatedAt?: Date
  ) {}
}
