'use client';

import { QUICK_REPLIES } from '../constants';

interface QuickRepliesProps {
  onSelect: (reply: string) => void;
}

export function QuickReplies({ onSelect }: QuickRepliesProps) {
  return (
    <div className="px-4 py-2 bg-white border-t border-gray-100">
      <p className="text-xs text-gray-500 mb-2 font-medium">💡 Gợi ý câu hỏi:</p>
      <div className="flex flex-wrap gap-2">
        {QUICK_REPLIES.slice(0, 3).map((reply, index) => (
          <button
            key={index}
            onClick={() => onSelect(reply)}
            className="text-xs bg-pink-50 text-pink-600 px-3 py-1.5 rounded-full hover:bg-pink-100 transition-colors border border-pink-200"
          >
            {reply}
          </button>
        ))}
      </div>
    </div>
  );
}
