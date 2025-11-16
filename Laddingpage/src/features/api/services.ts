/**
 * Services API
 * Handles all service-related API calls
 */

import apiClient from './client';
import { API_CONFIG } from './config';
import { ApiResponse, Service, CreateServiceRequest } from './types';

export const servicesApi = {
  /**
   * Get all active services (public)
   */
  async getAll(active: boolean = true): Promise<ApiResponse<Service[]>> {
    try {
      const response = await apiClient.get(API_CONFIG.ENDPOINTS.USER.SERVICES, {
        params: { active },
      });
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  /**
   * Get available services
   */
  async getAvailable(): Promise<ApiResponse<Service[]>> {
    try {
      const response = await apiClient.get(
        API_CONFIG.ENDPOINTS.USER.SERVICES_AVAILABLE
      );
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  /**
   * Get service by ID
   */
  async getById(id: string): Promise<ApiResponse<Service>> {
    try {
      const response = await apiClient.get(
        `${API_CONFIG.ENDPOINTS.USER.SERVICES}/${id}`
      );
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  /**
   * Get service by slug
   */
  async getBySlug(slug: string): Promise<ApiResponse<Service>> {
    try {
      const response = await apiClient.get(
        `${API_CONFIG.ENDPOINTS.USER.SERVICES}/slug/${slug}`
      );
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  /**
   * Create service (admin)
   */
  async create(data: CreateServiceRequest): Promise<ApiResponse<Service>> {
    try {
      const response = await apiClient.post(
        API_CONFIG.ENDPOINTS.ADMIN.SERVICES,
        data
      );
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  /**
   * Update service (admin)
   */
  async update(
    id: string,
    data: Partial<CreateServiceRequest>
  ): Promise<ApiResponse<Service>> {
    try {
      const response = await apiClient.put(
        `${API_CONFIG.ENDPOINTS.ADMIN.SERVICES}/${id}`,
        data
      );
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  /**
   * Delete service (admin)
   */
  async delete(id: string): Promise<ApiResponse> {
    try {
      const response = await apiClient.delete(
        `${API_CONFIG.ENDPOINTS.ADMIN.SERVICES}/${id}`
      );
      return response.data;
    } catch (error) {
      throw error;
    }
  },
};
