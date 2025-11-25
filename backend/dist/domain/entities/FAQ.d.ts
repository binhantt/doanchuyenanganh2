export declare class FAQ {
    readonly id: string;
    readonly question: string;
    readonly answer: string;
    readonly category: string;
    readonly language: string;
    readonly displayOrder: number;
    readonly isActive: boolean;
    readonly createdAt?: Date | undefined;
    readonly updatedAt?: Date | undefined;
    constructor(id: string, question: string, answer: string, category: string, language: string, displayOrder: number, isActive?: boolean, createdAt?: Date | undefined, updatedAt?: Date | undefined);
    isVisible(): boolean;
}
//# sourceMappingURL=FAQ.d.ts.map