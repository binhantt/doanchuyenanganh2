'use client';

import * as Accordion from '@radix-ui/react-accordion';
import { Sparkles, HelpCircle } from 'lucide-react';
import FAQItem from './FAQItem';
import { FAQSectionProps } from '../types';
import { defaultFAQs } from '../data';

export default function FAQSection({
  title = 'Câu Hỏi Thường Gặp',
  subtitle = 'Tìm câu trả lời cho những thắc mắc phổ biến về dịch vụ của chúng tôi',
  faqs = defaultFAQs,
  allowMultiple = true,
  defaultOpen = ['faq-1'],
}: FAQSectionProps) {
  return (
    <section
      id="faq"
      className=" px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-white via-pink-50/30 to-white"
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

        {/* FAQ Accordion */}
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
      </div>
    </section>
  );
}
