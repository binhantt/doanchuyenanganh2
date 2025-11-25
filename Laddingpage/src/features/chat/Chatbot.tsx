'use client';

import { useState } from 'react';
import { Message, OrderAction } from './types';
import { INITIAL_MESSAGE } from './constants';
import { sendChatMessage } from './api';
import { ChatButton } from './components/ChatButton';
import { ChatWindow } from './components/ChatWindow';
import { OrderForm } from './components/OrderForm';

export default function Chatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([INITIAL_MESSAGE]);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [orderAction, setOrderAction] = useState<OrderAction | null>(null);

  const sendMessage = async (text: string) => {
    if (!text.trim() || isLoading) return;

    const userMessage: Message = {
      role: 'user',
      content: text,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInputValue('');
    setIsLoading(true);

    try {
      const response = await sendChatMessage(text, messages);

      const assistantMessage: Message = {
        role: 'assistant',
        content: response.message,
        images: response.images,
        products: response.products,
        action: response.action,
        timestamp: new Date(),
      };

      setMessages((prev) => [...prev, assistantMessage]);

      // If there's an order action, show the order form
      if (response.action?.type === 'order') {
        setOrderAction(response.action);
      }
    } catch (error) {
      const errorMessage: Message = {
        role: 'assistant',
        content: error instanceof Error ? error.message : 'Đã có lỗi xảy ra',
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    sendMessage(inputValue);
  };

  const handleQuickReply = (reply: string) => {
    sendMessage(reply);
  };

  const handleOrderClick = (message: Message) => {
    if (message.action) {
      setOrderAction(message.action);
    }
  };

  const handleOrderSuccess = (orderId: string, message: string) => {
    // Add success message to chat
    const successMessage: Message = {
      role: 'assistant',
      content: `✅ ${message}\n\n📋 Mã đơn hàng: ${orderId}\n\nChúng tôi sẽ liên hệ với bạn sớm nhất để xác nhận đơn hàng. Cảm ơn bạn đã tin tưởng! 💕`,
      timestamp: new Date(),
    };
    setMessages((prev) => [...prev, successMessage]);
    setOrderAction(null);
  };

  return (
    <>
      {!isOpen && <ChatButton onClick={() => setIsOpen(true)} />}

      {isOpen && (
        <ChatWindow
          messages={messages}
          inputValue={inputValue}
          isLoading={isLoading}
          onClose={() => setIsOpen(false)}
          onInputChange={setInputValue}
          onSubmit={handleSubmit}
          onQuickReply={handleQuickReply}
          onOrderClick={handleOrderClick}
        />
      )}

      {orderAction && (
        <OrderForm
          action={orderAction}
          onClose={() => setOrderAction(null)}
          onSuccess={handleOrderSuccess}
        />
      )}
    </>
  );
}
