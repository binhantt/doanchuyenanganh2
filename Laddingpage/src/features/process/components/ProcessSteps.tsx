'use client';

import { useState } from 'react';
import { Sparkles, LayoutGrid, List } from 'lucide-react';
import StepItem from './StepItem';
import { ProcessStepsProps } from '../types';
import { defaultProcessSteps } from '../data';

export default function ProcessSteps({
  title = 'Quy Trình Làm Việc',
  subtitle = 'Chúng tôi đồng hành cùng bạn từ ý tưởng đến hiện thực',
  steps = defaultProcessSteps,
  variant: initialVariant = 'horizontal',
  activeStep,
}: ProcessStepsProps) {
  const [variant, setVariant] = useState<'horizontal' | 'vertical'>(
    initialVariant
  );

  return (
    <section
      id="process"
      className=" px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-white via-rose-50/30 to-white"
    >
      <div className="container mx-auto max-w-7xl">
        {/* Section Header */}
        <div className="text-center mb-16 space-y-4">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-rose-100 rounded-full">
            <Sparkles className="w-4 h-4 text-rose-600" />
            <span className="text-sm font-medium text-rose-600">
              Quy trình chuyên nghiệp
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
            <div className="w-12 h-1 bg-gradient-to-r from-transparent to-rose-300 rounded-full" />
            <div className="w-2 h-2 bg-rose-400 rounded-full" />
            <div className="w-8 h-1 bg-rose-400 rounded-full" />
            <div className="w-2 h-2 bg-rose-400 rounded-full" />
            <div className="w-12 h-1 bg-gradient-to-l from-transparent to-rose-300 rounded-full" />
          </div>
        </div>

        {/* Layout Toggle */}
        <div className="flex items-center justify-center gap-2 mb-12">
          <button
            onClick={() => setVariant('horizontal')}
            className={`flex items-center gap-2 px-6 py-3 rounded-full font-medium transition-all duration-300 focus:outline-none focus:ring-4 focus:ring-rose-300 focus:ring-offset-2 ${
              variant === 'horizontal'
                ? 'bg-gradient-to-r from-rose-500 to-pink-600 text-white shadow-lg scale-105'
                : 'bg-white text-gray-700 border-2 border-gray-200 hover:border-rose-300 hover:shadow-md'
            }`}
            aria-label="Horizontal layout"
          >
            <LayoutGrid className="w-5 h-5" />
            <span>Ngang</span>
          </button>

          <button
            onClick={() => setVariant('vertical')}
            className={`flex items-center gap-2 px-6 py-3 rounded-full font-medium transition-all duration-300 focus:outline-none focus:ring-4 focus:ring-rose-300 focus:ring-offset-2 ${
              variant === 'vertical'
                ? 'bg-gradient-to-r from-rose-500 to-pink-600 text-white shadow-lg scale-105'
                : 'bg-white text-gray-700 border-2 border-gray-200 hover:border-rose-300 hover:shadow-md'
            }`}
            aria-label="Vertical layout"
          >
            <List className="w-5 h-5" />
            <span>Dọc</span>
          </button>
        </div>

        {/* Steps Container */}
        <div
          className={
            variant === 'horizontal'
              ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8'
              : 'max-w-4xl mx-auto space-y-8'
          }
        >
          {steps.map((step, index) => (
            <StepItem
              key={step.id}
              step={step}
              isLast={index === steps.length - 1}
              variant={variant}
              isActive={activeStep !== undefined && activeStep === step.number}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
  