'use client';

import { useState } from 'react';
import { ShoppingCart, X, Trash2, Plus, Minus } from 'lucide-react';
import { useCartStore } from '../store/useCartStore';
import Link from 'next/link';

export default function CartSidebar() {
  const [isOpen, setIsOpen] = useState(false);
  const { items, removeItem, updateQuantity, getTotalItems, getSubtotal } = useCartStore();

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('vi-VN').format(price);
  };

  const totalItems = getTotalItems();
  const subtotal = getSubtotal();

  return (
    <>
      {/* Cart Button */}
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-8 right-8 z-40 flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-rose-500 to-pink-600 text-white font-semibold rounded-full shadow-lg hover:shadow-xl hover:scale-110 transition-all duration-300"
      >
        <ShoppingCart className="w-5 h-5" />
        <span className="bg-white text-rose-600 px-2 py-1 rounded-full text-sm font-bold">
          {totalItems}
        </span>
      </button>

      {/* Sidebar Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 transition-opacity"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Sidebar */}
      <div
        className={`fixed right-0 top-0 h-screen w-full max-w-md bg-white shadow-2xl z-50 transform transition-transform duration-300 overflow-y-auto ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        {/* Header */}
        <div className="sticky top-0 bg-gradient-to-r from-rose-500 to-pink-600 text-white p-6 flex items-center justify-between">
          <h2 className="text-2xl font-bold flex items-center gap-2">
            <ShoppingCart className="w-6 h-6" />
            Giỏ Hàng
          </h2>
          <button
            onClick={() => setIsOpen(false)}
            className="p-2 hover:bg-white/20 rounded-lg transition"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6">
          {items.length === 0 ? (
            <div className="text-center py-12">
              <ShoppingCart className="w-16 h-16 text-gray-300 mx-auto mb-4" />
              <p className="text-gray-600 text-lg mb-4">Giỏ hàng trống</p>
              <Link
                href="/"
                onClick={() => setIsOpen(false)}
                className="inline-block px-6 py-2 bg-rose-600 text-white rounded-full hover:bg-rose-700 transition"
              >
                Tiếp tục mua sắm
              </Link>
            </div>
          ) : (
            <>
              {/* Items List */}
              <div className="space-y-4">
                {items.map((item) => (
                  <div
                    key={`${item.id}-${item.type}`}
                    className="flex gap-4 p-4 bg-gray-50 rounded-xl border border-gray-200 hover:border-rose-300 transition"
                  >
                    {item.image && (
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-16 h-16 object-cover rounded-lg flex-shrink-0"
                      />
                    )}
                    <div className="flex-1 min-w-0">
                      <h3 className="font-semibold text-gray-900 truncate">{item.name}</h3>
                      <p className="text-xs text-gray-600 mb-2">{item.type}</p>
                      <p className="text-rose-600 font-semibold">
                        {formatPrice(item.price * item.quantity)} {item.currency}
                      </p>
                      
                      {/* Quantity Controls */}
                      <div className="flex items-center gap-2 mt-2">
                        <button
                          onClick={() => updateQuantity(item.id, item.type, item.quantity - 1)}
                          className="p-1 hover:bg-gray-200 rounded transition"
                        >
                          <Minus className="w-4 h-4 text-gray-600" />
                        </button>
                        <span className="text-sm font-semibold text-gray-700 w-6 text-center">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => updateQuantity(item.id, item.type, item.quantity + 1)}
                          className="p-1 hover:bg-gray-200 rounded transition"
                        >
                          <Plus className="w-4 h-4 text-gray-600" />
                        </button>
                      </div>
                    </div>
                    <button
                      onClick={() => removeItem(item.id, item.type)}
                      className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition flex-shrink-0"
                    >
                      <Trash2 className="w-5 h-5" />
                    </button>
                  </div>
                ))}
              </div>

              {/* Divider */}
              <div className="border-t border-gray-200" />

              {/* Summary */}
              <div className="space-y-3">
                <div className="flex justify-between text-gray-700">
                  <span>Số lượng:</span>
                  <span className="font-semibold">{totalItems}</span>
                </div>
                <div className="flex justify-between text-lg font-bold text-gray-900">
                  <span>Tổng cộng:</span>
                  <span className="bg-gradient-to-r from-rose-600 to-pink-600 bg-clip-text text-transparent">
                    {formatPrice(subtotal)} VNĐ
                  </span>
                </div>
              </div>

              {/* CTA Buttons */}
              <div className="space-y-3 pt-4">
                <Link
                  href="/order"
                  onClick={() => setIsOpen(false)}
                  className="block w-full px-6 py-3 bg-gradient-to-r from-rose-500 to-pink-600 text-white font-semibold rounded-full text-center hover:shadow-lg hover:scale-105 transition-all duration-300"
                >
                  Thanh Toán
                </Link>
                <button
                  onClick={() => setIsOpen(false)}
                  className="w-full px-6 py-3 bg-gray-100 text-gray-900 font-semibold rounded-full hover:bg-gray-200 transition"
                >
                  Tiếp tục mua sắm
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </>
  );
}
