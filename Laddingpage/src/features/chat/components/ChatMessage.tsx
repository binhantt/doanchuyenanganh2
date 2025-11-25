'use client';

import { Message } from '../types';
import Image from 'next/image';

interface ChatMessageProps {
  message: Message;
  onOrderClick?: () => void;
}

export function ChatMessage({ message, onOrderClick }: ChatMessageProps) {
  return (
    <div
      className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'} animate-in fade-in slide-in-from-bottom-2`}
    >
      <div
        className={`max-w-[80%] rounded-2xl px-4 py-2 ${
          message.role === 'user'
            ? 'bg-gradient-to-r from-pink-500 to-rose-500 text-white'
            : 'bg-white text-gray-800 shadow-sm border border-gray-100'
        }`}
      >
        <p className="text-sm whitespace-pre-wrap">{message.content}</p>

        {/* Display images if available */}
        {message.images && message.images.length > 0 && (
          <div className="mt-3 space-y-2">
            {message.images.map((img, idx) => (
              <div key={idx} className="rounded-lg overflow-hidden border border-gray-200">
                <div className="relative w-full h-40">
                  <Image
                    src={img.url}
                    alt={img.alt}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, 300px"
                  />
                </div>
                {img.productName && (
                  <div className="p-2 bg-gray-50 text-xs text-gray-600">
                    {img.productName}
                  </div>
                )}
              </div>
            ))}
          </div>
        )}

        {/* Display product info if available */}
        {message.products && message.products.length > 0 && (
          <div className="mt-2 space-y-1">
            {message.products.map((prod, idx) => (
              <div key={idx} className="text-xs bg-pink-50 text-pink-700 px-2 py-1 rounded">
                💰 {prod.name}: {prod.price.toLocaleString('vi-VN')}đ
              </div>
            ))}
          </div>
        )}

        {/* Display order button if action is available */}
        {message.action?.type === 'order' && onOrderClick && (
          <button
            onClick={onOrderClick}
            className="mt-3 w-full bg-gradient-to-r from-pink-500 to-rose-500 hover:from-pink-600 hover:to-rose-600 text-white font-medium py-2.5 px-4 rounded-lg transition-all duration-200 flex items-center justify-center gap-2 shadow-md hover:shadow-lg"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
            </svg>
            <span>Đặt {message.action.productName}</span>
          </button>
        )}

        <p
          className={`text-xs mt-1 ${
            message.role === 'user' ? 'text-pink-100' : 'text-gray-400'
          }`}
        >
          {message.timestamp.toLocaleTimeString('vi-VN', {
            hour: '2-digit',
            minute: '2-digit',
          })}
        </p>
      </div>
    </div>
  );
}
