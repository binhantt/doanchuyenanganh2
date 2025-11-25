export declare class Gallery {
    readonly id: string;
    readonly title: string;
    readonly altText: string | null;
    readonly fileName: string;
    readonly filePath: string;
    readonly fileUrl: string;
    readonly mimeType: string;
    readonly fileSize: number;
    readonly width: number | null;
    readonly height: number | null;
    readonly category: string;
    readonly relatedId: string | null;
    readonly relatedType: string | null;
    readonly displayOrder: number;
    readonly isPrimary: boolean;
    readonly isActive: boolean;
    readonly createdAt?: Date | undefined;
    readonly updatedAt?: Date | undefined;
    constructor(id: string, title: string, altText: string | null, fileName: string, filePath: string, fileUrl: string, mimeType: string, fileSize: number, width: number | null, height: number | null, category: string, relatedId: string | null, relatedType: string | null, displayOrder?: number, isPrimary?: boolean, isActive?: boolean, createdAt?: Date | undefined, updatedAt?: Date | undefined);
    isImage(): boolean;
    getFileExtension(): string;
    getFileSizeInKB(): number;
    getFileSizeInMB(): number;
    getDimensions(): string | null;
}
//# sourceMappingURL=Gallery.d.ts.map