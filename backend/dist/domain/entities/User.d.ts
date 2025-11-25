export declare class User {
    readonly id: string;
    readonly email: string;
    readonly password: string;
    readonly fullName: string;
    readonly phone: string | null;
    readonly role: 'admin' | 'staff';
    readonly isActive: boolean;
    readonly emailVerifiedAt: Date | null;
    readonly createdAt?: Date | undefined;
    readonly updatedAt?: Date | undefined;
    constructor(id: string, email: string, password: string, fullName: string, phone: string | null, role: 'admin' | 'staff', isActive?: boolean, emailVerifiedAt?: Date | null, createdAt?: Date | undefined, updatedAt?: Date | undefined);
    isAdmin(): boolean;
    isStaff(): boolean;
    isVerified(): boolean;
}
//# sourceMappingURL=User.d.ts.map