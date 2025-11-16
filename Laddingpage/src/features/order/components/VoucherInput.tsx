'use client';

import { useState } from 'react';
import { Tag, X } from 'lucide-react';
import { vouchersApi } from '@/src/features/api';

interface VoucherInputProps {
  subtotal: number;
  onVoucherApplied: (discountAmount: number, voucherCode: string) => void;
  onVoucherRemoved: () => void;
}

export default function VoucherInput({
  subtotal,
  onVoucherApplied,
  onVoucherRemoved,
}: VoucherInputProps) {
  const [voucherCode, setVoucherCode] = useState('');
  const [appliedVoucher, setAppliedVoucher] = useState<string | null>(null);
  const [discountAmount, setDiscountAmount] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleApplyVoucher = async () => {
    if (!voucherCode.trim()) {
      setError('Vui lòng nhập mã voucher');
      return;
    }

    try {
      setLoading(true);
      setError(null);

      const response = await vouchersApi.validate({
        code: voucherCode.toUpperCase(),
        orderAmount: subtotal,
      });

      if (response.success && response.data?.valid) {
        const discount = response.data.discountAmount;
        setDiscountAmount(discount);
        setAppliedVoucher(voucherCode.toUpperCase());
        onVoucherApplied(discount, voucherCode.toUpperCase());
      } else {
        setError(response.data?.message || 'Mã voucher không hợp lệ');
        setDiscountAmount(0);
        setAppliedVoucher(null);
      }
    } catch (err: any) {
      setError('Lỗi khi kiểm tra voucher');
      setDiscountAmount(0);
      setAppliedVoucher(null);
    } finally {
      setLoading(false);
    }
  };

  const handleRemoveVoucher = () => {
    setVoucherCode('');
    setDiscountAmount(0);
    setAppliedVoucher(null);
    setError(null);
    onVoucherRemoved();
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

      {appliedVoucher ? (
        <div className="bg-gradient-to-r from-green-50 to-emerald-50 border-2 border-green-300 rounded-xl p-4 flex items-center justify-between">
          <div>
            <p className="font-bold text-green-900 text-lg">{appliedVoucher}</p>
            <p className="text-sm text-green-700 mt-1">
              Giảm <span className="font-semibold">{formatPrice(discountAmount)} VNĐ</span>
            </p>
          </div>
          <button
            type="button"
            onClick={handleRemoveVoucher}
            className="p-2 bg-red-100 text-red-600 rounded-lg hover:bg-red-200 transition font-semibold flex items-center gap-1"
          >
            <X className="w-4 h-4" />
            Xóa
          </button>
        </div>
      ) : (
        <div className="space-y-3">
          <div className="flex gap-2">
            <input
              type="text"
              value={voucherCode}
              onChange={(e) => {
                setVoucherCode(e.target.value.toUpperCase());
                setError(null);
              }}
              onKeyPress={(e) => {
                if (e.key === 'Enter') {
                  handleApplyVoucher();
                }
              }}
              placeholder="Nhập mã giảm giá (VD: WEDDING10)"
              className="flex-1 px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-rose-500 focus:outline-none transition text-sm"
            />
            <button
              type="button"
              onClick={handleApplyVoucher}
              disabled={loading || !voucherCode.trim()}
              className="px-6 py-3 bg-gradient-to-r from-rose-500 to-pink-600 text-white rounded-lg hover:shadow-lg transition font-semibold disabled:opacity-50 disabled:cursor-not-allowed whitespace-nowrap"
            >
              {loading ? 'Kiểm tra...' : 'Áp dụng'}
            </button>
          </div>
          {error && (
            <div className="bg-red-50 border-l-4 border-red-500 p-3 rounded">
              <p className="text-sm text-red-700">{error}</p>
            </div>
          )}
          <p className="text-xs text-gray-500">
            💡 Gợi ý: Thử các mã như WEDDING10, SAVE15, SPECIAL20
          </p>
        </div>
      )}
    </div>
  );
}
