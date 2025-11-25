export interface CategoryDTO {
    id: number;
    name: string;
    slug: string;
    description: string | null;
    isActive: boolean;
    createdAt: string;
    updatedAt: string;
}
export interface CreateCategoryDTO {
    name: string;
    slug: string;
    description?: string;
    isActive?: boolean;
}
export interface UpdateCategoryDTO {
    name?: string;
    slug?: string;
    description?: string;
    isActive?: boolean;
}
//# sourceMappingURL=CategoryDTO.d.ts.map