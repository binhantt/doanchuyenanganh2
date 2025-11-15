'use client';

import { useState } from 'react';
import * as Tooltip from '@radix-ui/react-tooltip';
import { StepItemProps } from '../types';
import { Check } from 'lucide-react';

export default function StepItem({
  step,
  isLast = false,
  variant = 'horizontal',
  isActive = false,
}: StepItemProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const Icon = step.icon;

  if (variant === 'vertical') {
    return (
      <div className="relative animate-fade-up">
        <div className="flex gap-6">
          <div className="flex flex-col items-center">
            <Tooltip.Provider>
              <Tooltip.Root>
                <Tooltip.Trigger asChild>
                  <div
                    className={`relative z-10 w-16 h-16 rounded-full flex items-center justify-center transition-all duration-500 ${
                      isActive
                        ? 'bg-gradient-to-br from-rose-500 to-pink-600 shadow-lg scale-110'
                        : 'bg-gradient-to-br from-rose-100 to-pink-100 hover:from-rose-200 hover:to-pink-200'
                    }`}
                  >
                    <Icon
                      className={`w-8 h-8 transition-colors duration-300 ${
                        isActive ? 'text-white' : 'text-rose-600'
                      }`}
                      strokeWidth={1.5}
                    />
                    <div
                      className={`absolute -top-2 -right-2 w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold shadow-md ${
                        isActive
                          ? 'bg-white text-rose-600'
                          : 'bg-rose-600 text-white'
                      }`}
                    >
                      {step.number}
                    </div>
                  </div>
                </Tooltip.Trigger>
                <Tooltip.Portal>
                  <Tooltip.Content
                    className="bg-gray-900 text-white px-3 py-2 rounded-lg text-sm max-w-xs shadow-xl"
                    sideOffset={5}
                  >
                    {step.duration && `Thời gian: ${step.duration}`}
                    <Tooltip.Arrow className="fill-gray-900" />
                  </Tooltip.Content>
                </Tooltip.Portal>
              </Tooltip.Root>
            </Tooltip.Provider>

            {!isLast && (
              <div className="w-0.5 h-full min-h-[80px] bg-gradient-to-b from-rose-300 to-pink-300 my-4" />
            )}
          </div>

          <div className="flex-1 pb-12">
            <div
              className={`bg-white rounded-2xl p-6 shadow-md hover:shadow-xl transition-all duration-500 border-2 cursor-pointer ${
                isActive
                  ? 'border-rose-400 shadow-rose-100'
                  : 'border-rose-100 hover:border-rose-300'
              }`}
              onClick={() => setIsExpanded(!isExpanded)}
            >
              <h3
                className={`text-xl font-bold mb-2 transition-colors ${
                  isActive ? 'text-rose-600' : 'text-gray-900'
                }`}
              >
                {step.title}
              </h3>

              <p className="text-gray-600 mb-4">{step.description}</p>

              {step.duration && (
                <div className="inline-flex items-center gap-2 px-3 py-1 bg-rose-50 rounded-full text-sm text-rose-600 font-medium mb-4">
                  <svg
                    className="w-4 h-4"
                    fill="none"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  {step.duration}
                </div>
              )}

              {step.details && (
                <div
                  className={`overflow-hidden transition-all duration-500 ${
                    isExpanded ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
                  }`}
                >
                  <div className="pt-4 border-t border-rose-100">
                    <h4 className="text-sm font-semibold text-gray-900 mb-3">
                      Chi tiết:
                    </h4>
                    <ul className="space-y-2">
                      {step.details.map((detail, index) => (
                        <li
                          key={index}
                          className="flex items-start gap-2 text-sm text-gray-600"
                        >
                          <Check className="w-4 h-4 text-rose-500 flex-shrink-0 mt-0.5" />
                          <span>{detail}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              )}

              {step.details && (
                <button className="mt-4 text-sm text-rose-600 hover:text-rose-700 font-medium flex items-center gap-1">
                  {isExpanded ? 'Thu gọn' : 'Xem chi tiết'}
                  <svg
                    className={`w-4 h-4 transition-transform ${
                      isExpanded ? 'rotate-180' : ''
                    }`}
                    fill="none"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="relative animate-fade-up" style={{ animationDelay: `${step.number * 100}ms` }}>
      <div className="flex flex-col items-center text-center">
        <Tooltip.Provider>
          <Tooltip.Root>
            <Tooltip.Trigger asChild>
              <div
                className={`relative z-10 w-20 h-20 rounded-full flex items-center justify-center mb-6 transition-all duration-500 cursor-pointer ${
                  isActive
                    ? 'bg-gradient-to-br from-rose-500 to-pink-600 shadow-lg scale-110'
                    : 'bg-gradient-to-br from-rose-100 to-pink-100 hover:from-rose-200 hover:to-pink-200 hover:scale-105'
                }`}
              >
                <Icon
                  className={`w-10 h-10 transition-colors duration-300 ${
                    isActive ? 'text-white' : 'text-rose-600'
                  }`}
                  strokeWidth={1.5}
                />
                <div
                  className={`absolute -top-2 -right-2 w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold shadow-md ${
                    isActive
                      ? 'bg-white text-rose-600'
                      : 'bg-rose-600 text-white'
                  }`}
                >
                  {step.number}
                </div>
              </div>
            </Tooltip.Trigger>
            <Tooltip.Portal>
              <Tooltip.Content
                className="bg-gray-900 text-white px-3 py-2 rounded-lg text-sm max-w-xs shadow-xl z-50"
                sideOffset={5}
              >
                {step.duration && `Thời gian: ${step.duration}`}
                <Tooltip.Arrow className="fill-gray-900" />
              </Tooltip.Content>
            </Tooltip.Portal>
          </Tooltip.Root>
        </Tooltip.Provider>

        {!isLast && (
          <div className="hidden lg:block absolute top-10 left-1/2 w-full h-0.5 bg-gradient-to-r from-rose-300 to-pink-300 -z-10" />
        )}

        <div
          className={`bg-white rounded-2xl p-6 shadow-md hover:shadow-xl transition-all duration-500 border-2 w-full cursor-pointer ${
            isActive
              ? 'border-rose-400 shadow-rose-100'
              : 'border-rose-100 hover:border-rose-300'
          }`}
          onClick={() => setIsExpanded(!isExpanded)}
        >
          <h3
            className={`text-lg font-bold mb-2 transition-colors ${
              isActive ? 'text-rose-600' : 'text-gray-900'
            }`}
          >
            {step.title}
          </h3>

          <p className="text-sm text-gray-600 mb-3">{step.description}</p>

          {step.duration && (
            <div className="inline-flex items-center gap-1 px-3 py-1 bg-rose-50 rounded-full text-xs text-rose-600 font-medium">
              <svg
                className="w-3 h-3"
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              {step.duration}
            </div>
          )}

          {step.details && (
            <div
              className={`overflow-hidden transition-all duration-500 ${
                isExpanded ? 'max-h-96 opacity-100 mt-4' : 'max-h-0 opacity-0'
              }`}
            >
              <div className="pt-4 border-t border-rose-100 text-left">
                <ul className="space-y-2">
                  {step.details.map((detail, index) => (
                    <li
                      key={index}
                      className="flex items-start gap-2 text-xs text-gray-600"
                    >
                      <Check className="w-3 h-3 text-rose-500 flex-shrink-0 mt-0.5" />
                      <span>{detail}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          )}

          {step.details && (
            <button className="mt-3 text-xs text-rose-600 hover:text-rose-700 font-medium flex items-center gap-1 mx-auto">
              {isExpanded ? 'Thu gọn' : 'Chi tiết'}
              <svg
                className={`w-3 h-3 transition-transform ${
                  isExpanded ? 'rotate-180' : ''
                }`}
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path d="M19 9l-7 7-7-7" />
              </svg>
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
