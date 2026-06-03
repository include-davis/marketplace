'use client';

import { useRef, useEffect } from 'react';
import Image from 'next/image';
import styles from './ChatWindow.module.scss';
import MessageBubble from '../MessageBubble/MessageBubble';
import MessageInput from '../MessageInput/MessageInput';
import type { Message } from '@/../../server/models/Message';

export default function ChatWindow({
  messages,
  currentUserId,
  onSend,
  productName,
  productImage,
  otherUserAvatar,
}: {
  messages: Message[];
  currentUserId: string;
  onSend: (data: { text: string; createdAt: string }) => void;
  productName?: string;
  productImage?: string | null;
  otherUserAvatar?: string | null;
}) {
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  return (
    <div className={styles.chatPage}>
      {/* Header */}
      <div className={styles.header}>
        {productName && (
          <span className={styles.productName}>{productName}</span>
        )}
      </div>

      {/* Product Image */}
      {productImage && productName && (
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
        {messages.map((msg, idx) => (
          <MessageBubble
            key={msg._id?.toString()}
            message={msg}
            isOwn={msg.senderId.toString() === currentUserId}
            isLast={idx === messages.length - 1}
            avatarUrl={
              msg.senderId.toString() === currentUserId ? otherUserAvatar : null
            }
          />
        ))}
        <div ref={messagesEndRef} />
      </div>

      {/* Input */}
      <MessageInput onSend={onSend} />
    </div>
  );
}
