'use client';

import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface OrderFormData {
  customerName: string;
  email: string;
  phone: string;
  eventDate: string;
  notes: string;
}

export interface OrderState {
  formData: OrderFormData;
  discountAmount: number;
  appliedPromotionCode: string | null;
  loading: boolean;
  error: string | null;
  success: boolean;
  showModal: boolean;
}

export interface OrderActions {
  setFormData: (data: Partial<OrderFormData>) => void;
  setDiscountAmount: (amount: number) => void;
  setAppliedPromotionCode: (code: string | null) => void;
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
  setSuccess: (success: boolean) => void;
  setShowModal: (show: boolean) => void;
  resetForm: () => void;
  resetOrder: () => void;
}

const initialFormData: OrderFormData = {
  customerName: '',
  email: '',
  phone: '',
  eventDate: '',
  notes: '',
};

const initialState: OrderState = {
  formData: initialFormData,
  discountAmount: 0,
  appliedPromotionCode: null,
  loading: false,
  error: null,
  success: false,
  showModal: false,
};

export const useOrderStore = create<OrderState & OrderActions>()(
  persist(
    (set) => ({
      ...initialState,

      setFormData: (data) => {
        set((state) => ({
          formData: { ...state.formData, ...data },
        }));
      },

      setDiscountAmount: (amount) => {
        set({ discountAmount: amount });
      },

      setAppliedPromotionCode: (code) => {
        set({ appliedPromotionCode: code });
      },

      setLoading: (loading) => {
        set({ loading });
      },

      setError: (error) => {
        set({ error });
      },

      setSuccess: (success) => {
        set({ success });
      },

      setShowModal: (show) => {
        set({ showModal: show });
      },

      resetForm: () => {
        set({
          formData: initialFormData,
          error: null,
        });
      },

      resetOrder: () => {
        set(initialState);
      },
    }),
    {
      name: 'wedding-order-storage',
    }
  )
);
