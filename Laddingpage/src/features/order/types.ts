export interface OrderItem {
  id: string;
  type: 'package' | 'product';
  name: string;
  price: number;
  quantity: number;
  currency?: string;
  image?: string;
  description?: string;
}

export interface CustomerInfo {
  fullName: string;
  email: string;
  phone: string;
  weddingDate: string;
  guestCount?: number;
  venue?: string;
  notes?: string;
}

export interface PaymentMethod {
  id: string;
  name: string;
  description: string;
  icon: string;
}

export interface Order {
  id: string;
  items: OrderItem[];
  customerInfo: CustomerInfo;
  paymentMethod: string;
  subtotal: number;
  discount: number;
  tax: number;
  total: number;
  status: 'pending' | 'confirmed' | 'processing' | 'completed' | 'cancelled';
  createdAt: string;
}

export interface OrderFormData {
  customerInfo: CustomerInfo;
  paymentMethod: string;
  agreeToTerms: boolean;
}
