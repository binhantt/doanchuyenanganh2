'use client';

import { useState } from 'react';
import { Tag, X } from 'lucide-react';
import { vouchersApi } from '@/src/features/api';

interface PromotionInputProps {
  subtotal: number;
  onPromotionApplied: (discountAmount: number, promotionCode: string) => void;
  onPromotionRemoved: () => void;
  serviceId?: string;
  packageId?: string;
}

export default function PromotionInput({
  subtotal,
  onPromotionApplied,
  onPromotionRemoved,
  serviceId,
  packageId,
}: PromotionInputProps) {
  const [promotionCode, setPromotionCode] = useState('');
  const [appliedPromotion, setAppliedPromotion] = useState<string | null>(null);
  const [discountAmount, setDiscountAmount] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleApplyPromotion = async () => {
    if (!promotionCode.trim()) {
      setError('Vui lòng nhập mã giảm giá');
      return;
    }

    try {
      setLoading(true);
      setError(null);

      const response = await vouchersApi.validate({
        code: promotionCode.toUpperCase(),
        orderAmount: subtotal,
      });

      if (response.success && response.data) {
        const result = response.data;

        if (result.valid && result.voucher) {
          setDiscountAmount(result.discountAmount);
          setAppliedPromotion(promotionCode.toUpperCase());
          onPromotionApplied(result.discountAmount, promotionCode.toUpperCase());
        } else {
          setError(result.message || 'Mã giảm giá không hợp lệ');
          setDiscountAmount(0);
          setAppliedPromotion(null);
        }
      } else {
        setError('Mã giảm giá không hợp lệ');
        setDiscountAmount(0);
        setAppliedPromotion(null);
      }
    } catch (err: any) {
      const errorMessage = err.response?.data?.message || 'Lỗi khi kiểm tra mã giảm giá';
      setError(errorMessage);
      setDiscountAmount(0);
      setAppliedPromotion(null);
    } finally {
      setLoading(false);
    }
  };

  const handleRemovePromotion = () => {
    setPromotionCode('');
    setDiscountAmount(0);
    setAppliedPromotion(null);
    setError(null);
    onPromotionRemoved();
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('vi-VN').format(price);
  };

  return (
    <div className="bg-white rounded-2xl shadow-lg p-6 border-2 border-rose-100">
      <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
        <Tag className="w-5 h-5 text-rose-600" />
        Mã Giảm Giá
      </h3>

      {appliedPromotion ? (
        <div className="bg-green-50 border-2 border-green-300 rounded-xl p-4 flex items-center justify-between">
          <div>
            <p className="font-bold text-green-900">{appliedPromotion}</p>
            <p className="text-sm text-green-700">
              Giảm {formatPrice(discountAmount)} VNĐ
            </p>
          </div>
          <button
            type="button"
            onClick={handleRemovePromotion}
            className="p-2 text-red-600 hover:bg-red-100 rounded transition"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      ) : (
        <div className="space-y-3">
          <div className="flex gap-2">
            <input
              type="text"
              value={promotionCode}
              onChange={(e) => {
                setPromotionCode(e.target.value.toUpperCase());
                setError(null);
              }}
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  handleApplyPromotion();
                }
              }}
              placeholder="Nhập mã giảm giá"
              className="flex-1 px-4 py-2 border border-gray-300 rounded focus:border-rose-500 focus:outline-none text-sm uppercase"
              disabled={loading}
            />
            <button
              type="button"
              onClick={handleApplyPromotion}
              disabled={loading || !promotionCode.trim()} 
              className="px-6 py-2 bg-rose-600 text-white rounded hover:bg-rose-700 transition font-semibold disabled:opacity-50 disabled:cursor-not-allowed text-sm"
            >
              {loading ? 'Kiểm tra...' : 'Áp dụng'}
            </button>
          </div>
          {error && <p className="text-xs text-red-600">{error}</p>}
        </div>
      )}
    </div>
  );
}
