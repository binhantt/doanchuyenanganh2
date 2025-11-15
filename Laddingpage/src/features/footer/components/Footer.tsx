'use client';

import Link from 'next/link';
import {
  Heart,
  Mail,
  Phone,
  MapPin,
  Facebook,
  Instagram,
  Youtube,
  Twitter,
  Send,
} from 'lucide-react';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  const companyLinks = [
    { label: 'Trang chủ', href: '/' },
    { label: 'Về chúng tôi', href: '/about' },
    { label: 'Thư viện ảnh', href: '/gallery' },
    { label: 'Liên hệ', href: '/contact' },
  ];

  const serviceLinks = [
    { label: 'Dịch vụ tổng quan', href: '/services' },
    { label: 'Bảng giá gói', href: '/packages' },
    { label: 'Quy trình làm việc', href: '/process' },
    { label: 'Đặt lịch tư vấn', href: '/booking' },
  ];

  const supportLinks = [
    { label: 'Câu hỏi thường gặp', href: '/faq' },
    { label: 'Đánh giá khách hàng', href: '/testimonials' },
    { label: 'Chính sách bảo mật', href: '/privacy' },
    { label: 'Điều khoản dịch vụ', href: '/terms' },
  ];

  const socialLinks = [
    {
      name: 'Facebook',
      icon: Facebook,
      href: 'https://facebook.com',
      color: 'hover:text-blue-600',
    },
    {
      name: 'Instagram',
      icon: Instagram,
      href: 'https://instagram.com',
      color: 'hover:text-pink-600',
    },
    {
      name: 'Youtube',
      icon: Youtube,
      href: 'https://youtube.com',
      color: 'hover:text-red-600',
    },
    {
      name: 'Twitter',
      icon: Twitter,
      href: 'https://twitter.com',
      color: 'hover:text-sky-600',
    },
  ];

  return (
    <footer className="bg-gradient-to-b from-pink-50 to-rose-100 border-t-2 border-pink-200">
      {/* Main Footer Content */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12">
          {/* Column 1: Studio Info */}
          <div className="space-y-6">
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-rose-500 to-pink-600 flex items-center justify-center">
                <Heart className="w-6 h-6 text-white fill-white" />
              </div>
              <h3 className="text-2xl font-bold bg-gradient-to-r from-rose-600 to-pink-600 bg-clip-text text-transparent">
                Wedding Studio
              </h3>
            </div>

            <p className="text-gray-600 leading-relaxed">
              Chúng tôi tạo nên những khoảnh khắc đáng nhớ cho ngày trọng đại của bạn
              với sự tận tâm và chuyên nghiệp.
            </p>

            {/* Contact Info */}
            <div className="space-y-3">
              <div className="flex items-start gap-3 text-gray-600 hover:text-pink-600 transition-colors">
                <MapPin className="w-5 h-5 flex-shrink-0 mt-0.5" />
                <span className="text-sm">
                  123 Đường ABC, Quận XYZ, TP. Hồ Chí Minh
                </span>
              </div>

              <a
                href="tel:1900xxxx"
                className="flex items-center gap-3 text-gray-600 hover:text-pink-600 transition-colors"
              >
                <Phone className="w-5 h-5 flex-shrink-0" />
                <span className="text-sm">1900-xxxx</span>
              </a>

              <a
                href="mailto:contact@wedding.vn"
                className="flex items-center gap-3 text-gray-600 hover:text-pink-600 transition-colors"
              >
                <Mail className="w-5 h-5 flex-shrink-0" />
                <span className="text-sm">contact@wedding.vn</span>
              </a>
            </div>
          </div>

          {/* Column 2: Công ty */}
          <div className="space-y-6">
            <h4 className="text-lg font-bold text-gray-900">Công ty</h4>
            <ul className="space-y-3">
              {companyLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-gray-600 hover:text-pink-600 transition-colors text-sm flex items-center gap-2 group"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-pink-400 group-hover:bg-pink-600 transition-colors" />
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Dịch vụ */}
          <div className="space-y-6">
            <h4 className="text-lg font-bold text-gray-900">Dịch vụ</h4>
            <ul className="space-y-3">
              {serviceLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-gray-600 hover:text-pink-600 transition-colors text-sm flex items-center gap-2 group"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-pink-400 group-hover:bg-pink-600 transition-colors" />
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3.5: Hỗ trợ */}
          <div className="space-y-6">
            <h4 className="text-lg font-bold text-gray-900">Hỗ trợ</h4>
            <ul className="space-y-3">
              {supportLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-gray-600 hover:text-pink-600 transition-colors text-sm flex items-center gap-2 group"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-pink-400 group-hover:bg-pink-600 transition-colors" />
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 5: Newsletter & Social */}
          <div className="space-y-6 lg:col-span-1">
            <h4 className="text-lg font-bold text-gray-900">Theo dõi chúng tôi</h4>

            {/* Newsletter */}
            <div className="space-y-3">
              <p className="text-sm text-gray-600">
                Đăng ký nhận tin tức và ưu đãi mới nhất
              </p>
              <form className="flex gap-2">
                <input
                  type="email"
                  placeholder="Email của bạn"
                  className="flex-1 px-4 py-2 rounded-lg border-2 border-pink-200 focus:border-pink-400 focus:outline-none focus:ring-2 focus:ring-pink-300 text-sm"
                />
                <button
                  type="submit"
                  className="px-4 py-2 bg-gradient-to-r from-rose-500 to-pink-600 text-white rounded-lg hover:shadow-lg transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-pink-400 focus:ring-offset-2"
                  aria-label="Subscribe"
                >
                  <Send className="w-4 h-4" />
                </button>
              </form>
            </div>

            {/* Social Icons */}
            <div className="space-y-3">
              <p className="text-sm text-gray-600">Kết nối với chúng tôi</p>
              <div className="flex items-center gap-3">
                {socialLinks.map((social) => {
                  const Icon = social.icon;
                  return (
                    <a
                      key={social.name}
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`w-10 h-10 rounded-full bg-white border-2 border-pink-200 flex items-center justify-center text-gray-600 ${social.color} hover:border-pink-400 hover:shadow-md transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-pink-400 focus:ring-offset-2`}
                      aria-label={social.name}
                    >
                      <Icon className="w-5 h-5" />
                    </a>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t-2 border-pink-200 bg-gradient-to-r from-rose-50 to-pink-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            {/* Copyright */}
            <p className="text-sm text-gray-600 text-center md:text-left">
              © {currentYear} Wedding Studio. All rights reserved.
            </p>

            {/* Legal Links */}
            <div className="flex items-center gap-6 text-sm">
              <Link
                href="/privacy"
                className="text-gray-600 hover:text-pink-600 transition-colors"
              >
                Chính sách bảo mật
              </Link>
              <Link
                href="/terms"
                className="text-gray-600 hover:text-pink-600 transition-colors"
              >
                Điều khoản dịch vụ
              </Link>
            </div>

            {/* Made with love */}
            <div className="flex items-center gap-2 text-sm text-gray-600">
              <span>Made with</span>
              <Heart className="w-4 h-4 text-pink-600 fill-pink-600 animate-pulse" />
              <span>in Vietnam</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
