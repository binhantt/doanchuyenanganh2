'use client';

import { X } from 'lucide-react';

interface CustomerInfoModalProps {
  isOpen: boolean;
  onClose: () => void;
  formData: {
    customerName: string;
    email: string;
    phone: string;
    eventDate: string;
    notes: string;
  };
  onFormChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  onSubmit: (e: React.FormEvent) => void;
  loading: boolean;
}

export default function CustomerInfoModal({
  isOpen,
  onClose,
  formData,
  onFormChange,
  onSubmit,
  loading,
}: CustomerInfoModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="sticky top-0 bg-gradient-to-r from-rose-500 to-pink-600 px-6 py-4 flex items-center justify-between">
          <h2 className="text-xl font-bold text-white">Thông Tin Khách Hàng</h2>
          <button
            onClick={onClose}
            className="p-1 hover:bg-white/20 rounded transition"
          >
            <X className="w-5 h-5 text-white" />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={onSubmit} className="p-6 space-y-4">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Tên khách hàng *
            </label>
            <input
              type="text"
              name="customerName"
              value={formData.customerName}
              onChange={onFormChange}
              placeholder="Nhập tên của bạn"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:border-rose-500 focus:outline-none transition text-sm"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Email *
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={onFormChange}
              placeholder="Nhập email"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:border-rose-500 focus:outline-none transition text-sm"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Số điện thoại *
            </label>
            <input
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={onFormChange}
              placeholder="Nhập số điện thoại"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:border-rose-500 focus:outline-none transition text-sm"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Ngày sự kiện
            </label>
            <input
              type="date"
              name="eventDate"
              value={formData.eventDate}
              onChange={onFormChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:border-rose-500 focus:outline-none transition text-sm"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Ghi chú
            </label>
            <textarea
              name="notes"
              value={formData.notes}
              onChange={onFormChange}
              placeholder="Ghi chú thêm..."
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:border-rose-500 focus:outline-none transition text-sm resize-none"
              rows={3}
            />
          </div>

          {/* Buttons */}
          <div className="flex gap-3 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 px-4 py-2 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300 transition font-semibold text-sm"
            >
              Hủy
            </button>
            <button
              type="submit"
              disabled={loading}
              className="flex-1 px-4 py-2 bg-gradient-to-r from-rose-500 to-pink-600 text-white rounded-lg hover:shadow-lg transition font-semibold disabled:opacity-50 disabled:cursor-not-allowed text-sm"
            >
              {loading ? 'Đang xử lý...' : 'Đặt Hàng'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
