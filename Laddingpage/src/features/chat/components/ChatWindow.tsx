'use client';

import { useRef, useEffect } from 'react';
import { Loader2 } from 'lucide-react';
import { Message } from '../types';
import { ChatHeader } from './ChatHeader';
import { ChatMessage } from './ChatMessage';
import { QuickReplies } from './QuickReplies';
import { ChatInput } from './ChatInput';

interface ChatWindowProps {
  messages: Message[];
  inputValue: string;
  isLoading: boolean;
  onClose: () => void;
  onInputChange: (value: string) => void;
  onSubmit: (e: React.FormEvent) => void;
  onQuickReply: (reply: string) => void;
  onOrderClick?: (message: Message) => void;
}

export function ChatWindow({
  messages,
  inputValue,
  isLoading,
  onClose,
  onInputChange,
  onSubmit,
  onQuickReply,
  onOrderClick,
}: ChatWindowProps) {
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  return (
    <div className="fixed bottom-6 right-6 w-96 h-[600px] bg-white rounded-2xl shadow-2xl flex flex-col z-50 overflow-hidden border border-gray-200 animate-in slide-in-from-bottom-5">
      <ChatHeader onClose={onClose} />

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gradient-to-b from-gray-50 to-white">
        {messages.map((message, index) => (
          <ChatMessage 
            key={index} 
            message={message}
            onOrderClick={message.action ? () => onOrderClick?.(message) : undefined}
          />
        ))}

        {isLoading && (
          <div className="flex justify-start animate-in fade-in">
            <div className="bg-white text-gray-800 rounded-2xl px-4 py-3 shadow-sm border border-gray-100 flex items-center gap-2">
              <Loader2 className="w-4 h-4 animate-spin text-pink-500" />
              <span className="text-sm text-gray-500">Đang trả lời...</span>
            </div>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Quick Replies */}
      {messages.length <= 2 && <QuickReplies onSelect={onQuickReply} />}

      {/* Input */}
      <ChatInput
        value={inputValue}
        onChange={onInputChange}
        onSubmit={onSubmit}
        disabled={isLoading}
      />
    </div>
  );
}
