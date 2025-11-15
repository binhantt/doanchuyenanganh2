'use client';

import * as Accordion from '@radix-ui/react-accordion';
import { ChevronDown } from 'lucide-react';
import { FAQItemProps } from '../types';

export default function FAQItem({ item, value }: FAQItemProps) {
  return (
    <Accordion.Item
      value={value}
      className="group border-2 border-pink-100 rounded-2xl mb-4 overflow-hidden bg-white hover:border-pink-300 transition-all duration-300 hover:shadow-lg"
    >
      <Accordion.Header>
        <Accordion.Trigger className="w-full flex items-center justify-between p-6 text-left hover:bg-pink-50/50 transition-colors duration-200 focus:outline-none focus:ring-4 focus:ring-pink-300 focus:ring-offset-2 rounded-2xl">
          <div className="flex-1 pr-4">
            {/* Category badge */}
            {item.category && (
              <span className="inline-block px-3 py-1 bg-pink-100 text-pink-600 text-xs font-medium rounded-full mb-2">
                {item.category}
              </span>
            )}
            
            {/* Question */}
            <h3 className="text-lg font-semibold text-gray-900 group-hover:text-pink-600 transition-colors">
              {item.question}
            </h3>
          </div>

          {/* Chevron icon */}
          <div className="flex-shrink-0 w-10 h-10 rounded-full bg-gradient-to-br from-pink-100 to-rose-100 flex items-center justify-center group-hover:from-pink-200 group-hover:to-rose-200 transition-all duration-300">
            <ChevronDown
              className="w-5 h-5 text-pink-600 transition-transform duration-300 group-data-[state=open]:rotate-180"
              aria-hidden="true"
            />
          </div>
        </Accordion.Trigger>
      </Accordion.Header>

      <Accordion.Content className="overflow-hidden data-[state=open]:animate-accordion-down data-[state=closed]:animate-accordion-up">
        <div className="px-6 pb-6 pt-2">
          {/* Divider */}
          <div className="w-full h-px bg-gradient-to-r from-pink-200 via-rose-200 to-pink-200 mb-4" />
          
          {/* Answer */}
          <p className="text-gray-600 leading-relaxed">
            {item.answer}
          </p>
        </div>
      </Accordion.Content>
    </Accordion.Item>
  );
}
