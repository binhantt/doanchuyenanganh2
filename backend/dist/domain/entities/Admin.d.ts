export declare class Admin {
    readonly id: string;
    readonly username: string;
    readonly password: string;
    readonly email: string;
    readonly role: 'admin' | 'super_admin';
    readonly createdAt?: Date | undefined;
    readonly updatedAt?: Date | undefined;
    constructor(id: string, username: string, password: string, email: string, role?: 'admin' | 'super_admin', createdAt?: Date | undefined, updatedAt?: Date | undefined);
}
//# sourceMappingURL=Admin.d.ts.map