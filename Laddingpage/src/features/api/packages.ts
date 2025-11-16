/**
 * Wedding Packages API
 * Handles all package-related API calls
 */

import apiClient from './client';
import { API_CONFIG } from './config';
import { ApiResponse, Package, CreatePackageRequest } from './types';

export const packagesApi = {
  /**
   * Get all packages (public)
   */
  async getAll(active: boolean = true): Promise<ApiResponse<Package[]>> {
    try {
      const response = await apiClient.get(API_CONFIG.ENDPOINTS.USER.PACKAGES, {
        params: { active },
      });
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  /**
   * Get popular packages
   */
  async getPopular(): Promise<ApiResponse<Package[]>> {
    try {
      const response = await apiClient.get(
        `${API_CONFIG.ENDPOINTS.USER.PACKAGES}/popular`
      );
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  /**
   * Get package by ID
   */
  async getById(id: string): Promise<ApiResponse<Package>> {
    try {
      const response = await apiClient.get(
        `${API_CONFIG.ENDPOINTS.USER.PACKAGES}/${id}`
      );
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  /**
   * Get package by slug
   */
  async getBySlug(slug: string): Promise<ApiResponse<Package>> {
    try {
      const response = await apiClient.get(
        `${API_CONFIG.ENDPOINTS.USER.PACKAGES}/slug/${slug}`
      );
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  /**
   * Create package (admin)
   */
  async create(data: CreatePackageRequest): Promise<ApiResponse<Package>> {
    try {
      const response = await apiClient.post(
        API_CONFIG.ENDPOINTS.ADMIN.PACKAGES,
        data
      );
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  /**
   * Update package (admin)
   */
  async update(
    id: string,
    data: Partial<CreatePackageRequest>
  ): Promise<ApiResponse<Package>> {
    try {
      const response = await apiClient.put(
        `${API_CONFIG.ENDPOINTS.ADMIN.PACKAGES}/${id}`,
        data
      );
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  /**
   * Delete package (admin)
   */
  async delete(id: string): Promise<ApiResponse> {
    try {
      const response = await apiClient.delete(
        `${API_CONFIG.ENDPOINTS.ADMIN.PACKAGES}/${id}`
      );
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  /**
   * Get package images by package ID
   */
  async getImages(packageId: string): Promise<ApiResponse<any[]>> {
    try {
      const response = await apiClient.get(
        `${API_CONFIG.ENDPOINTS.USER.GALLERY}/related/package/${packageId}`
      );
      return response.data;
    } catch (error) {
      throw error;
    }
  },
};
