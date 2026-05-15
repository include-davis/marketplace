'use client';

import { useRef, useEffect } from 'react';
import Image from 'next/image';
import styles from './ChatWindow.module.scss';
import MessageBubble from '../MessageBubble/MessageBubble';
import MessageInput from '../MessageInput/MessageInput';
import type { Message } from '@/types/messaging';

function BackArrowIcon() {
  return (
    <svg viewBox="0 0 24 48" fill="currentColor">
      <path
        d="M18 4L6 24l12 20"
        stroke="currentColor"
        strokeWidth="3"
        fill="none"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export default function ChatWindow({
  messages,
  currentUserId,
  onSend,
  productName = 'Product Name',
  productImage,
  otherUserAvatar,
  onBack,
}: {
  messages: Message[];
  currentUserId: string;
  onSend: (data: { text: string; createdAt: string }) => void;
  productName?: string;
  productImage?: string | null;
  otherUserAvatar?: string | null;
  onBack?: () => void;
}) {
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  return (
    <div className={styles.chatPage}>
      {/* Header */}
      <div className={styles.header}>
        <button onClick={onBack} className={styles.backButton}>
          <BackArrowIcon />
          <span>Back</span>
        </button>
        <span className={styles.productName}>{productName}</span>
      </div>

      {/* Product Image */}
      {productImage && (
        <div className={styles.productImageWrapper}>
          <Image
            src={productImage}
            alt={productName}
            fill
            className={styles.productImage}
          />
        </div>
      )}

      {/* Messages Area */}
      <div className={styles.messagesArea}>
        {messages.map((msg) => (
          <MessageBubble
            key={msg.id}
            message={msg}
            isOwn={msg.senderId === currentUserId}
            avatarUrl={msg.senderId !== currentUserId ? otherUserAvatar : null}
          />
        ))}
        <div ref={messagesEndRef} />
      </div>

      {/* Input */}
      <MessageInput onSend={onSend} />
    </div>
  );
}
