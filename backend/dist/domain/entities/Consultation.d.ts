export declare class Consultation {
    readonly id: string;
    readonly clientName: string;
    readonly clientEmail: string;
    readonly clientPhone: string;
    readonly weddingDate: Date;
    readonly guestCount: number;
    readonly venue: string;
    readonly serviceType: string;
    readonly budget: string;
    readonly notes: string;
    readonly status: 'pending' | 'confirmed' | 'completed' | 'cancelled';
    readonly createdAt?: Date | undefined;
    readonly updatedAt?: Date | undefined;
    constructor(id: string, clientName: string, clientEmail: string, clientPhone: string, weddingDate: Date, guestCount: number, venue: string, serviceType: string, budget: string, notes: string, status?: 'pending' | 'confirmed' | 'completed' | 'cancelled', createdAt?: Date | undefined, updatedAt?: Date | undefined);
    isPending(): boolean;
    isConfirmed(): boolean;
    getDisplayDate(): string;
}
//# sourceMappingURL=Consultation.d.ts.map