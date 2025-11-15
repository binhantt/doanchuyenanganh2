'use client';

import Link from 'next/link';
import Image from 'next/image';

export default function HeroSection() {
  const handleSmoothScroll = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <section className="relative h-screen py-20 flex items-centernter overflow-hidden bg-gradient-to-br from-rose-50 via-pink-50 to-rose-100">
      {/* Decorative Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-rose-300/20 rounded-full blur-3xl animate-float" />
        <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-pink-300/20 rounded-full blur-3xl animate-float" style={{ animationDelay: '1s' }} />
      </div>

      <div className="relative max-w-7xl mx-auto py-5">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left Content */}
          <div className="text-center lg:text-left space-y-8 animate-fade-up">

            <h1 className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold leading-tight">
              <span className="block text-gray-900">Ngày Trọng Đại</span>
              <span className="block bg-gradient-to-r from-rose-600 via-pink-600 to-rose-500 bg-clip-text text-transparent">
                Của Bạn
              </span>
            </h1>

            {/* Subheading */}
            <p className="text-lg sm:text-xl text-gray-600 max-w-2xl mx-auto lg:mx-0 leading-relaxed">
              Biến giấc mơ đám cưới của bạn thành hiện thực với dịch vụ tổ chức tiệc cưới chuyên nghiệp, 
              tận tâm và đầy cảm xúc. Mỗi khoảnh khắc đều là kỷ niệm vĩnh cửu.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start animate-fade-in">
              <Link
                href="#services"
                onClick={(e) => handleSmoothScroll(e, '#services')}
                className="group inline-flex items-center justify-center px-8 py-4 bg-gradient-to-r from-rose-500 to-pink-600 text-white font-semibold rounded-full hover:shadow-xl hover:scale-105 transition-all duration-300"
              >
                Khám Phá Dịch Vụ
                <svg 
                  className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" 
                  fill="none" 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  strokeWidth="2" 
                  viewBox="0 0 24 24" 
                  stroke="currentColor"
                >
                  <path d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </Link>

              <Link
                href="#packages"
                onClick={(e) => handleSmoothScroll(e, '#packages')}
                className="group inline-flex items-center justify-center px-8 py-4 bg-white text-rose-600 font-semibold rounded-full border-2 border-rose-300 hover:bg-rose-50 hover:border-rose-400 hover:shadow-lg transition-all duration-300"
              >
                Xem Bảng Giá
                <svg 
                  className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" 
                  fill="none" 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  strokeWidth="2" 
                  viewBox="0 0 24 24" 
                  stroke="currentColor"
                >
                  <path d="M9 5l7 7-7 7" />
                </svg>
              </Link>
            </div>

            {/* Stats */}
            <div className="flex flex-wrap gap-8 justify-center lg:justify-start pt-8 border-t border-rose-200/50">
              <div className="text-center lg:text-left">
                <div className="text-3xl font-bold text-rose-600">500+</div>
                <div className="text-sm text-gray-600">Đám cưới thành công</div>
              </div>
              <div className="text-center lg:text-left">
                <div className="text-3xl font-bold text-rose-600">98%</div>
                <div className="text-sm text-gray-600">Khách hàng hài lòng</div>
              </div>
              <div className="text-center lg:text-left">
                <div className="text-3xl font-bold text-rose-600">10+</div>
                <div className="text-sm text-gray-600">Năm kinh nghiệm</div>
              </div>
            </div>
          </div>

          {/* Right Image */}
          <div className="relative animate-fade-in md:w-[70%] md:left-[30%]">
            <div className="relative aspect-[4/5] lg:aspect-[3/4] rounded-3xl overflow-hidden shadow-2xl">
              {/* Placeholder gradient until real image is added */}
              <div className="absolute inset-0 bg-gradient-to-br from-rose-200 via-pink-200 to-rose-300" />
              <Image
                src="https://maisondecharme.vn/wp-content/uploads/2021/02/Untitled-2.jpg"
                alt="Beautiful wedding couple"
                fill
                className="object-cover"
                priority
              />
            </div>

            {/* Decorative Elements */}
            <div className="absolute -top-6 -right-6 w-32 h-32 bg-rose-400/20 rounded-full blur-2xl" />
            <div className="absolute -bottom-6 -left-6 w-40 h-40 bg-pink-400/20 rounded-full blur-2xl" />
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
        <svg 
          className="w-6 h-6 text-rose-400" 
          fill="none" 
          strokeLinecap="round" 
          strokeLinejoin="round" 
          strokeWidth="2" 
          viewBox="0 0 24 24" 
          stroke="currentColor"
        >
          <path d="M19 14l-7 7m0 0l-7-7m7 7V3" />
        </svg>
      </div>
    </section>
  );
}
