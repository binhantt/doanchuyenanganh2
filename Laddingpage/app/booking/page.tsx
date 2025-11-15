'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { 
  ArrowLeft, 
  Calendar, 
  Phone, 
  Mail, 
  MapPin, 
  Clock,
  CheckCircle,
  User,
  Users,
  MessageSquare,
  Sparkles
} from 'lucide-react';

interface BookingFormData {
  fullName: string;
  email: string;
  phone: string;
  weddingDate: string;
  guestCount: string;
  venue: string;
  serviceType: string;
  budget: string;
  notes: string;
}

export default function BookingPage() {
  const router = useRouter();
  const [step, setStep] = useState<'form' | 'success'>('form');
  const [formData, setFormData] = useState<BookingFormData>({
    fullName: '',
    email: '',
    phone: '',
    weddingDate: '',
    guestCount: '',
    venue: '',
    serviceType: '',
    budget: '',
    notes: '',
  });
  const [errors, setErrors] = useState<Partial<Record<keyof BookingFormData, string>>>({});

  const serviceTypes = [
    { value: 'full-package', label: 'Gói dịch vụ trọn gói' },
    { value: 'decoration', label: 'Trang trí tiệc cưới' },
    { value: 'photography', label: 'Chụp ảnh & quay phim' },
    { value: 'catering', label: 'Tiệc cưới & thực đơn' },
    { value: 'other', label: 'Dịch vụ khác' },
  ];

  const budgetRanges = [
    { value: '0-50', label: 'Dưới 50 triệu' },
    { value: '50-100', label: '50 - 100 triệu' },
    { value: '100-200', label: '100 - 200 triệu' },
    { value: '200-500', label: '200 - 500 triệu' },
    { value: '500+', label: 'Trên 500 triệu' },
  ];

  const handleChange = (field: keyof BookingFormData, value: string) => {
    setFormData({ ...formData, [field]: value });
    // Clear error when user types
    if (errors[field]) {
      setErrors({ ...errors, [field]: undefined });
    }
  };

  const validateForm = (): boolean => {
    const newErrors: Partial<Record<keyof BookingFormData, string>> = {};

    if (!formData.fullName.trim()) {
      newErrors.fullName = 'Vui lòng nhập họ tên';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Vui lòng nhập email';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Email không hợp lệ';
    }

    if (!formData.phone.trim()) {
      newErrors.phone = 'Vui lòng nhập số điện thoại';
    } else if (!/^[0-9]{10}$/.test(formData.phone.replace(/\s/g, ''))) {
      newErrors.phone = 'Số điện thoại không hợp lệ';
    }

    if (!formData.weddingDate) {
      newErrors.weddingDate = 'Vui lòng chọn ngày cưới';
    }

    if (!formData.serviceType) {
      newErrors.serviceType = 'Vui lòng chọn loại dịch vụ';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (validateForm()) {
      // Mock submission
      console.log('Booking submitted:', formData);
      setStep('success');
    }
  };

  // Success page
  if (step === 'success') {
    return (
      <div className="min-h-screen bg-gradient-to-b from-white via-pink-50/30 to-white py-20">
        <div className="container mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-3xl p-12 text-center shadow-2xl border-2 border-rose-100">
            <div className="w-24 h-24 mx-auto mb-6 bg-gradient-to-r from-green-500 to-emerald-600 rounded-full flex items-center justify-center">
              <CheckCircle className="w-16 h-16 text-white" />
            </div>
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              Đặt Lịch Thành Công!
            </h1>
            <p className="text-lg text-gray-600 mb-8">
              Cảm ơn bạn đã tin tưởng Wedding Paradise. Chúng tôi sẽ liên hệ với bạn trong vòng 24 giờ.
            </p>
            <div className="bg-gradient-to-br from-pink-50 to-rose-50 rounded-2xl p-6 mb-8 border-2 border-rose-200">
              <h3 className="font-semibold text-gray-900 mb-4">Thông Tin Đặt Lịch</h3>
              <div className="space-y-2 text-left">
                <div className="flex justify-between">
                  <span className="text-gray-600">Mã đặt lịch:</span>
                  <span className="font-semibold text-gray-900">BK{Date.now()}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Họ tên:</span>
                  <span className="font-semibold text-gray-900">{formData.fullName}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Email:</span>
                  <span className="font-semibold text-gray-900">{formData.email}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Ngày cưới:</span>
                  <span className="font-semibold text-gray-900">
                    {new Date(formData.weddingDate).toLocaleDateString('vi-VN')}
                  </span>
                </div>
              </div>
            </div>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button
                onClick={() => router.push('/')}
                className="px-8 py-4 bg-gradient-to-r from-rose-500 to-pink-600 text-white font-semibold rounded-full hover:shadow-xl hover:scale-105 transition-all duration-300"
              >
                Về Trang Chủ
              </button>
              <button
                onClick={() => {
                  setStep('form');
                  setFormData({
                    fullName: '',
                    email: '',
                    phone: '',
                    weddingDate: '',
                    guestCount: '',
                    venue: '',
                    serviceType: '',
                    budget: '',
                    notes: '',
                  });
                }}
                className="px-8 py-4 bg-white text-rose-600 font-semibold rounded-full border-2 border-rose-300 hover:bg-rose-50 transition-all duration-300"
              >
                Đặt Lịch Khác
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-white via-pink-50/30 to-white py-20">
      <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <button
            onClick={() => router.back()}
            className="inline-flex items-center gap-2 text-gray-600 hover:text-rose-600 transition-colors font-medium mb-4"
          >
            <ArrowLeft className="w-5 h-5" />
            Quay lại
          </button>

          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-pink-100 rounded-full mb-4">
              <Sparkles className="w-4 h-4 text-pink-600" />
              <span className="text-sm font-medium text-pink-600">Đặt lịch tư vấn</span>
            </div>
            <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-4">
              Đặt Lịch Tư Vấn Miễn Phí
            </h1>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Điền thông tin để chúng tôi liên hệ tư vấn chi tiết về dịch vụ tổ chức tiệc cưới
            </p>
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Form */}
          <div className="lg:col-span-2">
            <form onSubmit={handleSubmit} className="bg-white rounded-2xl p-8 border-2 border-rose-100 shadow-lg">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Thông Tin Của Bạn</h2>

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
                      value={formData.fullName}
                      onChange={(e) => handleChange('fullName', e.target.value)}
                      placeholder="Nguyễn Văn A"
                      className={`w-full pl-10 pr-4 py-3 border-2 rounded-xl focus:outline-none transition-colors ${
                        errors.fullName
                          ? 'border-red-300 focus:border-red-400'
                          : 'border-rose-200 focus:border-rose-400'
                      }`}
                    />
                  </div>
                  {errors.fullName && (
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
                      value={formData.email}
                      onChange={(e) => handleChange('email', e.target.value)}
                      placeholder="email@example.com"
                      className={`w-full pl-10 pr-4 py-3 border-2 rounded-xl focus:outline-none transition-colors ${
                        errors.email
                          ? 'border-red-300 focus:border-red-400'
                          : 'border-rose-200 focus:border-rose-400'
                      }`}
                    />
                  </div>
                  {errors.email && (
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
                      value={formData.phone}
                      onChange={(e) => handleChange('phone', e.target.value)}
                      placeholder="0912345678"
                      className={`w-full pl-10 pr-4 py-3 border-2 rounded-xl focus:outline-none transition-colors ${
                        errors.phone
                          ? 'border-red-300 focus:border-red-400'
                          : 'border-rose-200 focus:border-rose-400'
                      }`}
                    />
                  </div>
                  {errors.phone && (
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
                      value={formData.weddingDate}
                      onChange={(e) => handleChange('weddingDate', e.target.value)}
                      min={new Date().toISOString().split('T')[0]}
                      className={`w-full pl-10 pr-4 py-3 border-2 rounded-xl focus:outline-none transition-colors ${
                        errors.weddingDate
                          ? 'border-red-300 focus:border-red-400'
                          : 'border-rose-200 focus:border-rose-400'
                      }`}
                    />
                  </div>
                  {errors.weddingDate && (
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
                      value={formData.guestCount}
                      onChange={(e) => handleChange('guestCount', e.target.value)}
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
                      value={formData.venue}
                      onChange={(e) => handleChange('venue', e.target.value)}
                      placeholder="Nhà hàng ABC, Hà Nội"
                      className="w-full pl-10 pr-4 py-3 border-2 border-rose-200 rounded-xl focus:border-rose-400 focus:outline-none"
                    />
                  </div>
                </div>
              </div>

              {/* Service Type */}
              <div className="mt-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Loại dịch vụ quan tâm <span className="text-red-500">*</span>
                </label>
                <select
                  value={formData.serviceType}
                  onChange={(e) => handleChange('serviceType', e.target.value)}
                  className={`w-full px-4 py-3 border-2 rounded-xl focus:outline-none transition-colors ${
                    errors.serviceType
                      ? 'border-red-300 focus:border-red-400'
                      : 'border-rose-200 focus:border-rose-400'
                  }`}
                >
                  <option value="">Chọn loại dịch vụ</option>
                  {serviceTypes.map((type) => (
                    <option key={type.value} value={type.value}>
                      {type.label}
                    </option>
                  ))}
                </select>
                {errors.serviceType && (
                  <p className="mt-1 text-sm text-red-600">{errors.serviceType}</p>
                )}
              </div>

              {/* Budget */}
              <div className="mt-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Ngân sách dự kiến
                </label>
                <select
                  value={formData.budget}
                  onChange={(e) => handleChange('budget', e.target.value)}
                  className="w-full px-4 py-3 border-2 border-rose-200 rounded-xl focus:border-rose-400 focus:outline-none"
                >
                  <option value="">Chọn mức ngân sách</option>
                  {budgetRanges.map((range) => (
                    <option key={range.value} value={range.value}>
                      {range.label}
                    </option>
                  ))}
                </select>
              </div>

              {/* Notes */}
              <div className="mt-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Ghi chú thêm
                </label>
                <div className="relative">
                  <MessageSquare className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
                  <textarea
                    value={formData.notes}
                    onChange={(e) => handleChange('notes', e.target.value)}
                    placeholder="Yêu cầu đặc biệt, thời gian liên hệ..."
                    rows={4}
                    className="w-full pl-10 pr-4 py-3 border-2 border-rose-200 rounded-xl focus:border-rose-400 focus:outline-none resize-none"
                  />
                </div>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                className="w-full mt-8 py-4 bg-gradient-to-r from-rose-500 to-pink-600 text-white font-semibold rounded-xl hover:shadow-xl hover:scale-105 transition-all duration-300"
              >
                Gửi Yêu Cầu Tư Vấn
              </button>
            </form>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1 space-y-6">
            {/* Contact Info */}
            <div className="bg-gradient-to-br from-pink-50 to-rose-50 rounded-2xl p-6 border-2 border-rose-200 sticky top-24">
              <h3 className="text-xl font-bold text-gray-900 mb-6">Thông Tin Liên Hệ</h3>

              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <Phone className="w-5 h-5 text-rose-600 mt-1" />
                  <div>
                    <h4 className="font-semibold text-gray-900">Hotline</h4>
                    <p className="text-gray-600">1900-xxxx</p>
                    <p className="text-sm text-gray-500">Hỗ trợ 24/7</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Mail className="w-5 h-5 text-rose-600 mt-1" />
                  <div>
                    <h4 className="font-semibold text-gray-900">Email</h4>
                    <p className="text-gray-600">contact@wedding.vn</p>
                    <p className="text-sm text-gray-500">Phản hồi trong 2 giờ</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Clock className="w-5 h-5 text-rose-600 mt-1" />
                  <div>
                    <h4 className="font-semibold text-gray-900">Giờ làm việc</h4>
                    <p className="text-gray-600">Thứ 2 - Chủ nhật</p>
                    <p className="text-sm text-gray-500">8:00 - 22:00</p>
                  </div>
                </div>
              </div>

              <div className="mt-6 pt-6 border-t-2 border-rose-200">
                <h4 className="font-semibold text-gray-900 mb-3">Cam kết của chúng tôi</h4>
                <ul className="space-y-2 text-sm text-gray-600">
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" />
                    <span>Tư vấn miễn phí</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" />
                    <span>Bảo mật thông tin</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" />
                    <span>Phản hồi nhanh chóng</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
