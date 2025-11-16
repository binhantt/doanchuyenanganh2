import { apiClient } from './client';

export interface ApplyVoucherRequest {
  voucherCode: string;
  totalAmount: number;
}

export interface ApplyVoucherResponse {
  voucherCode: string;
  discountAmount: number;
  finalAmount: number;
  discountType: string;
  discountValue: number;
}

export const applyVoucher = async (data: ApplyVoucherRequest): Promise<ApplyVoucherResponse> => {
  const response = await apiClient.post<ApplyVoucherResponse>('/orders/apply-voucher', data);
  return response.data;
};
