'use client';

import { X } from 'lucide-react';

interface ChatHeaderProps {
  onClose: () => void;
}

export function ChatHeader({ onClose }: ChatHeaderProps) {
  return (
    <div className="bg-gradient-to-r from-pink-500 to-rose-500 text-white p-4 flex items-center justify-between">
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center text-2xl animate-pulse">
          💕
        </div>
        <div>
          <h3 className="font-semibold">Linh - Tư vấn viên</h3>
          <p className="text-xs text-pink-100 flex items-center gap-1">
            <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></span>
            Online • Trả lời ngay
          </p>
        </div>
      </div>
      <button
        onClick={onClose}
        className="hover:bg-white/20 p-2 rounded-full transition-colors"
        aria-label="Close chat"
      >
        <X className="w-5 h-5" />
      </button>
    </div>
  );
}
