'use client';

import { useRouter } from 'next/navigation';
import { ArrowLeft, Check, X, ShoppingCart, Trash2 } from 'lucide-react';
import { useCartStore } from '../store/useCartStore';
import { useOrderStore } from '../store/useOrderStore';
import { ordersApi } from '@/src/features/api';
import PromotionInput from '../components/PromotionInput';
import CustomerInfoModal from '../components/CustomerInfoModal';

export default function OrderPage() {
  const router = useRouter();
  const { items, removeItem, clearCart } = useCartStore();
  const {
    formData,
    discountAmount,
    appliedPromotionCode,
    loading,
    error,
    success,
    showModal,
    setFormData,
    setDiscountAmount,
    setAppliedPromotionCode,
    setLoading,
    setError,
    setSuccess,
    setShowModal,
    resetForm,
    resetOrder,
  } = useOrderStore();

  const subtotal = items.reduce((total, item) => total + item.price * item.quantity, 0);
  const total = subtotal - discountAmount;

  const handlePromotionApplied = (discount: number, code: string) => {
    setDiscountAmount(discount);
    setAppliedPromotionCode(code);
  };

  const handlePromotionRemoved = () => {
    setDiscountAmount(0);
    setAppliedPromotionCode(null);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData({ [name]: value });
  };

  const handleSubmitOrder = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (items.length === 0) {
      setError('Vui lòng thêm sản phẩm vào giỏ hàng');
      return;
    }

    if (!formData.customerName || !formData.email || !formData.phone) {
      setError('Vui lòng điền đầy đủ thông tin');
      return;
    }

    try {
      setLoading(true);
      setError(null);

      const response = await ordersApi.create({
        clientName: formData.customerName,
        clientEmail: formData.email,
        clientPhone: formData.phone,
        items: items.map(item => ({
          id: item.id,
          productId: item.id,
          productName: item.name,
          productType: item.type as 'package' | 'service' | 'product' | 'menu',
          quantity: item.quantity,
          unitPrice: item.price,
          subtotal: item.price * item.quantity,
          description: item.description,
        })),
        weddingDate: formData.eventDate || new Date().toISOString().split('T')[0],
        guestCount: 100,
        venue: 'TBD',
        notes: formData.notes,
        paymentMethod: 'bank_transfer',
        promotionCode: appliedPromotionCode || undefined,
        discountAmount: discountAmount,
      });

      if (response.success) {
        setSuccess(true);
        setShowModal(false);
        clearCart();
        resetForm();
        
        setTimeout(() => {
          resetOrder();
          router.push('/');
        }, 2000);
      } else {
        setError(response.message || 'Đặt hàng thất bại');
      }
    } catch (err: any) {
      setError(err.message || 'Có lỗi xảy ra');
    } finally {
      setLoading(false);
    }
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('vi-VN').format(price);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-white via-pink-50/30 to-white">
      {/* Back Button */}
      <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8">
        <button
          onClick={() => router.back()}
          className="inline-flex items-center gap-2 text-gray-600 hover:text-rose-600 transition-colors font-medium"
        >
          <ArrowLeft className="w-5 h-5" />
          Quay lại
        </button>
      </div>

      {/* Main Content */}
      <section className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pb-20">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Left: Cart Items */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-2xl shadow-lg p-8 border-2 border-rose-100">
              <h2 className="text-3xl font-bold text-gray-900 mb-8 flex items-center gap-3">
                <ShoppingCart className="w-8 h-8 text-rose-600" />
                Giỏ Hàng
              </h2>

              {success && (
                <div className="mb-8 bg-green-50 border-2 border-green-200 rounded-xl p-6 flex items-start gap-4">
                  <Check className="w-6 h-6 text-green-600 flex-shrink-0 mt-0.5" />
                  <div>
                    <h3 className="font-semibold text-green-900 mb-1">Đặt hàng thành công!</h3>
                    <p className="text-green-700">Chúng tôi sẽ liên hệ với bạn sớm nhất. Đang chuyển hướng...</p>
                  </div>
                </div>
              )}

              {error && (
                <div className="mb-8 bg-red-50 border-2 border-red-200 rounded-xl p-6 flex items-start gap-4">
                  <X className="w-6 h-6 text-red-600 flex-shrink-0 mt-0.5" />
                  <div>
                    <h3 className="font-semibold text-red-900 mb-1">Lỗi</h3>
                    <p className="text-red-700">{error}</p>
                  </div>
                </div>
              )}

              {items.length === 0 ? (
                <div className="text-center py-16">
                  <ShoppingCart className="w-20 h-20 text-gray-300 mx-auto mb-6" />
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">Giỏ hàng trống</h3>
                  <p className="text-gray-600 mb-8">Hãy thêm sản phẩm để tiếp tục</p>
                  <button
                    onClick={() => router.push('/')}
                    className="px-8 py-3 bg-rose-600 text-white font-semibold rounded-full hover:bg-rose-700 transition"
                  >
                    Tiếp tục mua sắm
                  </button>
                </div>
              ) : (
                <div className="space-y-4">
                  {items.map((item) => (
                    <div
                      key={`${item.id}-${item.type}`}
                      className="flex items-center gap-4 p-6 bg-gray-50 rounded-xl border-2 border-gray-200 hover:border-rose-300 transition"
                    >
                      {item.image && (
                        <img
                          src={item.image}
                          alt={item.name}
                          className="w-24 h-24 object-cover rounded-lg flex-shrink-0"
                        />
                      )}
                      <div className="flex-1">
                        <h3 className="font-semibold text-gray-900 text-lg">{item.name}</h3>
                        <p className="text-sm text-gray-600 mb-2">{item.type}</p>
                        <div className="flex items-center gap-4">
                          <span className="text-rose-600 font-bold text-lg">
                            {formatPrice(item.price * item.quantity)} {item.currency}
                          </span>
                          <span className="text-gray-600">x{item.quantity}</span>
                        </div>
                      </div>
                      <button
                        type="button"
                        onClick={() => removeItem(item.id, item.type)}
                        className="p-3 text-red-600 hover:bg-red-50 rounded-lg transition flex-shrink-0"
                      >
                        <Trash2 className="w-5 h-5" />
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Right: Order Form */}
          <div className="lg:col-span-1">
            <div className="space-y-6">

              {/* Promotion Input */}
              {items.length > 0 && (
                <PromotionInput
                  subtotal={subtotal}
                  onPromotionApplied={handlePromotionApplied}
                  onPromotionRemoved={handlePromotionRemoved}
                />
              )}

              {/* Order Summary */}
              <div className="bg-gradient-to-br from-pink-50 to-rose-50 rounded-2xl shadow-lg p-8 border-2 border-rose-200">
                <h3 className="text-xl font-bold text-gray-900 mb-6">Tóm Tắt Đơn Hàng</h3>

                <div className="space-y-3 mb-6 pb-6 border-b border-rose-200">
                  <div className="flex justify-between text-gray-700">
                    <span>Số sản phẩm:</span>
                    <span className="font-semibold">{items.length}</span>
                  </div>
                  <div className="flex justify-between text-gray-700">
                    <span>Tổng số lượng:</span>
                    <span className="font-semibold">{items.reduce((sum, item) => sum + item.quantity, 0)}</span>
                  </div>
                  <div className="flex justify-between text-gray-700">
                    <span>Tổng tiền:</span>
                    <span className="font-semibold">{formatPrice(subtotal)} VNĐ</span>
                  </div>
                  {discountAmount > 0 && (
                    <div className="flex justify-between text-green-600">
                      <span>Giảm giá:</span>
                      <span className="font-semibold">-{formatPrice(discountAmount)} VNĐ</span>
                    </div>
                  )}
                  <div className="flex justify-between text-lg font-bold text-gray-900 pt-3 border-t border-rose-200">
                    <span>Thành tiền:</span>
                    <span className="bg-gradient-to-r from-rose-600 to-pink-600 bg-clip-text text-transparent">
                      {formatPrice(total)} VNĐ
                    </span>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => setShowModal(true)}
                  disabled={items.length === 0}
                  className="w-full px-6 py-4 bg-gradient-to-r from-rose-500 to-pink-600 text-white font-semibold rounded-full hover:shadow-xl hover:scale-105 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Đặt Hàng Ngay
                </button>

                <button
                  type="button"
                  onClick={() => router.push('/')}
                  className="w-full mt-3 px-6 py-3 bg-white text-rose-600 font-semibold rounded-full border-2 border-rose-300 hover:bg-rose-50 transition"
                >
                  Tiếp tục mua sắm
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Customer Info Modal */}
      <CustomerInfoModal
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        formData={formData}
        onFormChange={handleInputChange}
        onSubmit={handleSubmitOrder}
        loading={loading}
      />
    </div>
  );
}
