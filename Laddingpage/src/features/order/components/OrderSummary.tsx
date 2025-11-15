'use client';

import { Tag } from 'lucide-react';
import { useState } from 'react';

interface OrderSummaryProps {
  subtotal: number;
  onApplyVoucher?: (code: string) => void;
}

export default function OrderSummary({ subtotal, onApplyVoucher }: OrderSummaryProps) {
  const [voucherCode, setVoucherCode] = useState('');
  const [discount, setDiscount] = useState(0);

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('vi-VN').format(price);
  };

  const tax = subtotal * 0.1; // 10% VAT
  const total = subtotal - discount + tax;

  const handleApplyVoucher = () => {
    // Mock voucher logic
    if (voucherCode.toUpperCase() === 'WEDDING2024') {
      setDiscount(subtotal * 0.1); // 10% discount
      onApplyVoucher?.(voucherCode);
    } else if (voucherCode) {
      alert('Mã giảm giá không hợp lệ');
    }
  };

  return (
    <div className="bg-gradient-to-br from-pink-50 to-rose-50 rounded-2xl p-6 border-2 border-rose-200 sticky top-24">
      <h3 className="text-xl font-bold text-gray-900 mb-6">Tổng Đơn Hàng</h3>

      {/* Voucher Input */}
      <div className="mb-6">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Mã giảm giá
        </label>
        <div className="flex gap-2">
          <div className="relative flex-1">
            <Tag className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              value={voucherCode}
              onChange={(e) => setVoucherCode(e.target.value.toUpperCase())}
              placeholder="Nhập mã"
              className="w-full pl-10 pr-4 py-3 border-2 border-rose-200 rounded-xl focus:border-rose-400 focus:outline-none"
            />
          </div>
          <button
            onClick={handleApplyVoucher}
            className="px-6 py-3 bg-white text-rose-600 font-semibold rounded-xl border-2 border-rose-300 hover:bg-rose-50 transition-colors"
          >
            Áp dụng
          </button>
        </div>
        {discount > 0 && (
          <p className="mt-2 text-sm text-green-600 font-medium">
            ✓ Đã áp dụng mã giảm giá
          </p>
        )}
      </div>

      {/* Price Breakdown */}
      <div className="space-y-3 mb-6 pb-6 border-b-2 border-rose-200">
        <div className="flex justify-between text-gray-700">
          <span>Tạm tính</span>
          <span className="font-semibold">{formatPrice(subtotal)} VNĐ</span>
        </div>

        {discount > 0 && (
          <div className="flex justify-between text-green-600">
            <span>Giảm giá</span>
            <span className="font-semibold">-{formatPrice(discount)} VNĐ</span>
          </div>
        )}

        <div className="flex justify-between text-gray-700">
          <span>VAT (10%)</span>
          <span className="font-semibold">{formatPrice(tax)} VNĐ</span>
        </div>
      </div>

      {/* Total */}
      <div className="flex justify-between items-center mb-6">
        <span className="text-lg font-bold text-gray-900">Tổng cộng</span>
        <span className="text-2xl font-bold bg-gradient-to-r from-rose-600 to-pink-600 bg-clip-text text-transparent">
          {formatPrice(total)} VNĐ
        </span>
      </div>

      {/* Note */}
      <div className="bg-white rounded-xl p-4 border border-rose-200">
        <p className="text-xs text-gray-600 leading-relaxed">
          <strong className="text-gray-900">Lưu ý:</strong> Giá trên chưa bao gồm chi phí địa điểm tổ chức. 
          Vui lòng liên hệ để được tư vấn chi tiết.
        </p>
      </div>
    </div>
  );
}
