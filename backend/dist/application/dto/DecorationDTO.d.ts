export interface DecorationDTO {
    id: string;
    name: string;
    slug: string;
    description: string;
    theme: string;
    style: string;
    basePrice: number;
    features: string[];
    images: string[];
    isActive: boolean;
    createdAt?: string;
    updatedAt?: string;
}
export interface DecorationListDTO {
    id: string;
    name: string;
    slug: string;
    description: string;
    theme: string;
    style: string;
    basePrice: number;
    images: string[];
    isActive: boolean;
}
export interface CreateDecorationDTO {
    name: string;
    slug: string;
    description: string;
    theme: string;
    style: string;
    basePrice: number;
    features: string[];
    images: string[];
    isActive?: boolean;
}
export interface UpdateDecorationDTO {
    name?: string;
    slug?: string;
    description?: string;
    theme?: string;
    style?: string;
    basePrice?: number;
    features?: string[];
    images?: string[];
    isActive?: boolean;
}
//# sourceMappingURL=DecorationDTO.d.ts.map