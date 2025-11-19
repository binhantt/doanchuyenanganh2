'use client';

import { X, User, Mail, Phone, Calendar, MessageSquare, Sparkles } from 'lucide-react';

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
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4 animate-in fade-in duration-200">
      <div className="bg-white rounded-3xl shadow-2xl max-w-lg w-full max-h-[90vh] overflow-hidden animate-in zoom-in-95 duration-300">
        {/* Decorative Header */}
        <div className="relative bg-gradient-to-br from-rose-500 via-pink-500 to-rose-600 px-8 py-6 overflow-hidden">
          {/* Decorative circles */}
          <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/2"></div>
          <div className="absolute bottom-0 left-0 w-24 h-24 bg-white/10 rounded-full translate-y-1/2 -translate-x-1/2"></div>
          
          <div className="relative flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-white/20 rounded-xl backdrop-blur-sm">
                <Sparkles className="w-6 h-6 text-white" />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-white">Thông Tin Đặt Hàng</h2>
                <p className="text-rose-50 text-sm mt-0.5">Vui lòng điền đầy đủ thông tin</p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="p-2 hover:bg-white/20 rounded-xl transition-all duration-200 group"
            >
              <X className="w-5 h-5 text-white group-hover:rotate-90 transition-transform duration-200" />
            </button>
          </div>
        </div>

        {/* Form */}
        <form onSubmit={onSubmit} className="p-8 space-y-5 overflow-y-auto max-h-[calc(90vh-120px)]">
          {/* Name Field */}
          <div className="group">
            <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-2">
              <User className="w-4 h-4 text-rose-500" />
              Tên khách hàng <span className="text-rose-500">*</span>
            </label>
            <input
              type="text"
              name="customerName"
              value={formData.customerName}
              onChange={onFormChange}
              placeholder="Nhập tên của bạn"
              className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-rose-500 focus:ring-4 focus:ring-rose-100 focus:outline-none transition-all duration-200 text-sm placeholder:text-gray-400"
              required
            />
          </div>

          {/* Email Field */}
          <div className="group">
            <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-2">
              <Mail className="w-4 h-4 text-rose-500" />
              Email <span className="text-rose-500">*</span>
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={onFormChange}
              placeholder="example@email.com"
              className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-rose-500 focus:ring-4 focus:ring-rose-100 focus:outline-none transition-all duration-200 text-sm placeholder:text-gray-400"
              required
            />
          </div>

          {/* Phone Field */}
          <div className="group">
            <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-2">
              <Phone className="w-4 h-4 text-rose-500" />
              Số điện thoại <span className="text-rose-500">*</span>
            </label>
            <input
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={onFormChange}
              placeholder="0123 456 789"
              className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-rose-500 focus:ring-4 focus:ring-rose-100 focus:outline-none transition-all duration-200 text-sm placeholder:text-gray-400"
              required
            />
          </div>

          {/* Event Date Field */}
          <div className="group">
            <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-2">
              <Calendar className="w-4 h-4 text-rose-500" />
              Ngày sự kiện
            </label>
            <input
              type="date"
              name="eventDate"
              value={formData.eventDate}
              onChange={onFormChange}
              className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-rose-500 focus:ring-4 focus:ring-rose-100 focus:outline-none transition-all duration-200 text-sm"
            />
          </div>

          {/* Notes Field */}
          <div className="group">
            <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-2">
              <MessageSquare className="w-4 h-4 text-rose-500" />
              Ghi chú
            </label>
            <textarea
              name="notes"
              value={formData.notes}
              onChange={onFormChange}
              placeholder="Thêm ghi chú về đơn hàng của bạn..."
              className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-rose-500 focus:ring-4 focus:ring-rose-100 focus:outline-none transition-all duration-200 text-sm resize-none placeholder:text-gray-400"
              rows={4}
            />
          </div>

          {/* Info Box */}
          <div className="bg-gradient-to-r from-rose-50 to-pink-50 border border-rose-200 rounded-xl p-4">
            <p className="text-xs text-gray-600 leading-relaxed">
              💝 Chúng tôi sẽ liên hệ với bạn trong vòng 24h để xác nhận đơn hàng và tư vấn chi tiết.
            </p>
          </div>

          {/* Buttons */}
          <div className="flex gap-3 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 px-6 py-3.5 bg-gray-100 text-gray-700 rounded-xl hover:bg-gray-200 transition-all duration-200 font-semibold text-sm border-2 border-transparent hover:border-gray-300"
            >
              Hủy
            </button>
            <button
              type="submit"
              disabled={loading}
              className="flex-1 px-6 py-3.5 bg-gradient-to-r from-rose-500 to-pink-600 text-white rounded-xl hover:shadow-xl hover:shadow-rose-200 hover:-translate-y-0.5 transition-all duration-200 font-semibold disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:translate-y-0 disabled:hover:shadow-none text-sm"
            >
              {loading ? (
                <span className="flex items-center justify-center gap-2">
                  <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                  </svg>
                  Đang xử lý...
                </span>
              ) : (
                'Xác Nhận Đặt Hàng'
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
