export interface FAQItem {
  id: string;
  question: string;
  answer: string;
  category?: string;
}

export interface FAQItemProps {
  item: FAQItem;
  value: string;
}

export interface FAQSectionProps {
  title?: string;
  subtitle?: string;
  faqs?: FAQItem[];
  allowMultiple?: boolean;
  defaultOpen?: string[];
}
