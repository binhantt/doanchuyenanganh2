'use client';

import { Calendar, Mail, MapPin, Phone, User, Users } from 'lucide-react';
import { CustomerInfo } from '../types';

interface CustomerInfoFormProps {
  data: CustomerInfo;
  onChange: (data: CustomerInfo) => void;
  errors?: Partial<Record<keyof CustomerInfo, string>>;
}

export default function CustomerInfoForm({ data, onChange, errors }: CustomerInfoFormProps) {
  const handleChange = (field: keyof CustomerInfo, value: string | number) => {
    onChange({ ...data, [field]: value });
  };

  return (
    <div className="bg-white rounded-2xl p-8 border-2 border-rose-100">
      <h3 className="text-2xl font-bold text-gray-900 mb-6">Thông Tin Khách Hàng</h3>

      <div className="grid md:grid-cols-2 gap-6">
        {/* Full Name */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Họ và tên <span className="text-red-500">*</span>
          </label>
          <div className="relative">
            <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              value={data.fullName}
              onChange={(e) => handleChange('fullName', e.target.value)}
              placeholder="Nguyễn Văn A"
              className={`w-full pl-10 pr-4 py-3 border-2 rounded-xl focus:outline-none transition-colors ${
                errors?.fullName
                  ? 'border-red-300 focus:border-red-400'
                  : 'border-rose-200 focus:border-rose-400'
              }`}
            />
          </div>
          {errors?.fullName && (
            <p className="mt-1 text-sm text-red-600">{errors.fullName}</p>
          )}
        </div>

        {/* Email */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Email <span className="text-red-500">*</span>
          </label>
          <div className="relative">
            <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="email"
              value={data.email}
              onChange={(e) => handleChange('email', e.target.value)}
              placeholder="email@example.com"
              className={`w-full pl-10 pr-4 py-3 border-2 rounded-xl focus:outline-none transition-colors ${
                errors?.email
                  ? 'border-red-300 focus:border-red-400'
                  : 'border-rose-200 focus:border-rose-400'
              }`}
            />
          </div>
          {errors?.email && (
            <p className="mt-1 text-sm text-red-600">{errors.email}</p>
          )}
        </div>

        {/* Phone */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Số điện thoại <span className="text-red-500">*</span>
          </label>
          <div className="relative">
            <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="tel"
              value={data.phone}
              onChange={(e) => handleChange('phone', e.target.value)}
              placeholder="0912345678"
              className={`w-full pl-10 pr-4 py-3 border-2 rounded-xl focus:outline-none transition-colors ${
                errors?.phone
                  ? 'border-red-300 focus:border-red-400'
                  : 'border-rose-200 focus:border-rose-400'
              }`}
            />
          </div>
          {errors?.phone && (
            <p className="mt-1 text-sm text-red-600">{errors.phone}</p>
          )}
        </div>

        {/* Wedding Date */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Ngày cưới dự kiến <span className="text-red-500">*</span>
          </label>
          <div className="relative">
            <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="date"
              value={data.weddingDate}
              onChange={(e) => handleChange('weddingDate', e.target.value)}
              min={new Date().toISOString().split('T')[0]}
              className={`w-full pl-10 pr-4 py-3 border-2 rounded-xl focus:outline-none transition-colors ${
                errors?.weddingDate
                  ? 'border-red-300 focus:border-red-400'
                  : 'border-rose-200 focus:border-rose-400'
              }`}
            />
          </div>
          {errors?.weddingDate && (
            <p className="mt-1 text-sm text-red-600">{errors.weddingDate}</p>
          )}
        </div>

        {/* Guest Count */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Số lượng khách (dự kiến)
          </label>
          <div className="relative">
            <Users className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="number"
              value={data.guestCount || ''}
              onChange={(e) => handleChange('guestCount', parseInt(e.target.value) || 0)}
              placeholder="100"
              min="1"
              className="w-full pl-10 pr-4 py-3 border-2 border-rose-200 rounded-xl focus:border-rose-400 focus:outline-none"
            />
          </div>
        </div>

        {/* Venue */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Địa điểm tổ chức
          </label>
          <div className="relative">
            <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              value={data.venue || ''}
              onChange={(e) => handleChange('venue', e.target.value)}
              placeholder="Nhà hàng ABC, Hà Nội"
              className="w-full pl-10 pr-4 py-3 border-2 border-rose-200 rounded-xl focus:border-rose-400 focus:outline-none"
            />
          </div>
        </div>
      </div>

      {/* Notes */}
      <div className="mt-6">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Ghi chú thêm
        </label>
        <textarea
          value={data.notes || ''}
          onChange={(e) => handleChange('notes', e.target.value)}
          placeholder="Yêu cầu đặc biệt, thời gian liên hệ..."
          rows={4}
          className="w-full px-4 py-3 border-2 border-rose-200 rounded-xl focus:border-rose-400 focus:outline-none resize-none"
        />
      </div>
    </div>
  );
}
