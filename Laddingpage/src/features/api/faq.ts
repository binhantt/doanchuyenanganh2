/**
 * FAQ API
 * Handles all FAQ-related API calls
 */

import apiClient from './client';
import { API_CONFIG } from './config';
import { ApiResponse, FAQ } from './types';

export const faqApi = {
  /**
   * Get all FAQs (public)
   */
  async getAll(category?: string, language?: string): Promise<ApiResponse<FAQ[]>> {
    try {
      const params: any = {};
      if (category) params.category = category;
      if (language) params.language = language;

      const response = await apiClient.get(API_CONFIG.ENDPOINTS.USER.FAQ, {
        params,
      });
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  /**
   * Get FAQ by category
   */
  async getByCategory(category: string): Promise<ApiResponse<FAQ[]>> {
    try {
      const response = await apiClient.get(
        `${API_CONFIG.ENDPOINTS.USER.FAQ}/category/${category}`
      );
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  /**
   * Get FAQ by language
   */
  async getByLanguage(language: string): Promise<ApiResponse<FAQ[]>> {
    try {
      const response = await apiClient.get(
        `${API_CONFIG.ENDPOINTS.USER.FAQ}/language/${language}`
      );
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  /**
   * Get FAQ by category and language
   */
  async getByCategoryAndLanguage(category: string, language: string): Promise<ApiResponse<FAQ[]>> {
    try {
      const response = await apiClient.get(
        `${API_CONFIG.ENDPOINTS.USER.FAQ}/category/${category}/language/${language}`
      );
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  /**
   * Get FAQ by ID
   */
  async getById(id: string): Promise<ApiResponse<FAQ>> {
    try {
      const response = await apiClient.get(
        `${API_CONFIG.ENDPOINTS.USER.FAQ}/${id}`
      );
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  /**
   * Create FAQ (admin)
   */
  async create(data: Partial<FAQ>): Promise<ApiResponse<FAQ>> {
    try {
      const response = await apiClient.post(
        API_CONFIG.ENDPOINTS.ADMIN.FAQ,
        data
      );
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  /**
   * Update FAQ (admin)
   */
  async update(id: string, data: Partial<FAQ>): Promise<ApiResponse<FAQ>> {
    try {
      const response = await apiClient.put(
        `${API_CONFIG.ENDPOINTS.ADMIN.FAQ}/${id}`,
        data
      );
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  /**
   * Delete FAQ (admin)
   */
  async delete(id: string): Promise<ApiResponse> {
    try {
      const response = await apiClient.delete(
        `${API_CONFIG.ENDPOINTS.ADMIN.FAQ}/${id}`
      );
      return response.data;
    } catch (error) {
      throw error;
    }
  },
};
