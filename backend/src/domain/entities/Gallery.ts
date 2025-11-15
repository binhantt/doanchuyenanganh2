export class Gallery {
  constructor(
    public readonly id: string,
    public readonly title: string,
    public readonly altText: string | null,
    public readonly fileName: string,
    public readonly filePath: string,
    public readonly fileUrl: string,
    public readonly mimeType: string,
    public readonly fileSize: number,
    public readonly width: number | null,
    public readonly height: number | null,
    public readonly category: string,
    public readonly relatedId: string | null,
    public readonly relatedType: string | null,
    public readonly displayOrder: number = 0,
    public readonly isPrimary: boolean = false,
    public readonly isActive: boolean = true,
    public readonly createdAt?: Date,
    public readonly updatedAt?: Date
  ) {}

  isImage(): boolean {
    return this.mimeType.startsWith('image/');
  }

  getFileExtension(): string {
    return this.fileName.split('.').pop() || '';
  }

  getFileSizeInKB(): number {
    return Math.round(this.fileSize / 1024);
  }

  getFileSizeInMB(): number {
    return Math.round((this.fileSize / 1024 / 1024) * 100) / 100;
  }

  getDimensions(): string | null {
    if (this.width && this.height) {
      return `${this.width}x${this.height}`;
    }
    return null;
  }
}
