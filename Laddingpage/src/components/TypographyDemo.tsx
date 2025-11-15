/**
 * Typography Demo Component
 * Hiển thị tất cả font sizes để kiểm tra đồng bộ
 */

export default function TypographyDemo() {
  return (
    <div className="container mx-auto max-w-7xl px-4 py-20 space-y-16">
      {/* Display Sizes */}
      <section className="space-y-8">
        <h2 className="text-2xl font-bold text-pink-600 border-b-2 border-pink-200 pb-2">
          Display Sizes (Hero)
        </h2>
        <div className="space-y-4">
          <div>
            <p className="text-xs text-gray-500 mb-2">XL: text-5xl sm:text-6xl lg:text-7xl</p>
            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold leading-tight tracking-tight text-gray-900">
              Your Dream Wedding
            </h1>
          </div>
          <div>
            <p className="text-xs text-gray-500 mb-2">LG: text-4xl sm:text-5xl lg:text-6xl</p>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight text-gray-900">
              Your Dream Wedding
            </h1>
          </div>
        </div>
      </section>

      {/* Headings */}
      <section className="space-y-8">
        <h2 className="text-2xl font-bold text-pink-600 border-b-2 border-pink-200 pb-2">
          Section Headings
        </h2>
        <div className="space-y-4">
          <div>
            <p className="text-xs text-gray-500 mb-2">H2 (Standard): text-3xl sm:text-4xl lg:text-5xl</p>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold leading-tight text-gray-900">
              Dịch Vụ Của Chúng Tôi
            </h2>
          </div>
          <div>
            <p className="text-xs text-gray-500 mb-2">H3: text-2xl sm:text-3xl lg:text-4xl</p>
            <h3 className="text-2xl sm:text-3xl lg:text-4xl font-bold leading-snug text-gray-900">
              Gói Premium
            </h3>
          </div>
          <div>
            <p className="text-xs text-gray-500 mb-2">H4: text-xl sm:text-2xl lg:text-3xl</p>
            <h4 className="text-xl sm:text-2xl lg:text-3xl font-semibold leading-snug text-gray-900">
              Trang trí tiệc cưới
            </h4>
          </div>
          <div>
            <p className="text-xs text-gray-500 mb-2">H5: text-lg sm:text-xl lg:text-2xl</p>
            <h5 className="text-lg sm:text-xl lg:text-2xl font-semibold leading-normal text-gray-900">
              Chi tiết dịch vụ
            </h5>
          </div>
        </div>
      </section>

      {/* Body Text */}
      <section className="space-y-8">
        <h2 className="text-2xl font-bold text-pink-600 border-b-2 border-pink-200 pb-2">
          Body Text
        </h2>
        <div className="space-y-4">
          <div>
            <p className="text-xs text-gray-500 mb-2">XL: text-xl</p>
            <p className="text-xl leading-relaxed text-gray-600">
              Chúng tôi tạo nên những khoảnh khắc đáng nhớ cho ngày trọng đại của bạn.
            </p>
          </div>
          <div>
            <p className="text-xs text-gray-500 mb-2">LG (Standard Subtitle): text-lg</p>
            <p className="text-lg leading-relaxed text-gray-600">
              Mang đến trải nghiệm hoàn hảo cho ngày trọng đại của bạn với các dịch vụ chuyên nghiệp.
            </p>
          </div>
          <div>
            <p className="text-xs text-gray-500 mb-2">Base: text-base</p>
            <p className="text-base leading-relaxed text-gray-600">
              Đội ngũ chuyên nghiệp với hơn 10 năm kinh nghiệm trong lĩnh vực tổ chức tiệc cưới.
            </p>
          </div>
          <div>
            <p className="text-xs text-gray-500 mb-2">SM: text-sm</p>
            <p className="text-sm leading-normal text-gray-500">
              Thông tin của bạn sẽ được bảo mật và chỉ sử dụng để liên hệ tư vấn dịch vụ.
            </p>
          </div>
          <div>
            <p className="text-xs text-gray-500 mb-2">XS: text-xs</p>
            <p className="text-xs leading-normal text-gray-500">
              © 2024 Wedding Studio. All rights reserved.
            </p>
          </div>
        </div>
      </section>

      {/* Buttons */}
      <section className="space-y-8">
        <h2 className="text-2xl font-bold text-pink-600 border-b-2 border-pink-200 pb-2">
          Buttons
        </h2>
        <div className="flex flex-wrap gap-4">
          <button className="px-8 py-4 bg-gradient-to-r from-rose-500 to-pink-600 text-white text-lg font-semibold rounded-full">
            Large Button
          </button>
          <button className="px-8 py-4 bg-gradient-to-r from-rose-500 to-pink-600 text-white text-base font-semibold rounded-full">
            Standard Button
          </button>
          <button className="px-6 py-3 bg-gradient-to-r from-rose-500 to-pink-600 text-white text-sm font-semibold rounded-full">
            Small Button
          </button>
        </div>
      </section>

      {/* Labels & Badges */}
      <section className="space-y-8">
        <h2 className="text-2xl font-bold text-pink-600 border-b-2 border-pink-200 pb-2">
          Labels & Badges
        </h2>
        <div className="space-y-4">
          <div className="flex items-center gap-4">
            <span className="px-4 py-2 bg-pink-100 text-pink-600 text-base font-semibold rounded-full">
              Large Badge
            </span>
            <span className="px-4 py-2 bg-pink-100 text-pink-600 text-sm font-semibold rounded-full">
              Standard Badge
            </span>
            <span className="px-3 py-1 bg-pink-100 text-pink-600 text-xs font-semibold rounded-full">
              Small Badge
            </span>
          </div>
        </div>
      </section>

      {/* Gradient Text */}
      <section className="space-y-8">
        <h2 className="text-2xl font-bold text-pink-600 border-b-2 border-pink-200 pb-2">
          Gradient Text
        </h2>
        <div className="space-y-4">
          <h1 className="text-5xl font-bold bg-gradient-to-r from-rose-600 to-pink-600 bg-clip-text text-transparent">
            Wedding Studio
          </h1>
          <h2 className="text-3xl font-bold bg-gradient-to-r from-rose-600 to-pink-600 bg-clip-text text-transparent">
            Your Dream Wedding
          </h2>
        </div>
      </section>
    </div>
  );
}
