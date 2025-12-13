import HeroSection from '@/src/features/landing/hero';
import { ServiceFeatures } from '@/src/features/services';

import { ProductsList } from '@/src/features/products';
import { GallerySection } from '@/src/features/gallery';
import { TestimonialsSection } from '@/src/features/testimonials';

import { FAQSection } from '@/src/features/faq';
import { BookingSection } from '@/src/features/booking';
import TestimonialSubmitForm from '@/src/features/testimonials/components/TestimonialSubmitForm';
import { PackageShowcase } from '@/src/features/packages';
import CartSidebar from '@/src/features/order/components/CartSidebar';


export default function HomePage() {
  return (
    <main className="min-h-screen overflow-hidden">
      {/* Hero Section with full viewport */}
      <section className="relative">
        <HeroSection />
      </section>

      {/* Service Features with smooth transition */}
      <section id="services" className="relative py-20 bg-white">
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-rose-200 to-transparent" />
        <ServiceFeatures />
      </section>

      {/* Wedding Packages - hiển thị chi tiết gói ngay trên homepage, xen kẽ ảnh trái/phải */}
      <section id="packages" className="relative py-24 bg-gradient-to-b from-white via-rose-50/30 to-white">
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-20 left-10 w-72 h-72 bg-rose-200/10 rounded-full blur-3xl" />
          <div className="absolute bottom-20 right-10 w-96 h-96 bg-pink-200/10 rounded-full blur-3xl" />
        </div>
        <div className="relative z-10">
          <PackageShowcase />
        </div>
      </section>

      {/* Products - Sản phẩm cưới */}
      <section id="products" className="relative py-24 bg-white">
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-pink-200 to-transparent" />
        <ProductsList />
      </section>

      {/* Gallery Section - Thư viện ảnh */}
      <section id="gallery" className="relative py-24 bg-gradient-to-b from-white via-pink-50/20 to-white">
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-1/2 left-1/4 w-80 h-80 bg-rose-300/5 rounded-full blur-3xl" />
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-pink-300/5 rounded-full blur-3xl" />
        </div>
        <div className="relative z-10">
          <GallerySection />
        </div>
      </section>
      {/* Testimonials - Đánh giá khách hàng */}
      <section id="testimonials" className="relative py-24 bg-gradient-to-b from-white via-rose-50/40 to-white">
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-10 right-20 w-64 h-64 bg-pink-200/10 rounded-full blur-3xl" />
          <div className="absolute bottom-10 left-20 w-80 h-80 bg-rose-200/10 rounded-full blur-3xl" />
        </div>
        <div className="relative z-10">
          <TestimonialsSection />
        </div>
      </section>

      {/* FAQ Section - Câu hỏi thường gặp */}
      <section id="faq" className="relative py-24 bg-white">
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-pink-200 to-transparent" />
        <FAQSection />
      </section>

      {/* Booking Section - Form đặt lịch */}
      <section id="booking" className="relative py-24 bg-gradient-to-b from-white via-rose-50/30 to-white">
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-1/3 left-1/3 w-96 h-96 bg-rose-300/5 rounded-full blur-3xl" />
        </div>
        <div className="relative z-10">
          <BookingSection />
        </div>
      </section>

      {/* Testimonial Submit Form */}
      <section id='TestimonialSubmitForm' className="relative py-20 bg-white">
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-rose-200 to-transparent" />
        <div className="max-w-4xl mx-auto px-4">
          <TestimonialSubmitForm />
        </div>
      </section>

      {/* Floating Action Button - Scroll to top */}
      
      {/* Cart Sidebar */}
  
    </main>
  );
}
