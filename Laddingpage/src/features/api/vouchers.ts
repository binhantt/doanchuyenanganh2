/**
 * Vouchers API
 * Handles all voucher-related API calls
 */

import apiClient from './client';
import { API_CONFIG } from './config';
import { ApiResponse } from './types';

export interface Voucher {
  id: string;
  code: string;
  discountPercent: number;
  discountAmount?: number;
  maxUses?: number;
  usedCount: number;
  minOrderAmount?: number;
  maxDiscountAmount?: number;
  description?: string;
  expiryDate?: string;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface ValidateVoucherRequest {
  code: string;
  orderAmount: number;
}

export interface ValidateVoucherResponse {
  valid: boolean;
  voucher?: Voucher;
  discountAmount: number;
  finalAmount: number;
  message?: string;
}

export const vouchersApi = {
  /**
   * Validate voucher code
   */
  async validate(data: ValidateVoucherRequest): Promise<ApiResponse<ValidateVoucherResponse>> {
    try {
      const response = await apiClient.post(
        `${API_CONFIG.ENDPOINTS.USER.VOUCHERS}/validate`,
        data
      );
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  /**
   * Get all active vouchers
   */
  async getActive(): Promise<ApiResponse<Voucher[]>> {
    try {
      const response = await apiClient.get(
        `${API_CONFIG.ENDPOINTS.USER.VOUCHERS}/active`
      );
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  /**
   * Get voucher by code
   */
  async getByCode(code: string): Promise<ApiResponse<Voucher>> {
    try {
      const response = await apiClient.get(
        `${API_CONFIG.ENDPOINTS.USER.VOUCHERS}/${code}`
      );
      return response.data;
    } catch (error) {
      throw error;
    }
  },
};
