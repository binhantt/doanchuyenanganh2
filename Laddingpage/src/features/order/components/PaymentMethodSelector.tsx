'use client';

import { Building2, Wallet, Banknote, Check } from 'lucide-react';
import { paymentMethods, bankInfo } from '../data/paymentMethods';

interface PaymentMethodSelectorProps {
  selected: string;
  onChange: (methodId: string) => void;
}

const iconMap: Record<string, any> = {
  'building-columns': Building2,
  'wallet': Wallet,
  'banknote': Banknote,
};

export default function PaymentMethodSelector({ selected, onChange }: PaymentMethodSelectorProps) {
  return (
    <div className="bg-white rounded-2xl p-8 border-2 border-rose-100">
      <h3 className="text-2xl font-bold text-gray-900 mb-6">Phương Thức Thanh Toán</h3>

      <div className="grid md:grid-cols-2 gap-4 mb-6">
        {paymentMethods.map((method) => {
          const Icon = iconMap[method.icon] || Wallet;
          const isSelected = selected === method.id;

          return (
            <button
              key={method.id}
              onClick={() => onChange(method.id)}
              className={`relative p-6 rounded-xl border-2 text-left transition-all ${
                isSelected
                  ? 'border-rose-400 bg-gradient-to-br from-pink-50 to-rose-50 shadow-lg'
                  : 'border-rose-200 hover:border-rose-300 hover:bg-rose-50'
              }`}
            >
              {isSelected && (
                <div className="absolute top-4 right-4 w-6 h-6 bg-gradient-to-r from-rose-500 to-pink-600 rounded-full flex items-center justify-center">
                  <Check className="w-4 h-4 text-white" strokeWidth={3} />
                </div>
              )}

              <div className="flex items-start gap-4">
                <div className={`p-3 rounded-lg ${
                  isSelected ? 'bg-gradient-to-r from-rose-500 to-pink-600' : 'bg-rose-100'
                }`}>
                  <Icon className={`w-6 h-6 ${isSelected ? 'text-white' : 'text-rose-600'}`} />
                </div>

                <div className="flex-1">
                  <h4 className="font-semibold text-gray-900 mb-1">{method.name}</h4>
                  <p className="text-sm text-gray-600">{method.description}</p>
                </div>
              </div>
            </button>
          );
        })}
      </div>

      {/* Bank Transfer Info */}
      {selected === 'bank-transfer' && (
        <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl p-6 border-2 border-blue-200">
          <h4 className="font-semibold text-gray-900 mb-4 flex items-center gap-2">
            <Building2 className="w-5 h-5 text-blue-600" />
            Thông Tin Chuyển Khoản
          </h4>
          <div className="space-y-3">
            <div className="flex justify-between">
              <span className="text-gray-600">Ngân hàng:</span>
              <span className="font-semibold text-gray-900">{bankInfo.bankName}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Số tài khoản:</span>
              <span className="font-semibold text-gray-900 font-mono">{bankInfo.accountNumber}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Chủ tài khoản:</span>
              <span className="font-semibold text-gray-900">{bankInfo.accountName}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Chi nhánh:</span>
              <span className="font-semibold text-gray-900">{bankInfo.branch}</span>
            </div>
          </div>
          <div className="mt-4 p-3 bg-white rounded-lg border border-blue-200">
            <p className="text-sm text-gray-600">
              <strong className="text-gray-900">Nội dung chuyển khoản:</strong> 
              {' '}[Họ tên] - [Số điện thoại] - Dat coc tiec cuoi
            </p>
          </div>
        </div>
      )}

      {/* MoMo/ZaloPay Info */}
      {(selected === 'momo' || selected === 'zalopay') && (
        <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-xl p-6 border-2 border-purple-200">
          <p className="text-sm text-gray-700 leading-relaxed">
            Sau khi xác nhận đơn hàng, chúng tôi sẽ gửi link thanh toán qua {selected === 'momo' ? 'MoMo' : 'ZaloPay'} 
            đến số điện thoại của bạn. Vui lòng kiểm tra tin nhắn và hoàn tất thanh toán trong vòng 24 giờ.
          </p>
        </div>
      )}

      {/* Cash Info */}
      {selected === 'cash' && (
        <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl p-6 border-2 border-green-200">
          <p className="text-sm text-gray-700 leading-relaxed">
            Bạn có thể thanh toán bằng tiền mặt khi gặp mặt tư vấn hoặc ký hợp đồng. 
            Chúng tôi sẽ liên hệ để sắp xếp lịch hẹn phù hợp.
          </p>
        </div>
      )}
    </div>
  );
}
