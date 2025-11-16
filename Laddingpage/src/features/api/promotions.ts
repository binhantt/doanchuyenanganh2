/**
 * Promotions API
 * Handles all promotion/discount code related API calls
 */

import apiClient from './client';
import { API_CONFIG } from './config';
import { ApiResponse } from './types';

export interface Promotion {
  id: string;
  code: string;
  title: string;
  description: string;
  discountType: 'percentage' | 'fixed';
  discountValue: number;
  maxDiscount?: number;
  minOrderAmount?: number;
  applicableServices?: string[];
  applicablePackages?: string[];
  startDate: string;
  endDate: string;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface ValidatePromotionRequest {
  code: string;
  orderAmount: number;
  serviceId?: string;
  packageId?: string;
}

export interface ValidatePromotionResponse {
  valid: boolean;
  promotion?: Promotion;
  discountAmount: number;
  finalAmount: number;
  message?: string;
}

export interface CreatePromotionRequest {
  code: string;
  title: string;
  description: string;
  discountType: 'percentage' | 'fixed';
  discountValue: number;
  maxDiscount?: number;
  minOrderAmount?: number;
  applicableServices?: string[];
  applicablePackages?: string[];
  startDate: string;
  endDate: string;
  isActive: boolean;
}

export interface UpdatePromotionRequest {
  code?: string;
  title?: string;
  description?: string;
  discountType?: 'percentage' | 'fixed';
  discountValue?: number;
  maxDiscount?: number;
  minOrderAmount?: number;
  applicableServices?: string[];
  applicablePackages?: string[];
  startDate?: string;
  endDate?: string;
  isActive?: boolean;
}

export const promotionsApi = {
  /**
   * Get all promotions (admin only)
   */
  async getAll(active?: boolean): Promise<ApiResponse<Promotion[]>> {
    try {
      const params = active ? '?active=true' : '';
      const response = await apiClient.get(
        `${API_CONFIG.ENDPOINTS.ADMIN.PROMOTIONS}${params}`
      );
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  /**
   * Get promotion by ID (admin only)
   */
  async getById(id: string): Promise<ApiResponse<Promotion>> {
    try {
      const response = await apiClient.get(
        `${API_CONFIG.ENDPOINTS.ADMIN.PROMOTIONS}/${id}`
      );
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  /**
   * Get promotion by code (admin only)
   */
  async getByCode(code: string): Promise<ApiResponse<Promotion>> {
    try {
      const response = await apiClient.get(
        `${API_CONFIG.ENDPOINTS.ADMIN.PROMOTIONS}/code/${code}`
      );
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  /**
   * Get promotions for a service (admin only)
   */
  async getByService(serviceId: string): Promise<ApiResponse<Promotion[]>> {
    try {
      const response = await apiClient.get(
        `${API_CONFIG.ENDPOINTS.ADMIN.PROMOTIONS}/service/${serviceId}`
      );
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  /**
   * Get promotions for a package (admin only)
   */
  async getByPackage(packageId: string): Promise<ApiResponse<Promotion[]>> {
    try {
      const response = await apiClient.get(
        `${API_CONFIG.ENDPOINTS.ADMIN.PROMOTIONS}/package/${packageId}`
      );
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  /**
   * Create a new promotion (admin only)
   */
  async create(data: CreatePromotionRequest): Promise<ApiResponse<Promotion>> {
    try {
      const response = await apiClient.post(
        `${API_CONFIG.ENDPOINTS.ADMIN.PROMOTIONS}`,
        data
      );
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  /**
   * Update a promotion (admin only)
   */
  async update(id: string, data: UpdatePromotionRequest): Promise<ApiResponse<Promotion>> {
    try {
      const response = await apiClient.put(
        `${API_CONFIG.ENDPOINTS.ADMIN.PROMOTIONS}/${id}`,
        data
      );
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  /**
   * Delete a promotion (admin only)
   */
  async delete(id: string): Promise<ApiResponse<void>> {
    try {
      const response = await apiClient.delete(
        `${API_CONFIG.ENDPOINTS.ADMIN.PROMOTIONS}/${id}`
      );
      return response.data;
    } catch (error) {
      throw error;
    }
  },
};
