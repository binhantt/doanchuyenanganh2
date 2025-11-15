'use client';

import { Sparkles, Calendar, Phone, Mail } from 'lucide-react';
import BookingForm from './BookingForm';
import { BookingSectionProps } from '../types';
import { defaultPackages } from '../data';

export default function BookingSection({
  title = 'Đặt Lịch Tư Vấn',
  subtitle = 'Điền thông tin để chúng tôi liên hệ tư vấn chi tiết về dịch vụ',
  packages = defaultPackages,
  onSubmit,
}: BookingSectionProps) {
  return (
    <section
      id="booking"
      className=" px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-white via-pink-50/30 to-white"
    >
      <div className="container mx-auto max-w-6xl">
        {/* Section Header */}
        <div className="text-center mb-16 space-y-4">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-pink-100 rounded-full">
            <Sparkles className="w-4 h-4 text-pink-600" />
            <span className="text-sm font-medium text-pink-600">
              Liên hệ ngay
            </span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900">
            {title}
          </h2>

          <p className="text-lg text-gray-600 max-w-3xl mx-auto leading-relaxed">
            {subtitle}
          </p>

          <div className="flex items-center justify-center gap-2 pt-4">
            <div className="w-12 h-1 bg-gradient-to-r from-transparent to-pink-300 rounded-full" />
            <div className="w-2 h-2 bg-pink-400 rounded-full" />
            <div className="w-8 h-1 bg-pink-400 rounded-full" />
            <div className="w-2 h-2 bg-pink-400 rounded-full" />
            <div className="w-12 h-1 bg-gradient-to-l from-transparent to-pink-300 rounded-full" />
          </div>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-start">
          {/* Left: Form */}
          <div className="bg-white rounded-3xl shadow-xl p-8 lg:p-10 border-2 border-pink-100">
            <BookingForm packages={packages} onSubmit={onSubmit} />
          </div>

          {/* Right: Info */}
          <div className="space-y-8">
            {/* Contact Info Card */}
            <div className="bg-gradient-to-br from-pink-50 to-rose-50 rounded-3xl p-8 border-2 border-pink-100">
              <h3 className="text-2xl font-bold text-gray-900 mb-6">
                Thông tin liên hệ
              </h3>

              <div className="space-y-4">
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-white flex items-center justify-center shadow-sm">
                    <Phone className="w-6 h-6 text-pink-600" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-1">
                      Hotline
                    </h4>
                    <p className="text-gray-600">1900-xxxx</p>
                    <p className="text-sm text-gray-500">
                      Hỗ trợ 24/7
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-white flex items-center justify-center shadow-sm">
                    <Mail className="w-6 h-6 text-pink-600" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-1">Email</h4>
                    <p className="text-gray-600">contact@wedding.vn</p>
                    <p className="text-sm text-gray-500">
                      Phản hồi trong 2 giờ
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-white flex items-center justify-center shadow-sm">
                    <Calendar className="w-6 h-6 text-pink-600" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-1">
                      Giờ làm việc
                    </h4>
                    <p className="text-gray-600">Thứ 2 - Chủ nhật</p>
                    <p className="text-sm text-gray-500">8:00 - 22:00</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Why Choose Us */}
            <div className="bg-white rounded-3xl p-8 border-2 border-pink-100 shadow-lg">
              <h3 className="text-2xl font-bold text-gray-900 mb-6">
                Tại sao chọn chúng tôi?
              </h3>

              <ul className="space-y-4">
                {[
                  'Tư vấn miễn phí và chi tiết',
                  'Đội ngũ chuyên nghiệp, giàu kinh nghiệm',
                  'Giá cả minh bạch, không phát sinh',
                  'Cam kết chất lượng dịch vụ',
                  'Hỗ trợ 24/7 trong suốt quá trình',
                ].map((item, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <svg
                      className="w-6 h-6 text-pink-600 flex-shrink-0 mt-0.5"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                        clipRule="evenodd"
                      />
                    </svg>
                    <span className="text-gray-700">{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Trust Badges */}
          
          </div>
        </div>
      </div>
    </section>
  );
}
