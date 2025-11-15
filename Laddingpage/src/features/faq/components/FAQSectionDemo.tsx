'use client';

import FAQSection from './FAQSection';
import { FAQItem } from '../types';

/**
 * FAQSectionDemo - Example usage of the FAQSection component
 */
export default function FAQSectionDemo() {
  // Custom FAQ items
  const customFAQs: FAQItem[] = [
    {
      id: 'custom-1',
      question: 'What services do you offer?',
      answer:
        'We offer comprehensive wedding planning services including venue decoration, photography, videography, catering coordination, entertainment booking, and day-of coordination. Our packages can be customized to fit your specific needs and budget.',
      category: 'Services',
    },
    {
      id: 'custom-2',
      question: 'How far in advance should I book?',
      answer:
        'We recommend booking at least 6-12 months in advance for peak wedding season (May-October). However, we can accommodate shorter timelines depending on availability. Contact us as soon as possible to discuss your wedding date.',
      category: 'Booking',
    },
    {
      id: 'custom-3',
      question: 'Do you offer payment plans?',
      answer:
        'Yes, we offer flexible payment plans. Typically, we require a 30% deposit to secure your date, with the remaining balance split into installments leading up to your wedding day. We accept various payment methods including bank transfer and credit cards.',
      category: 'Payment',
    },
    {
      id: 'custom-4',
      question: 'Can I customize my package?',
      answer:
        'Absolutely! While we offer pre-designed packages, we understand every wedding is unique. You can mix and match services, add extras, or create a completely custom package. Our team will work with you to design the perfect solution.',
      category: 'Customization',
    },
  ];

  return (
    <div className="space-y-20">
      {/* Example 1: Default FAQs */}
      <FAQSection />

      {/* Example 2: Custom FAQs (English) */}
      <FAQSection
        title="Frequently Asked Questions"
        subtitle="Find answers to common questions about our wedding services"
        faqs={customFAQs}
      />

      {/* Example 3: Single selection mode */}
      <FAQSection
        title="FAQ - Single Selection"
        subtitle="Only one question can be open at a time"
        faqs={customFAQs.slice(0, 4)}
        allowMultiple={false}
        defaultOpen={['custom-1']}
      />

      {/* Example 4: Minimal FAQs */}
      <FAQSection
        title="Quick Questions"
        subtitle="Essential information at a glance"
        faqs={customFAQs.slice(0, 3)}
        defaultOpen={[]}
      />
    </div>
  );
}
