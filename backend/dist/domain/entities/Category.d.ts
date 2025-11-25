export declare class Category {
    readonly id: number;
    readonly name: string;
    readonly slug: string;
    readonly description: string | null;
    readonly isActive: boolean;
    readonly createdAt?: Date | undefined;
    readonly updatedAt?: Date | undefined;
    constructor(id: number, name: string, slug: string, description: string | null, isActive?: boolean, createdAt?: Date | undefined, updatedAt?: Date | undefined);
    isAvailable(): boolean;
}
//# sourceMappingURL=Category.d.ts.map