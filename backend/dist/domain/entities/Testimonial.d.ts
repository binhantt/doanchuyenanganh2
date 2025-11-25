export declare class Testimonial {
    readonly id: string;
    readonly clientName: string;
    readonly clientRole: string;
    readonly content: string;
    readonly rating: number;
    readonly eventDate: Date;
    readonly location: string;
    readonly language: string;
    readonly isActive: boolean;
    readonly createdAt?: Date | undefined;
    readonly updatedAt?: Date | undefined;
    constructor(id: string, clientName: string, clientRole: string, content: string, rating: number, eventDate: Date, location: string, language: string, isActive?: boolean, createdAt?: Date | undefined, updatedAt?: Date | undefined);
    isVisible(): boolean;
    getDisplayDate(): string;
}
//# sourceMappingURL=Testimonial.d.ts.map