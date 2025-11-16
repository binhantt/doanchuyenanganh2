'use client';

import * as Accordion from '@radix-ui/react-accordion';
import { Sparkles } from 'lucide-react';
import FAQItem from './FAQItem';
import { FAQSectionProps } from '../types';
import { useFAQ } from '../../api/hooks';


export default function FAQSection({
  title = 'Câu Hỏi Thường Gặp',
  subtitle = 'Tìm câu trả lời cho những thắc mắc phổ biến về dịch vụ của chúng tôi',
  faqs: defaultFaqsParam,
  allowMultiple = true,
  defaultOpen = ['faq-1'],
}: FAQSectionProps) {
  const { faqs: apiFaqs, loading, error } = useFAQ({ autoFetch: true });

  // Use API FAQs if available, otherwise use default
  const faqs = apiFaqs.length > 0 ? apiFaqs : (defaultFaqsParam  || []);

  if (error) {
    return (
      <section id="faq" className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-white via-pink-50/30 to-white">
        <div className="container mx-auto max-w-4xl">
          <div className="text-center py-12">
            <p className="text-red-600 font-semibold">Lỗi: {error}</p>
            <p className="text-gray-600 mt-2">Vui lòng thử lại sau</p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section
      id="faq"
      className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-white via-pink-50/30 to-white"
    >
      <div className="container mx-auto max-w-4xl">
        {/* Section Header */}
        <div className="text-center mb-16 space-y-4">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-pink-100 rounded-full">
            <Sparkles className="w-4 h-4 text-pink-600" />
            <span className="text-sm font-medium text-pink-600">
              Hỗ trợ khách hàng
            </span>
          </div>

          {/* Title */}
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900">
            {title}
          </h2>

          {/* Subtitle */}
          <p className="text-lg text-gray-600 max-w-3xl mx-auto leading-relaxed">
            {subtitle}
          </p>

          {/* Decorative line */}
          <div className="flex items-center justify-center gap-2 pt-4">
            <div className="w-12 h-1 bg-gradient-to-r from-transparent to-pink-300 rounded-full" />
            <div className="w-2 h-2 bg-pink-400 rounded-full" />
            <div className="w-8 h-1 bg-pink-400 rounded-full" />
            <div className="w-2 h-2 bg-pink-400 rounded-full" />
            <div className="w-12 h-1 bg-gradient-to-l from-transparent to-pink-300 rounded-full" />
          </div>
        </div>

        {/* Loading State */}
        {loading && (
          <div className="flex justify-center items-center py-20">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-pink-600"></div>
          </div>
        )}

        {/* Empty State */}
        {!loading && faqs.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-600">Không có câu hỏi nào</p>
          </div>
        )}

        {/* FAQ Accordion */}
        {!loading && faqs.length > 0 && (
          <Accordion.Root
            type={allowMultiple ? 'multiple' : 'single'}
            defaultValue={defaultOpen}
            className="space-y-0"
          >
            {faqs.map((faq, index) => (
              <div
                key={faq.id}
                className="animate-fade-up"
                style={{ animationDelay: `${index * 50}ms` }}
              >
                <FAQItem item={faq} value={faq.id} />
              </div>
            ))}
          </Accordion.Root>
        )}
      </div>
    </section>
  );
}
