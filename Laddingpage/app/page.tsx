import HeroSection from '@/src/features/landing/hero';
import { ServiceFeatures } from '@/src/features/services';
import { WeddingPackages } from '@/src/features/packages';
import { ProductsList } from '@/src/features/products';
import { GallerySection } from '@/src/features/gallery';
import { TestimonialsSection } from '@/src/features/testimonials';
import { ProcessSteps } from '@/src/features/process';
import { FAQSection } from '@/src/features/faq';
import { BookingSection } from '@/src/features/booking';
import TestimonialSubmitForm from '@/src/features/testimonials/components/TestimonialSubmitForm'
export default function HomePage() {
  return (
    <main className="min-h-screen py-5 ">

      <HeroSection />
      <ServiceFeatures />

      {/* Wedding Packages - Bảng giá gói dịch vụ */}
      <WeddingPackages />

      {/* Products - Sản phẩm cưới */}
      <ProductsList />

      {/* Gallery Section - Thư viện ảnh */}
      <GallerySection />

      {/* Process Steps - Quy trình làm việc */}
      <ProcessSteps />

      {/* Testimonials - Đánh giá khách hàng */}
      <TestimonialsSection />


      {/* FAQ Section - Câu hỏi thường gặp */}
      <FAQSection />

      {/* Booking Section - Form đặt lịch */}
      <BookingSection />
      <TestimonialSubmitForm/>
    </main>
  );
}
