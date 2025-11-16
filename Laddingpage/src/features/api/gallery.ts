/**
 * Gallery API
 * Handles all gallery/image-related API calls
 */

import apiClient from './client';
import { API_CONFIG } from './config';
import { ApiResponse, Gallery } from './types';

export const galleryApi = {
  /**
   * Get all gallery items (public)
   */
  async getAll(
    category?: string,
    relatedType?: string,
    relatedId?: string
  ): Promise<ApiResponse<Gallery[]>> {
    try {
      const params: any = {};
      if (category) params.category = category;
      if (relatedType) params.relatedType = relatedType;
      if (relatedId) params.relatedId = relatedId;

      const response = await apiClient.get(API_CONFIG.ENDPOINTS.USER.GALLERY, {
        params,
      });
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  /**
   * Get gallery items related to an object
   */
  async getRelated(
    relatedType: string,
    relatedId: string
  ): Promise<ApiResponse<Gallery[]>> {
    try {
      const response = await apiClient.get(
        `${API_CONFIG.ENDPOINTS.USER.GALLERY}/related/${relatedType}/${relatedId}`
      );
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  /**
   * Get primary image for an object
   */
  async getPrimary(
    relatedType: string,
    relatedId: string
  ): Promise<ApiResponse<Gallery>> {
    try {
      const response = await apiClient.get(
        `${API_CONFIG.ENDPOINTS.USER.GALLERY}/primary/${relatedType}/${relatedId}`
      );
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  /**
   * Get gallery item by ID
   */
  async getById(id: string): Promise<ApiResponse<Gallery>> {
    try {
      const response = await apiClient.get(
        `${API_CONFIG.ENDPOINTS.USER.GALLERY}/${id}`
      );
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  /**
   * Create gallery item (admin)
   */
  async create(data: Partial<Gallery>): Promise<ApiResponse<Gallery>> {
    try {
      const response = await apiClient.post(
        API_CONFIG.ENDPOINTS.ADMIN.GALLERY,
        data
      );
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  /**
   * Update gallery item (admin)
   */
  async update(id: string, data: Partial<Gallery>): Promise<ApiResponse<Gallery>> {
    try {
      const response = await apiClient.put(
        `${API_CONFIG.ENDPOINTS.ADMIN.GALLERY}/${id}`,
        data
      );
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  /**
   * Set as primary image (admin)
   */
  async setPrimary(
    id: string,
    relatedId: string,
    relatedType: string
  ): Promise<ApiResponse> {
    try {
      const response = await apiClient.put(
        `${API_CONFIG.ENDPOINTS.ADMIN.GALLERY}/${id}/primary`,
        { relatedId, relatedType }
      );
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  /**
   * Update display order (admin)
   */
  async updateOrder(id: string, order: number): Promise<ApiResponse> {
    try {
      const response = await apiClient.put(
        `${API_CONFIG.ENDPOINTS.ADMIN.GALLERY}/${id}/order`,
        { order }
      );
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  /**
   * Delete gallery item (admin)
   */
  async delete(id: string): Promise<ApiResponse> {
    try {
      const response = await apiClient.delete(
        `${API_CONFIG.ENDPOINTS.ADMIN.GALLERY}/${id}`
      );
      return response.data;
    } catch (error) {
      throw error;
    }
  },
};
