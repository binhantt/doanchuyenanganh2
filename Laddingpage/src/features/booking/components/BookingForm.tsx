'use client';

import { useState } from 'react';
import * as Label from '@radix-ui/react-label';
import { Calendar, User, Phone, Mail, Package, FileText, Send, CheckCircle } from 'lucide-react';
import { BookingFormData, BookingFormErrors, PackageOption } from '../types';
import { validateBookingForm, formatPrice } from '../utils/validation';
import { useConsultation } from '../../api/hooks/useConsultation';

interface BookingFormProps {
  packages: PackageOption[];
  onSubmit?: (data: BookingFormData) => void | Promise<void>;
}

export default function BookingForm({ packages, onSubmit }: BookingFormProps) {
  const { submitConsultation, loading: apiLoading, error: apiError } = useConsultation();
  
  const [formData, setFormData] = useState<BookingFormData>({
    name: '',
    email: '',
    phone: '',
    eventDate: '',
    package: '',
    notes: '',
  });

  const [errors, setErrors] = useState<BookingFormErrors>({});
  const [touched, setTouched] = useState<Record<string, boolean>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleChange = (
    field: keyof BookingFormData,
    value: string
  ) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: undefined }));
    }
  };

  const handleBlur = (field: keyof BookingFormData) => {
    setTouched((prev) => ({ ...prev, [field]: true }));
    
    // Validate single field on blur
    const fieldErrors = validateBookingForm(formData);
    if (fieldErrors[field]) {
      setErrors((prev) => ({ ...prev, [field]: fieldErrors[field] }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Mark all fields as touched
    setTouched({
      name: true,
      email: true,
      phone: true,
      eventDate: true,
      package: true,
      notes: true,
    });

    // Validate all fields
    const validationErrors = validateBookingForm(formData);
    setErrors(validationErrors);

    // If there are errors, don't submit
    if (Object.keys(validationErrors).length > 0) {
      return;
    }

    setIsSubmitting(true);

    try {
      // Get selected package info
      const selectedPkg = packages.find(pkg => pkg.id === formData.package);
      
      // Prepare data for API
      const consultationData = {
        clientName: formData.name,
        clientEmail: formData.email,
        clientPhone: formData.phone,
        weddingDate: formData.eventDate,
        guestCount: 100, // Default guest count
        venue: 'Chưa xác định', // Default venue
        serviceType: selectedPkg?.name || formData.package || 'Tư vấn chung',
        budget: selectedPkg?.price?.toString() || 'Chưa xác định',
        notes: formData.notes || 'Không có ghi chú',
      };

      // Call API
      await submitConsultation(consultationData);

      // Call custom onSubmit if provided
      if (onSubmit) {
        await onSubmit(formData);
      }

      setIsSuccess(true);
      
      // Reset form after 3 seconds
      setTimeout(() => {
        setFormData({
          name: '',
          email: '',
          phone: '',
          eventDate: '',
          package: '',
          notes: '',
        });
        setTouched({});
        setIsSuccess(false);
      }, 3000);
    } catch (error: any) {
      console.error('Error submitting form:', error);
      setErrors({ name: error.message || 'Có lỗi xảy ra. Vui lòng thử lại.' });
    } finally {
      setIsSubmitting(false);
    }
  };

  const selectedPackage = packages.find((pkg) => pkg.id === formData.package);

  if (isSuccess) {
    return (
      <div className="text-center py-12 animate-fade-in">
        <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-gradient-to-br from-green-100 to-emerald-100 mb-6">
          <CheckCircle className="w-10 h-10 text-green-600" />
        </div>
        <h3 className="text-2xl font-bold text-gray-900 mb-3">
          Gửi yêu cầu thành công!
        </h3>
        <p className="text-gray-600 max-w-md mx-auto">
          Cảm ơn bạn đã quan tâm. Chúng tôi sẽ liên hệ với bạn trong thời gian sớm nhất.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Name Field */}
      <div className="space-y-2">
        <Label.Root
          htmlFor="name"
          className="text-sm font-semibold text-gray-900 flex items-center gap-2"
        >
          <User className="w-4 h-4 text-pink-600" />
          Họ và tên <span className="text-rose-500">*</span>
        </Label.Root>
        <input
          id="name"
          type="text"
          value={formData.name}
          onChange={(e) => handleChange('name', e.target.value)}
          onBlur={() => handleBlur('name')}
          placeholder="Nguyễn Văn A"
          className={`w-full px-4 py-3 rounded-xl border-2 transition-all duration-300 focus:outline-none focus:ring-4 focus:ring-pink-300 focus:ring-offset-2 ${
            touched.name && errors.name
              ? 'border-red-300 bg-red-50'
              : 'border-pink-200 hover:border-pink-300 focus:border-pink-400'
          }`}
        />
        {touched.name && errors.name && (
          <p className="text-sm text-red-600 flex items-center gap-1">
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
              <path
                fillRule="evenodd"
                d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
                clipRule="evenodd"
              />
            </svg>
            {errors.name}
          </p>
        )}
      </div>

      {/* Email Field */}
      <div className="space-y-2">
        <Label.Root
          htmlFor="email"
          className="text-sm font-semibold text-gray-900 flex items-center gap-2"
        >
          <Mail className="w-4 h-4 text-pink-600" />
          Email <span className="text-rose-500">*</span>
        </Label.Root>
        <input
          id="email"
          type="email"
          value={formData.email}
          onChange={(e) => handleChange('email', e.target.value)}
          onBlur={() => handleBlur('email')}
          placeholder="example@email.com"
          className={`w-full px-4 py-3 rounded-xl border-2 transition-all duration-300 focus:outline-none focus:ring-4 focus:ring-pink-300 focus:ring-offset-2 ${
            touched.email && errors.email
              ? 'border-red-300 bg-red-50'
              : 'border-pink-200 hover:border-pink-300 focus:border-pink-400'
          }`}
        />
        {touched.email && errors.email && (
          <p className="text-sm text-red-600 flex items-center gap-1">
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
              <path
                fillRule="evenodd"
                d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
                clipRule="evenodd"
              />
            </svg>
            {errors.email}
          </p>
        )}
      </div>

      {/* Phone Field */}
      <div className="space-y-2">
        <Label.Root
          htmlFor="phone"
          className="text-sm font-semibold text-gray-900 flex items-center gap-2"
        >
          <Phone className="w-4 h-4 text-pink-600" />
          Số điện thoại <span className="text-rose-500">*</span>
        </Label.Root>
        <input
          id="phone"
          type="tel"
          value={formData.phone}
          onChange={(e) => handleChange('phone', e.target.value)}
          onBlur={() => handleBlur('phone')}
          placeholder="0912 345 678"
          className={`w-full px-4 py-3 rounded-xl border-2 transition-all duration-300 focus:outline-none focus:ring-4 focus:ring-pink-300 focus:ring-offset-2 ${
            touched.phone && errors.phone
              ? 'border-red-300 bg-red-50'
              : 'border-pink-200 hover:border-pink-300 focus:border-pink-400'
          }`}
        />
        {touched.phone && errors.phone && (
          <p className="text-sm text-red-600 flex items-center gap-1">
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
              <path
                fillRule="evenodd"
                d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
                clipRule="evenodd"
              />
            </svg>
            {errors.phone}
          </p>
        )}
      </div>

      {/* Event Date Field */}
      <div className="space-y-2">
        <Label.Root
          htmlFor="eventDate"
          className="text-sm font-semibold text-gray-900 flex items-center gap-2"
        >
          <Calendar className="w-4 h-4 text-pink-600" />
          Ngày tổ chức dự kiến <span className="text-rose-500">*</span>
        </Label.Root>
        <input
          id="eventDate"
          type="date"
          value={formData.eventDate}
          onChange={(e) => handleChange('eventDate', e.target.value)}
          onBlur={() => handleBlur('eventDate')}
          min={new Date().toISOString().split('T')[0]}
          className={`w-full px-4 py-3 rounded-xl border-2 transition-all duration-300 focus:outline-none focus:ring-4 focus:ring-pink-300 focus:ring-offset-2 ${
            touched.eventDate && errors.eventDate
              ? 'border-red-300 bg-red-50'
              : 'border-pink-200 hover:border-pink-300 focus:border-pink-400'
          }`}
        />
        {touched.eventDate && errors.eventDate && (
          <p className="text-sm text-red-600 flex items-center gap-1">
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
              <path
                fillRule="evenodd"
                d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
                clipRule="evenodd"
              />
            </svg>
            {errors.eventDate}
          </p>
        )}
      </div>

      {/* Package Select Field */}
      <div className="space-y-2">
        <Label.Root
          htmlFor="package"
          className="text-sm font-semibold text-gray-900 flex items-center gap-2"
        >
          <Package className="w-4 h-4 text-pink-600" />
          Gói dịch vụ <span className="text-rose-500">*</span>
        </Label.Root>
        <select
          id="package"
          value={formData.package}
          onChange={(e) => handleChange('package', e.target.value)}
          onBlur={() => handleBlur('package')}
          className={`w-full px-4 py-3 rounded-xl border-2 transition-all duration-300 focus:outline-none focus:ring-4 focus:ring-pink-300 focus:ring-offset-2 ${
            touched.package && errors.package
              ? 'border-red-300 bg-red-50'
              : 'border-pink-200 hover:border-pink-300 focus:border-pink-400'
          }`}
        >
          <option value="">Chọn gói dịch vụ</option>
          {packages.map((pkg) => (
            <option key={pkg.id} value={pkg.id}>
              {pkg.name}
              {pkg.price && ` - ${formatPrice(pkg.price)} VNĐ`}
            </option>
          ))}
        </select>
        {touched.package && errors.package && (
          <p className="text-sm text-red-600 flex items-center gap-1">
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
              <path
                fillRule="evenodd"
                d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
                clipRule="evenodd"
              />
            </svg>
            {errors.package}
          </p>
        )}
        {selectedPackage && selectedPackage.price && (
          <div className="flex items-center gap-2 text-sm text-gray-600 bg-pink-50 px-4 py-2 rounded-lg">
            <svg
              className="w-4 h-4 text-pink-600"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            Giá gói: {formatPrice(selectedPackage.price)} VNĐ
          </div>
        )}
      </div>

      {/* Notes Textarea */}
      <div className="space-y-2">
        <Label.Root
          htmlFor="notes"
          className="text-sm font-semibold text-gray-900 flex items-center gap-2"
        >
          <FileText className="w-4 h-4 text-pink-600" />
          Ghi chú thêm
        </Label.Root>
        <textarea
          id="notes"
          value={formData.notes}
          onChange={(e) => handleChange('notes', e.target.value)}
          onBlur={() => handleBlur('notes')}
          placeholder="Ví dụ: Số lượng khách dự kiến, địa điểm mong muốn, yêu cầu đặc biệt..."
          rows={4}
          className={`w-full px-4 py-3 rounded-xl border-2 transition-all duration-300 resize-none focus:outline-none focus:ring-4 focus:ring-pink-300 focus:ring-offset-2 ${
            touched.notes && errors.notes
              ? 'border-red-300 bg-red-50'
              : 'border-pink-200 hover:border-pink-300 focus:border-pink-400'
          }`}
        />
        <div className="flex items-center justify-between text-xs text-gray-500">
          <span>{formData.notes.length}/500 ký tự</span>
          {touched.notes && errors.notes && (
            <p className="text-red-600 flex items-center gap-1">
              <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                <path
                  fillRule="evenodd"
                  d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
                  clipRule="evenodd"
                />
              </svg>
              {errors.notes}
            </p>
          )}
        </div>
      </div>

      {/* Submit Button */}
      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full inline-flex items-center justify-center gap-2 px-8 py-4 bg-gradient-to-r from-rose-500 to-pink-600 text-white font-semibold rounded-xl hover:shadow-xl hover:scale-105 transition-all duration-300 focus:outline-none focus:ring-4 focus:ring-pink-300 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
      >
        {isSubmitting ? (
          <>
            <svg
              className="animate-spin w-5 h-5"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              />
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
              />
            </svg>
            Đang gửi...
          </>
        ) : (
          <>
            <Send className="w-5 h-5" />
            Gửi yêu cầu
          </>
        )}
      </button>

      {/* Privacy note */}
      <p className="text-xs text-center text-gray-500">
        Thông tin của bạn sẽ được bảo mật và chỉ sử dụng để liên hệ tư vấn dịch vụ
      </p>
    </form>
  );
}
