'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { ArrowLeft, ShoppingCart, CheckCircle } from 'lucide-react';
import { useCartStore } from '@/src/features/order/store/useCartStore';
import CartItem from '@/src/features/order/components/CartItem';
import OrderSummary from '@/src/features/order/components/OrderSummary';
import CustomerInfoForm from '@/src/features/order/components/CustomerInfoForm';
import PaymentMethodSelector from '@/src/features/order/components/PaymentMethodSelector';
import { CustomerInfo } from '@/src/features/order/types';

export default function OrderPage() {
  const router = useRouter();
  const { items, updateQuantity, removeItem, clearCart, getSubtotal } = useCartStore();

  const [step, setStep] = useState<'cart' | 'info' | 'payment' | 'success'>('cart');
  const [customerInfo, setCustomerInfo] = useState<CustomerInfo>({
    fullName: '',
    email: '',
    phone: '',
    weddingDate: '',
  });
  const [paymentMethod, setPaymentMethod] = useState('bank-transfer');
  const [agreeToTerms, setAgreeToTerms] = useState(false);
  const [errors, setErrors] = useState<Partial<Record<keyof CustomerInfo, string>>>({});

  const subtotal = getSubtotal();

  const validateCustomerInfo = (): boolean => {
    const newErrors: Partial<Record<keyof CustomerInfo, string>> = {};

    if (!customerInfo.fullName.trim()) {
      newErrors.fullName = 'Vui lòng nhập họ tên';
    }

    if (!customerInfo.email.trim()) {
      newErrors.email = 'Vui lòng nhập email';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(customerInfo.email)) {
      newErrors.email = 'Email không hợp lệ';
    }

    if (!customerInfo.phone.trim()) {
      newErrors.phone = 'Vui lòng nhập số điện thoại';
    } else if (!/^[0-9]{10}$/.test(customerInfo.phone.replace(/\s/g, ''))) {
      newErrors.phone = 'Số điện thoại không hợp lệ';
    }

    if (!customerInfo.weddingDate) {
      newErrors.weddingDate = 'Vui lòng chọn ngày cưới';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleContinueToInfo = () => {
    if (items.length === 0) {
      alert('Giỏ hàng trống. Vui lòng thêm sản phẩm trước khi tiếp tục.');
      return;
    }
    setStep('info');
  };

  const handleContinueToPayment = () => {
    if (validateCustomerInfo()) {
      setStep('payment');
    }
  };

  const handleSubmitOrder = () => {
    if (!agreeToTerms) {
      alert('Vui lòng đồng ý với điều khoản và điều kiện');
      return;
    }

    // Mock order submission
    console.log('Order submitted:', {
      items,
      customerInfo,
      paymentMethod,
      subtotal,
    });

    setStep('success');
  };

  // Empty cart
  if (step === 'cart' && items.length === 0) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-white via-pink-50/30 to-white py-35">
        <div className="container mx-auto  max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center py-20">
            <ShoppingCart className="w-24 h-24 mx-auto text-gray-300 mb-6" />
            <h1 className="text-3xl font-bold text-gray-900 mb-4">Giỏ Hàng Trống</h1>
            <p className="text-gray-600 mb-8">
              Bạn chưa có sản phẩm nào trong giỏ hàng
            </p>
            <button
              onClick={() => router.push('/')}
              className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-rose-500 to-pink-600 text-white font-semibold rounded-full hover:shadow-xl hover:scale-105 transition-all duration-300"
            >
              <ArrowLeft className="w-5 h-5" />
              Tiếp Tục Mua Sắm
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Success page
  if (step === 'success') {
    return (
      <div className="min-h-screen bg-gradient-to-b from-white via-pink-50/30 to-white py-35">
        <div className="container mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-3xl p-12 text-center shadow-2xl border-2 border-rose-100">
            <div className="w-24 h-24 mx-auto mb-6 bg-gradient-to-r from-green-500 to-emerald-600 rounded-full flex items-center justify-center">
              <CheckCircle className="w-16 h-16 text-white" />
            </div>
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              Đặt Hàng Thành Công!
            </h1>
            <p className="text-lg text-gray-600 mb-8">
              Cảm ơn bạn đã tin tưởng Wedding Paradise. Chúng tôi sẽ liên hệ với bạn trong vòng 24 giờ.
            </p>
            <div className="bg-gradient-to-br from-pink-50 to-rose-50 rounded-2xl p-6 mb-8 border-2 border-rose-200">
              <h3 className="font-semibold text-gray-900 mb-4">Thông Tin Đơn Hàng</h3>
              <div className="space-y-2 text-left">
                <div className="flex justify-between">
                  <span className="text-gray-600">Mã đơn hàng:</span>
                  <span className="font-semibold text-gray-900">WP{Date.now()}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Tổng tiền:</span>
                  <span className="font-semibold text-gray-900">
                    {new Intl.NumberFormat('vi-VN').format(subtotal * 1.1)} VNĐ
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Email:</span>
                  <span className="font-semibold text-gray-900">{customerInfo.email}</span>
                </div>
              </div>
            </div>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button
                onClick={() => {
                  clearCart();
                  router.push('/');
                }}
                className="px-8 py-4 bg-gradient-to-r from-rose-500 to-pink-600 text-white font-semibold rounded-full hover:shadow-xl hover:scale-105 transition-all duration-300"
              >
                Về Trang Chủ
              </button>
              <button
                onClick={() => router.push('/products')}
                className="px-8 py-4 bg-white text-rose-600 font-semibold rounded-full border-2 border-rose-300 hover:bg-rose-50 transition-all duration-300"
              >
                Tiếp Tục Mua Sắm
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-white via-pink-50/30 to-white py-30">
      <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <button
            onClick={() => {
              if (step === 'info') setStep('cart');
              else if (step === 'payment') setStep('info');
              else router.back();
            }}
            className="inline-flex items-center gap-2 text-gray-600 hover:text-rose-600 transition-colors font-medium mb-4"
          >
            <ArrowLeft className="w-5 h-5" />
            Quay lại
          </button>

          <h1 className="text-4xl font-bold text-gray-900 mb-2">
            {step === 'cart' && 'Giỏ Hàng'}
            {step === 'info' && 'Thông Tin Khách Hàng'}
            {step === 'payment' && 'Thanh Toán'}
          </h1>

          {/* Progress Steps */}
          <div className="flex items-center gap-4 mt-6">
            {['cart', 'info', 'payment'].map((s, idx) => (
              <div key={s} className="flex items-center gap-4">
                <div className={`flex items-center gap-2 ${
                  step === s ? 'text-rose-600' : 
                  ['cart', 'info', 'payment'].indexOf(step) > idx ? 'text-green-600' : 'text-gray-400'
                }`}>
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center font-semibold ${
                    step === s ? 'bg-gradient-to-r from-rose-500 to-pink-600 text-white' :
                    ['cart', 'info', 'payment'].indexOf(step) > idx ? 'bg-green-500 text-white' : 'bg-gray-200'
                  }`}>
                    {['cart', 'info', 'payment'].indexOf(step) > idx ? '✓' : idx + 1}
                  </div>
                  <span className="font-medium hidden sm:inline">
                    {s === 'cart' && 'Giỏ hàng'}
                    {s === 'info' && 'Thông tin'}
                    {s === 'payment' && 'Thanh toán'}
                  </span>
                </div>
                {idx < 2 && (
                  <div className={`w-12 h-1 rounded ${
                    ['cart', 'info', 'payment'].indexOf(step) > idx ? 'bg-green-500' : 'bg-gray-200'
                  }`} />
                )}
              </div>
            ))}
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Cart Step */}
            {step === 'cart' && (
              <>
                <div className="space-y-4">
                  {items.map((item) => (
                    <CartItem
                      key={`${item.type}-${item.id}`}
                      item={item}
                      onUpdateQuantity={(qty) => updateQuantity(item.id, item.type, qty)}
                      onRemove={() => removeItem(item.id, item.type)}
                    />
                  ))}
                </div>

                <button
                  onClick={handleContinueToInfo}
                  className="w-full py-4 bg-gradient-to-r from-rose-500 to-pink-600 text-white font-semibold rounded-xl hover:shadow-xl hover:scale-105 transition-all duration-300"
                >
                  Tiếp Tục
                </button>
              </>
            )}

            {/* Info Step */}
            {step === 'info' && (
              <>
                <CustomerInfoForm
                  data={customerInfo}
                  onChange={setCustomerInfo}
                  errors={errors}
                />

                <button
                  onClick={handleContinueToPayment}
                  className="w-full py-4 bg-gradient-to-r from-rose-500 to-pink-600 text-white font-semibold rounded-xl hover:shadow-xl hover:scale-105 transition-all duration-300"
                >
                  Tiếp Tục Thanh Toán
                </button>
              </>
            )}

            {/* Payment Step */}
            {step === 'payment' && (
              <>
                <PaymentMethodSelector
                  selected={paymentMethod}
                  onChange={setPaymentMethod}
                />

                {/* Terms */}
                <div className="bg-white rounded-2xl p-6 border-2 border-rose-100">
                  <label className="flex items-start gap-3 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={agreeToTerms}
                      onChange={(e) => setAgreeToTerms(e.target.checked)}
                      className="mt-1 w-5 h-5 text-rose-600 border-2 border-rose-300 rounded focus:ring-2 focus:ring-rose-400"
                    />
                    <span className="text-sm text-gray-700 leading-relaxed">
                      Tôi đồng ý với{' '}
                      <a href="#" className="text-rose-600 hover:underline font-medium">
                        điều khoản và điều kiện
                      </a>{' '}
                      của Wedding Paradise và xác nhận rằng thông tin đã cung cấp là chính xác.
                    </span>
                  </label>
                </div>

                <button
                  onClick={handleSubmitOrder}
                  disabled={!agreeToTerms}
                  className="w-full py-4 bg-gradient-to-r from-rose-500 to-pink-600 text-white font-semibold rounded-xl hover:shadow-xl hover:scale-105 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
                >
                  Xác Nhận Đặt Hàng
                </button>
              </>
            )}
          </div>

          {/* Sidebar - Order Summary */}
          <div className="lg:col-span-1">
            <OrderSummary subtotal={subtotal} />
          </div>
        </div>
      </div>
    </div>
  );
}
