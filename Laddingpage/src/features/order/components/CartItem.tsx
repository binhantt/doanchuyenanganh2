'use client';

import Image from 'next/image';
import { Minus, Plus, Trash2 } from 'lucide-react';
import { OrderItem } from '../types';

interface CartItemProps {
  item: OrderItem;
  onUpdateQuantity: (quantity: number) => void;
  onRemove: () => void;
}

export default function CartItem({ item, onUpdateQuantity, onRemove }: CartItemProps) {
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('vi-VN').format(price);
  };

  return (
    <div className="flex gap-4 p-4 bg-white rounded-xl border-2 border-rose-100 hover:border-rose-300 transition-colors">
      {/* Image */}
      {item.image && (
        <div className="relative w-24 h-24 flex-shrink-0 rounded-lg overflow-hidden">
          <Image
            src={item.image}
            alt={item.name}
            fill
            className="object-cover"
          />
        </div>
      )}

      {/* Info */}
      <div className="flex-1 min-w-0">
        <div className="flex items-start justify-between gap-4">
          <div className="flex-1">
            <h3 className="font-semibold text-gray-900 mb-1">{item.name}</h3>
            {item.description && (
              <p className="text-sm text-gray-600 line-clamp-2">{item.description}</p>
            )}
            <div className="mt-2">
              <span className="inline-flex items-center px-2 py-1 bg-rose-100 text-rose-600 text-xs font-medium rounded">
                {item.type === 'package' ? 'Gói dịch vụ' : 'Sản phẩm'}
              </span>
            </div>
          </div>

          {/* Remove Button */}
          <button
            onClick={onRemove}
            className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
            aria-label="Xóa"
          >
            <Trash2 className="w-5 h-5" />
          </button>
        </div>

        {/* Price and Quantity */}
        <div className="flex items-center justify-between mt-4">
          {/* Quantity Controls */}
          <div className="flex items-center gap-2">
            <button
              onClick={() => onUpdateQuantity(item.quantity - 1)}
              className="p-1.5 rounded-lg border-2 border-rose-200 hover:border-rose-400 hover:bg-rose-50 transition-colors"
              aria-label="Giảm số lượng"
            >
              <Minus className="w-4 h-4 text-rose-600" />
            </button>
            <span className="w-12 text-center font-semibold text-gray-900">
              {item.quantity}
            </span>
            <button
              onClick={() => onUpdateQuantity(item.quantity + 1)}
              className="p-1.5 rounded-lg border-2 border-rose-200 hover:border-rose-400 hover:bg-rose-50 transition-colors"
              aria-label="Tăng số lượng"
            >
              <Plus className="w-4 h-4 text-rose-600" />
            </button>
          </div>

          {/* Price */}
          <div className="text-right">
            <div className="text-lg font-bold bg-gradient-to-r from-rose-600 to-pink-600 bg-clip-text text-transparent">
              {formatPrice(item.price * item.quantity)} {item.currency || 'VNĐ'}
            </div>
            {item.quantity > 1 && (
              <div className="text-xs text-gray-500">
                {formatPrice(item.price)} x {item.quantity}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
